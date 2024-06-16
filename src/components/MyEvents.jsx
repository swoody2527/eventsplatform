import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

const UserSignedEvents = () => {
  const [userEvents, setUserEvents] = useState([]);
  const [uid, setUid] = useState("");

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
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
                  return eventDocSnap.data();
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

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth, db]);

  return (
    <div>
      <p>{uid}</p>
      <h1>You're currently signed up for these events</h1>
      <ul>
        {userEvents.map((event, index) => (
          
          <div key={event.name}  className='flex flex-row justify-center' >
          <section className='bg-black border-2 border-purple-500 mt-2 w-1/2'>
              <div >{event.name ? event.name : "No Name"}</div>
              <div>{event.desc ? event.desc : "No desc"}</div>
              <div>{event.datetime ? new Date(event.datetime.toDate()).toLocaleString() : "No time"}</div>
          </section>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UserSignedEvents;
