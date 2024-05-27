import React from 'react'
import { Link } from 'react-router-dom'

function SignIn() {
  return (
    <section>
    <h1>Welcome Back!</h1>
    <form>
        <input placeholder='email'></input>
        <input placeholder='password'></input>
        <button>Log In</button>
    </form>

    <h2>Staff?</h2>
    <Link to="/authenticate-staff"><button>Staff Login</button></Link>
    </section>
  )
}

export default SignIn