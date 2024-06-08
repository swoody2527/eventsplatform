import React from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <section>
    <h1 className='text-xl'>Welcome to FilmFizz</h1>
    <h3>The No. 1 place for social film gatherings and screenings!</h3>
    <h2>Already a member?</h2>
    <Link to="/authenticate"><button className='btn'>Sign In</button></Link>
    <h2>Looking to get started?</h2>
    <Link to="/usersignup"><button className='btn'>Sign Up</button></Link>

    </section>
  )
}

export default LandingPage