import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { StaffContext } from '../contexts/StaffContext'
import { Link } from 'react-router-dom'

function Menu() {

const auth = getAuth()
const [uid, setUid] = useState("")
const { staff, logoutStaff } = useContext(StaffContext)

const navigate = useNavigate()


const handleLogout = (e) => {
  e.preventDefault()
  logoutStaff()
   signOut(auth)
   .then(() => {
    navigate("/")
   })
   .catch((error) => {
    console.log(error)
   })
}

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        // user logged out
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <section className='flex flex-col items-center'>
      
    <h1 className='text-5xl'>{staff ? "Staff Hub" : "Welcome Back"}</h1>
    <Link to={"/my-events"}><button className='btn text-5xl'>My Events</button></Link>
    <Link to={"/browse-events"}><button className='btn text-5xl'>Browse Events</button></Link>


    { /* Staff Options */}
    {staff ? <Link to="/create-event"><button className='btn text-5xl'>Create New Event</button></Link> : null}



    <button className='btn mt-3 text text-5xl' onClick={handleLogout}>Log Out</button>
    </section>

  )
}

export default Menu