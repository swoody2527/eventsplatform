import React, { useEffect, useState } from 'react';
import app from '../firebase';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import LoadingSpinner from "../components/LoadingSpinner.jsx"

function BrowseEvents() {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  const db = getFirestore(app);

  useEffect(() => {
    const fetchEvents = async () => {

      try {
        const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setEvents(eventsData);
      setIsLoading(false)
        
      } catch (error) {
        console.log(error)
        setIsLoading(false)
        
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className='text-6xl mb-3'>See what's coming up...</h1>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {events.map((event) => (
            <div key={event.id} className="rounded-lg overflow-hidden shadow-xl shadow-black border-2 border-purple-600">
              <img src="https://placehold.co/300" alt="Event" className="w-full h-48 object-cover object-center" />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{event.name ? event.name : "No Name"}</h2>
                <p className="text-white mb-2">{event.desc ? event.desc : "No desc"}</p>
                <p className="text-white mb-2">{event.time ? event.time : "No time"}</p>
                <p className="text-white mb-2">{event.location ? event.location : "No location"}</p>
                <p className="text-white mb-2">{event.price ? "£" + event.price : "Free"}</p>
                <Link to={`/browse-events/${event.id}`} className="btn bg-purple-500 text-white px-4 py-2 inline-block">Sign Up</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
}

export default BrowseEvents;