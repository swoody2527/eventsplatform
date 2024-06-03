import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { StaffContext } from '../contexts/StaffContext'

function Menu() {

const auth = getAuth()
const [uid, setUid] = useState("")
const { staff } = useContext(StaffContext)

console.log(staff)
const navigate = useNavigate()

const handleLogout = (e) => {
  e.preventDefault()
   signOut(auth)
   .then(() => {
    navigate("/")
   })
   .catch((error) => {
    console.log(error)
   })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        setUid(user.uid)
    } else {
        // user signed out
    }
})

  return (
    <section>
    <div>Welcome! {uid}</div>
    {staff ? <p>You are staff!</p> : null}



    <button onClick={handleLogout}>Log Out</button>
    </section>

  )
}

export default Menu