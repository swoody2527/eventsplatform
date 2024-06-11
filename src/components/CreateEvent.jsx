import React from 'react'

function CreateEvent() {
  return (
    <section>
        <form className='flex flex-col items-center'>
            <input className='mt-3' placeholder='Event Name'></input>
            <input className='mt-3' placeholder='Event Description'></input>
            <input className='mt-3' placeholder='Date'></input>
            <input className="mt-3" placeholder='Time'></input>
            <input className='mt-3' placeholder='Category'></input>
            <input className='mt-3' placeholder='Price'></input>
            <button className='btn mt-3'>Create Event</button>

        </form>

    </section>
  )
}

export default CreateEvent