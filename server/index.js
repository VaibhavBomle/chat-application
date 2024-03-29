const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users.js') ;
const PORT = process.env.PORT || 5000;

const router = require('./router')

const app = express();
const server = http.createServer(app);

 const io = socketio(server, {
   cors: {
     origin: 'http://localhost:3000', // Replace with your React app's origin
     methods: ['GET', 'POST'],
     credentials: true,
   },
 });

io.on('connection',(socket)=>{
   console.log("We have a new connection...");

   socket.on('join',({name,room},callback)=>{
    const {error, user} = addUser( {id : socket.id, name, room });
    console.log("user =>",user)
      if(error){
        callback({error: 'error'});
      }

      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

      socket.join(user.room)
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

      
      callback();
   }); 

   socket.on('sendMessage', (message,callback) =>{
      const user = getUser(socket.id);

      io.to(user.room).emit('message',{user: user.name, text : message})
      callback();
   });



   socket.on('disconnect',()=>{
    const user = removeUser(socket.id);
    console.log('User had left...')
    if(user){
      io.to(user.name).emit('message', {user: 'admin' , text : `${user.name} has left.`})
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
    }
   });
});


app.use(router);
server.listen(PORT , () => console.log(`Server has started on port ${PORT}`))
 