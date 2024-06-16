import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {doc, getFirestore, updateDoc, arrayUnion} from 'firebase/firestore'
import app from '../firebase.js'

function EventSignUp() {
  const { eventId } = useParams();
  const auth = getAuth()
  const [uid, setUid] = useState("")

  const [isSigningUp, setIsSigningUp] = useState(false)

  const db = getFirestore(app)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid)
      } else {
        // User is signed out
        // ...
      }
    });
  }, [auth])

  

  const handleSignUpToEvent = async () => {
    const eventsRef = doc(db, "events", eventId);
    const usersRef = doc(db, "users", uid)
    try {
      await updateDoc(eventsRef, {
        participants: arrayUnion(uid)
      });

      await updateDoc(usersRef, {
        "signed-events": arrayUnion(eventId)
      })

    } catch (error) {
      console.error("Error signing up to event: ", error);
    }
  };

  // Fetch event details based on the eventId and display them
  return (
    <div>
      <h2>Event Details</h2>
      <p>Event ID: {eventId}</p>
      {/* Fetch and display event details based on the eventId */}
      <button onClick={handleSignUpToEvent} className='btn'>Sign Up</button>
    </div>
  );
}
export default EventSignUp