import './Chat.scss';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { Socket } from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';
import { iMessage } from '../../interfaces/chat.interface';

type props = {
  socket: Socket,
  username: string,
  room: string
}

export default function Chat({ socket, username, room }: props) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState<iMessage[]>([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()),
      };
      await socket.emit('send_message', messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data: iMessage) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <p id="chat-header">Live Chat</p>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => (
            <div
              key={`${messageContent}`}
              className="message"
              id={username === messageContent.author ? 'you' : 'other'}
            >
              <p className="message-content">{messageContent.message}</p>
              <div className="message-meta">
                <p id="time">{moment(messageContent.time).format('LT')}</p>
                <p id="author">{messageContent.author}</p>
              </div>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Message"
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(event) => event.key === 'Enter' && sendMessage()}
        />
        <button type="button" onClick={() => sendMessage()}>&#9658;</button>
      </div>
    </div>
  );
}
