import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function EventSignUp() {
  const { eventId } = useParams();
  const auth = getAuth()
  const [uid, setUid] = useState("")

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          setUid(user.uid)
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
  }, [auth])

  const handleSignUpToEvent = () => {

  }

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