import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { initGoogleApi } from '../googleApi.js'; 
import { gapi } from 'gapi-script';
import LoadingSpinner from './LoadingSpinner.jsx';

const MyEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [uid, setUid] = useState("");
  const [isGoogleUser, setIsGoogleUser] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

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
              setIsLoading(false)
            } else {
              setUserEvents([]);
              setIsLoading(false)
            }
          } else {
            setUserEvents([]);
            setIsLoading(false)
          }
        } catch (error) {
          console.error('Error fetching user document:', error);
          setUserEvents([]);
          setIsLoading(false)
        }
      } else {
        setUid("");
        setUserEvents([]);
        setIsLoading(false)
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
    <div className="container mx-auto p-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <p>{uid}</p>
          <h1 className="text-3xl font-bold mb-4">You're currently signed up for these events</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userEvents.map((event) => (
              <div key={event.id} className="flex flex-col justify-between rounded-lg overflow-hidden shadow-xl shadow-black border-2 border-purple-600">
                <img src="https://placehold.co/300" alt="Event" className="w-full h-48 object-cover object-center" />
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{event.name ? event.name : "No Name"}</h2>
                  <p className="text-white mb-2">{event.desc ? event.desc : "No Description"}</p>
                  <p className="text-white mb-2">{event.date ? new Date(event.date).toLocaleString() : "No Date"}</p>
                  {isGoogleUser && (
                    <button className="btn bg-purple-500 text-white px-4 py-2" onClick={() => handleCalendarInsert(event)}>
                      Add To Google Calendar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
};

export default MyEvents;
