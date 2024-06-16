import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import app from "../firebase.js"
import { doc, getFirestore, setDoc } from 'firebase/firestore'

function SignUp() {
    const auth = getAuth()
    const db = getFirestore(app)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirmation, setPasswordConfirmation] = useState("")
    const [error, setError] = useState(null)
    const [isCreating, setIsCreating] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const handleSignUp = (e) => {
        e.preventDefault()
        if (password != passwordConfirmation) {
            setError({message: "Password's do not match!"})
            return
        }
        setIsCreating(true)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setIsCreating(false)
            setIsSuccess(true)
            setError(null)
            setEmail("")
            setPassword("")
            setPasswordConfirmation("")
            const user = userCredential.user
            createDatabaseUser(user.uid)
        })
        .catch((error) => {
            setIsSuccess(false)
            setError(error)
        })

    }

    const createDatabaseUser = async (uid) => {
        await setDoc(doc(db, "users", uid), {
            "signed-events": []
        })
    }

  return (
    <section>
        <h1>One step closer...</h1>
        <form className='flex flex-col items-center' onSubmit={handleSignUp}>
            <input className='input-basic' type='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
            <input className='input-basic' type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
            <input className='input-basic' type='password' value={passwordConfirmation} placeholder='Confirm Password' onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
            {password != passwordConfirmation ? <p>Passwords don't match</p> : null}
            <button className='btn mt-3' disabled={password !== passwordConfirmation || isCreating ? true : false} type='submit'>{isCreating ? "Creating..." : "Create My Account"}</button>
        </form>
        {error ? <p> {error.message} </p> : null}
        {isSuccess ? <p>Account Created. You're all set!</p> : null}
        {isSuccess ? <Link to="/authenticate"><button>Log In</button></Link> : null}
    </section>
  )
}

export default SignUp