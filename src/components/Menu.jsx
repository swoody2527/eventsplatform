import { getAuth, onAuthStateChanged } from 'firebase/auth'
import React, { useState } from 'react'

function Menu() {

const auth = getAuth()
const [uid, setUid] = useState("")

onAuthStateChanged(auth, (user) => {
    if (user) {
        setUid(user.uid)
    } else {
        // user signed out
    }
})

  return (
    <div>Welcome! {uid}</div>
  )
}

export default Menu