import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './Chat.css';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';


let socket;

const Chat = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

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
  },[ENDPOINT,searchParams.get('name')]);

  useEffect(() =>{
    socket.on('message',(message)=>{
       setMessages([... messages,message])
     })
  },[messages])


  const sendMessage = (event) =>{
    event.preventDefault();
    if(message){
      socket.emit('sendMessage' , message , ()=> setMessage(''));
    }
  }

  console.log(message,messages)

 
  return (
    <div className='outerContainer'>
      <div className='container'>

         <InfoBar room = {room}/>
         <Messages messages = {messages} name={name}/>
         <Input message = {message} setMessage = {setMessage} sendMessage = {sendMessage}/>
       {/*
         <input 
        value={message} 
        onChange={(event) =>setMessage(event.target.value)}
        onKeyDown={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
       */} 
      </div>
    </div>
  )
}

export default Chat
