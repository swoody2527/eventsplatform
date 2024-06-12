import React, { useEffect, useState } from 'react';
import app from '../firebase';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

function BrowseEvents() {
  const [events, setEvents] = useState([]);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchEvents = async () => {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setEvents(eventsData);
    };
    fetchEvents();
  }, []);

  return (
    <div>
      {events.map((event) => (
        <div className='flex flex-row justify-center' >
        <section className='bg-black border-2 border-purple-500 mt-2 w-1/2'>
            <div key={event.id}>{event.name ? event.name : "No Name"}</div>
            <div key={event.id}>{event.desc ? event.desc : "No desc"}</div>
            <div key={event.id}>{event.time ? event.time : "No time"}</div>
            <button className='btn'>Sign Up</button>
        </section>
        </div>

      ))}
    </div>
  );
}

export default BrowseEvents;