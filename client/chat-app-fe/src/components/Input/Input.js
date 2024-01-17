import React from 'react';

import './Input.css'

const Input = ({message,setMessage,sendMessage}) => {
  return (
    <form className='form'>
      <input
      className='input'
      type='text'
      placeholder='Type a message ...'
      value={message}
      onChange={(Event) => setMessage(Event.target.value)}
      onKeyUpCapture={ Event => Event.key === 'Enter' ? sendMessage(Event) : null}
      />
      <button className='sendButton' onClick={(Event) => sendMessage(Event)}>Send</button>
    </form>
  )
}

export default Input
