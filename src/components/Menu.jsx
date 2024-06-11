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
    <div>Welcome! {uid}</div>

    { /* Staff Options */}
    {staff ? <p>You are staff!</p> : null}
    {staff ? <Link to="/create-event"><button className='btn'>Create New Event</button></Link> : null}



    <button className='btn mt-3' onClick={handleLogout}>Log Out</button>
    </section>

  )
}

export default Menu