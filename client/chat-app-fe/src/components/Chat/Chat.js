import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Chat.css';
import io from 'socket.io-client';

let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [searchParams] = useSearchParams();
  const ENDPOINT = 'localhost:5000';
  useEffect(()=>{
    const nameOfPerson = searchParams.get('name');
    const roomOfPerson = searchParams.get('room');
    socket = io(ENDPOINT);
    console.log(socket);
    setName(nameOfPerson);
    setRoom(roomOfPerson);
  },[ENDPOINT,searchParams.get('name')])
 
  return (
    <div>
      
      <h1>Chat</h1>
    </div>
  )
}

export default Chat
