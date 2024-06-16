import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { setDoc, doc, getFirestore } from 'firebase/firestore'

function LandingPage() {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  const db = getFirestore()
  const navigate = useNavigate()

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
  .then((result) => {
    
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    
    const user = result.user;
    
    setDoc(doc(db, "users", user.uid), {
      "signed-events": [],
      "google-user": true
  })
    navigate("/menu")
    
  }).catch((error) => {
    
    const errorCode = error.code;
    const errorMessage = error.message;
    
    const email = error.customData.email;
    
    const credential = GoogleAuthProvider.credentialFromError(error);
    
  });
  }
  return (
    <section>
    <h1 className='text-xl'>Welcome to FilmFizz</h1>
    <h3>The No. 1 place for social film gatherings and screenings!</h3>
    <h2>Already a member?</h2>
    <Link to="/authenticate"><button className='btn'>Sign In</button></Link>

    <p>Log In With Google To Use Calender Features</p>
    <button onClick={handleGoogleLogin} className='btn'>Google Login</button>
    <h2>Looking to get started?</h2>
    <Link to="/usersignup"><button className='btn'>Sign Up</button></Link>

    </section>
  )
}

export default LandingPage