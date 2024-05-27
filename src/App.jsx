import { useState, useContext } from 'react'
import { Routes, Route } from "react-router-dom"
import { Link } from 'react-router-dom'

import './App.css'
import "./firebase.js"
import LandingPage from './components/LandingPage.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'

function App() {

  return (
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path='/authenticate' element={<SignIn/>}></Route>
        <Route path='/usersignup' element={<SignUp/>}></Route>
      </Routes>
    </main>
  )
}

export default App
