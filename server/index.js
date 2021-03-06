/* eslint-disable arrow-spacing */
require('dotenv/config');
const passport = require('passport');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require('http');
const { Server } = require('socket.io');
const router = require('./router');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.CLIENT_URL, // <-- url of the react app we are connecting to
  credentials: true,
}));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

app.use(router);
// socket stuff
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});
let map;
let players = [];
io.on('connection', (socket) => {
  socket.on('join_room', ({ gameRoom, player }) => {
    socket.join(gameRoom);
    console.log(`${player} with ID: ${socket.id} joined room: ${gameRoom}`);
  });
  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
  socket.on('new_player', ({ player }, respond) => {
    players.push(player);
    respond(players);
  });
  socket.on('update_players', (data) => {
    players = data.players;
    socket.to(data.room).emit('update_players', players);
  });
  // eslint-disable-next-line no-return-assign
  socket.on('send_map', (url) => map = url);
  socket.on('request_map', (_, respond) => {
    respond(map);
  });
});

server.listen(process.env.SERVER_PORT || 4000, () => {
  console.log(`listening on port ${process.env.SERVER_PORT}`);
});
