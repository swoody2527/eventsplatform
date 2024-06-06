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
    <h1>Welcome Back!</h1>
    <form className='flex flex-col items-center' onSubmit={handleLogin}>
        <input value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
        <input className='m-8' value={password} placeholder='password'onChange={(e) => setPassword(e.target.value)}></input>
        <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" type='submit'>Log In</Button>
    </form>
    {error ? <p>{error}</p> : null}

    <h2>Staff?</h2>
    <Link to="/authenticate-staff"><button>Staff Login</button></Link>
    </section>
  )
}

export default SignIn