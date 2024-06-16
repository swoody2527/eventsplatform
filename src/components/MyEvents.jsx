import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initGoogleApi } from '../googleApi.js'; 
import { gapi } from 'gapi-script';

const UserSignedEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [uid, setUid] = useState("");
  const [isGoogleUser, setIsGoogleUser] = useState(false)

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    initGoogleApi(); 

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        if (user.providerData[0].providerId === "google.com") {
          setIsGoogleUser(true)
        }

        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();

            // Check if any signed events.
            if (userData['signed-events']) {
              const eventIds = userData['signed-events'];
              const eventsData = await Promise.all(eventIds.map(async (eventId) => {
                const eventDocRef = doc(db, 'events', eventId);
                const eventDocSnap = await getDoc(eventDocRef);
                if (eventDocSnap.exists()) {
                  return { id: eventId, ...eventDocSnap.data() };
                } else {
                  console.error(`Event with ID ${eventId} does not exist.`);
                  return null;
                }
              }));
              setUserEvents(eventsData.filter(event => event !== null));
            } else {
              setUserEvents([]);
            }
          } else {
            setUserEvents([]);
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
          setUserEvents([]);
        }
      } else {
        setUid("");
        setUserEvents([]);
      }
    });

    return () => unsubscribe(); 
  }, [auth, db]);

  const handleCalendarInsert = async (event) => {
    try {
      const user = auth.currentUser;
      if (user) {
        

        const GoogleAuth = gapi.auth2.getAuthInstance();

        if (!GoogleAuth.isSignedIn.get()) {
          await GoogleAuth.signIn();
        }

        const accessToken = GoogleAuth.currentUser.get().getAuthResponse().access_token;

        const eventPayload = {
          summary: event.name,
          description: event.desc,
          start: {
            dateTime: new Date(event.date).toISOString(),
            timeZone: 'Europe/London', 
          },
          end: {
            dateTime: new Date(new Date(event.date).getTime() + 3600000).toISOString(),
            timeZone: 'Europe/London', 
          },
        };

        gapi.client.setToken({ access_token: accessToken });

        const request = gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: eventPayload,
        });

        request.execute((response) => {
          if (response.error) {
            console.error('Error creating event: ', response.error);
            alert('Failed to add event to Google Calendar');
          } else {
            console.log('Event created: ', response.htmlLink);
            alert(`Event created: ${response.htmlLink}`);
          }
        });
      }
    } catch (error) {
      console.error('Error adding event to Google Calendar:', error);
      alert('Failed to add event to Google Calendar');
    }
  };

  return (
    <div>
      <p>{uid}</p>
      <h1>You're currently signed up for these events</h1>
      <ul>
        {userEvents.map((event) => (
          <div key={event.id} className='flex flex-row justify-center'>
            <section className='bg-black border-2 border-purple-500 mt-2 w-1/2'>
              <div>{event.name ? event.name : "No Name"}</div>
              <div>{event.desc ? event.desc : "No Description"}</div>
              <div>{event.date ? new Date(event.date).toLocaleString() : "No Date"}</div>

              {isGoogleUser ? <button className='btn' onClick={() => handleCalendarInsert(event)}>+ Google Calendar</button> : null }
              
            </section>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserSignedEvents;
