import React, {useContext, useState, useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import { Button } from '@headlessui/react'

function SignIn() {
  const navigate = useNavigate()

  
  const auth = getAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const handleLogin = (e) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      //signed in 
      const user = userCredential.user
      setError(null)
      navigate("/menu")
    })
    .catch((error) => {
      const errorCode = error.code
      setError(error.message)
    })
  }

  
  return (
    <section>
    <h1 className='text-5xl'>Welcome Back!</h1>
    <form className='flex flex-col items-center' onSubmit={handleLogin}>
        <input value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
        <input className='m-3' value={password} placeholder='password'onChange={(e) => setPassword(e.target.value)}></input>
        <Button className="btn" type='submit'>Log In</Button>
    </form>
    {error ? <p>{error}</p> : null}

    <h2>Staff?</h2>
    <Link to="/authenticate-staff"><Button className="btn">Staff Login</Button></Link>
    </section>
  )
}

export default SignIn