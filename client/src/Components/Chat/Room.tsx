/* eslint-disable
 */import './Chat.scss';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
// @ts-ignore
const socket = io.connect('http://localhost:3001');

export default function Room() {
  const [username, setUsername ] = useState('');
  const [room, setRoom ] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== '' && room !== '') {
      socket.emit('join_room', room)
      setShowChat(true)
    } 
  }

  return (
    <div className='room'>
      {!showChat ? (
      <div className='join-chat-container'>
     <h3>Join A Chat</h3>
     <input type="text" placeholder="You name" onChange={(e) => {setUsername(e.target.value)}} />
     <input type="text" placeholder="Room ID" onChange={(e) => {setRoom(e.target.value)}}
      />
     <button onClick={() => joinRoom()}>Join A Room</button>
     </div>
      )
     :
    ( <Chat socket={socket} username={username} room={room} /> )}
    </div>
  );
}
