import { useState, useContext } from 'react'
import { Routes, Route } from "react-router-dom"
import { Link } from 'react-router-dom'

import './App.css'
import "./firebase.js"
import 'flowbite'
import 'flowbite/dist/flowbite.min.css';
import LandingPage from './components/LandingPage.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import StaffSignIn from './components/StaffSignIn.jsx'
import Menu from './components/Menu.jsx'
import NavBar from './components/NavBar.jsx'
import MyEvents from './components/MyEvents.jsx'
import CreateEvent from './components/CreateEvent.jsx'
import BrowseEvents from './components/BrowseEvents.jsx'
import EventSignUp from './components/EventSignUp.jsx'

function App() {

  return (
    <main>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path='/authenticate' element={<SignIn/>}></Route>
        <Route path='/usersignup' element={<SignUp/>}></Route>
        <Route path='/authenticate-staff' element={<StaffSignIn/>}></Route>
        <Route path='/menu' element={<Menu/>}></Route>
        <Route path='/my-events' element={<MyEvents/>}></Route>
        <Route path='/create-event' element={<CreateEvent/>}></Route>
        <Route path='/browse-events' element={<BrowseEvents />}></Route>
        <Route path='/browse-events/:eventId' element={<EventSignUp/>}></Route>
      </Routes>
    </main>
  )
}

export default App
