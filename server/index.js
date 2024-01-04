const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const router = require('./router')

const app = express();
app.use(cors({
   origin: 'http://localhost:3000', // Allow requests from this origin
   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
   credentials: true, // Allow credentials (cookies, authorization headers, etc.)
 }));
const server = http.createServer(app);
const io = socketio(server);

io.on('connection',(socket)=>{
   console.log("We have a new connection...");

   socket.on('disconnect',()=>{
    console.log('User had left...')
   })
});


app.use(router);
server.listen(PORT , () => console.log(`Server has started on port ${PORT}`))
