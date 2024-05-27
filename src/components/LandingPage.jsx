import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <section>
    <h1>Welcome to the Events Platform</h1>
    <h2>Already a member?</h2>
    <Link to="/authenticate"><button>Sign In</button></Link>
    <h2>Looking to get started?</h2>
    <Link to="/usersignup"><button>Sign Up</button></Link>

    <h2>Staff?</h2>
    <button>Staff Login</button>
    </section>
  )
}

export default LandingPage