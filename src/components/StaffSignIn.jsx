import React, {useContext, useState, useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import app from '../firebase.js'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { StaffContext } from '../contexts/StaffContext.jsx'

function StaffSignIn() {
  const navigate = useNavigate()
  
  const database = getFirestore(app)

  const { loginStaff } = useContext(StaffContext)

  
  const auth = getAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleStaffLogin = async (e) => {
    e.preventDefault();

    try {
      // Query Firestore to check if the email exists in the "staff" collection
      const staffCollectionRef = collection(database, "staff");
      const q = query(staffCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Email exists in the "staff" collection
        await signInWithEmailAndPassword(auth, email, password);
        loginStaff(email)
        setError(null);
        navigate("/menu");
      } else {
        // Email not found in the "staff" collection
        setError("No Staff Account Found.");
      }
    } catch (error) {
      setError(error.message);
    }
  };


  
  return (
    <section>
    <h1>Staff Log In</h1>
    <form onSubmit={handleStaffLogin}>
        <input value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
        <input value={password} placeholder='password'onChange={(e) => setPassword(e.target.value)}></input>
        <button type='submit'>Log In</button>
    </form>
    {error ? <p>{error}</p> : null}


    </section>
  )
}

export default StaffSignIn