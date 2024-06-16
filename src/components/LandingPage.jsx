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
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    setDoc(doc(db, "users", user.uid), {
      "signed-events": [],
      "google-user": true
  })
    navigate("/menu")
    
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
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