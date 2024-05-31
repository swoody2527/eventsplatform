import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Menu() {

const auth = getAuth()
const [uid, setUid] = useState("")

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

    <button onClick={handleLogout}>Log Out</button>
    </section>

  )
}

export default Menu