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
    const roomName = searchParams.get('room');
    socket = io(ENDPOINT);
    console.log(socket);
    setName(nameOfPerson);
    setRoom(roomName);
    console.log("name =>",nameOfPerson)
    socket.emit("join",{name : nameOfPerson,room: roomName},()=>{
      // alert(error)

    });
    return () =>{
      socket.emit('disconnect');
      socket.off();
    }
  },[ENDPOINT,searchParams.get('name')])
 
  return (
    <div>
      
      <h1>Chat</h1>
    </div>
  )
}

export default Chat
