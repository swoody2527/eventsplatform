import React, {useContext, useState, useEffect} from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth'

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
    <form onSubmit={handleLogin}>
        <input value={email} placeholder='email' onChange={(e) => setEmail(e.target.value)}></input>
        <input value={password} placeholder='password'onChange={(e) => setPassword(e.target.value)}></input>
        <button type='submit'>Log In</button>
    </form>
    {error ? <p>{error}</p> : null}

    <h2>Staff?</h2>
    <Link to="/authenticate-staff"><button>Staff Login</button></Link>
    </section>
  )
}

export default SignIn