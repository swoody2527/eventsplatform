import React, { useState } from 'react';
import app from "../firebase.js"
import { getFirestore, collection, addDoc } from 'firebase/firestore';

function CreateEvent() {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState(0);

  const db = getFirestore(app)

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
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
      
    } catch (error) {
      console.log(error)
      
    }


    
  };

  return (
    <section>
      <form className='flex flex-col items-center' onSubmit={handleSubmit}>
        <input
          className='mt-3'
          placeholder='Event Name'
          value={eventName}
          onChange={(event) => setEventName(event.target.value)}
        />
        <input
          className='mt-3'
          placeholder='Event Description'
          value={eventDescription}
          onChange={(event) => setEventDescription(event.target.value)}
        />
        <input
          className='mt-3'
          placeholder='Date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <input
          className='mt-3'
          placeholder='Category'
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        />
        <div>£
        <input
        
        type='number'
        min={0}
          className='mt-3 bg-black'
          placeholder='Price'
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        </div>
        <button className='btn mt-3'>Create Event</button>
      </form>
    </section>
  );
}

export default CreateEvent;