import React, { useState } from 'react';
import app from "../firebase.js"
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { set } from 'firebase/database';

function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);
  
  const [isCreating, setIsCreating] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const db = getFirestore(app)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSuccess(false)
      setIsCreating(true)
      const docRef = await addDoc(collection(db, "events"), {
        name: eventName,
        desc: eventDescription,
        date: date,
        category: category,
        price: price,
        participants: [] 
  });
        console.log("Document written with ID: ", docRef.id);
        setEventName('')
        setEventDescription('')
        setDate('')
        setCategory('')
        setPrice(0)
        setIsCreating(false)
        setSuccess(true)
        setError(false)
      
    } catch (error) {
      console.log(error)
      setError(error)
      setIsCreating(false)
      setSuccess(false)
      
    }


    
  };

  return (
    <section>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <input
          className='input-basic'
          placeholder='Event Name'
          value={eventName}
          onChange={(event) => setEventName(event.target.value)}
        />
        <input
          className='input-basic'
          placeholder='Event Description'
          value={eventDescription}
          onChange={(event) => setEventDescription(event.target.value)}
        />
        <input
          type='datetime-local'
          className='input-basic bg-black'
          placeholder='Date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <input
          className='input-basic'
          placeholder='Category'
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <div>£
        <input
        
        type='number'
        min={0}
          className='input-basic'
          placeholder='Price'
          value={price}
          onChange={(event) => setPrice(Number(event.target.value))}
        />
        </div>
        <button disabled={isCreating} className='btn mt-3'>{isCreating ? "Creating Event..." : "Create Event"}</button>
      </form>
      {success ? <p>Event Created!</p> : null}
      {error ? <p>{error}</p> : null}
      {}
    </section>
  );
}

export default CreateEvent;