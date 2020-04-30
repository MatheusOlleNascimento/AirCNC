const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

io.on('connection', socket => {
    console.log('Usuário conectado', socket.id);
    console.log(socket.handshake.query);
    // //Envia em realtime uma mensagem para o front-end
    // setTimeout(() => {
    //     socket.emit('hello', 'World');
    // }, 4000);
    // //Escuta mensagens em realtime que sejam omni
    // socket.on('omni', data => {
    //     console.log(data);
    // })
    
});

mongoose.connect('mongodb+srv://guardions:1475963@cluster0-mfmbx.mongodb.net/Aircnc?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
    });


app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

server.listen(3333);