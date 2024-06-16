import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getFirestore, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';
import app from '../firebase.js';

function EventSignUp() {
  const { eventId } = useParams();
  const auth = getAuth();
  const [uid, setUid] = useState('');
  const [eventDetails, setEventDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const db = getFirestore(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
  }, [auth]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const eventRef = doc(db, 'events', eventId);
      const eventSnap = await getDoc(eventRef);
      if (eventSnap.exists()) {
        setEventDetails(eventSnap.data());
      } else {
        console.error('No such event!');
      }
    };

    fetchEventDetails();
  }, [db, eventId]);

  const handleSignUpToEvent = async () => {
    setIsSigningUp(true);
    const eventsRef = doc(db, 'events', eventId);
    const usersRef = doc(db, 'users', uid);
    try {
      await updateDoc(eventsRef, {
        participants: arrayUnion(uid),
      });

      await updateDoc(usersRef, {
        'signed-events': arrayUnion(eventId),
      });
      setIsSigningUp(false);
      setError(null);
    } catch (error) {
      setIsSigningUp(false);
      setError(error);
      console.error('Error signing up to event: ', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-5xl">You are signing up for...</h2>
      {eventDetails ? (
        <div>
          <p>Name: {eventDetails.name}</p>
          <p>Date: {eventDetails.date}</p>
          <p>Location: {eventDetails.location}</p>
          <button
            disabled={isSigningUp}
            onClick={handleSignUpToEvent}
            className="btn bg-purple-500 text-white px-4 py-2"
          >
            {isSigningUp ? 'Confirming' : 'Confirm Sign Up'}
          </button>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}

export default EventSignUp;
