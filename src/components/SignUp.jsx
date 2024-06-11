import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {
    const auth = getAuth()
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
        })
        .catch((error) => {
            setIsSuccess(false)
            setError(error)
        })

    }

  return (
    <section>
        <h1>One step closer...</h1>
        <form className='flex flex-col items-center' onSubmit={handleSignUp}>
            <input type='email' value={email} placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
            <input className='mt-3' type='password' value={password} placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
            <input className='mt-3' type='password' value={passwordConfirmation} placeholder='Confirm Password' onChange={(e) => setPasswordConfirmation(e.target.value)}></input>
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