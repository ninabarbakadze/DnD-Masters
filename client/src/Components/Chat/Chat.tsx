import { useState, useEffect } from 'react';
import moment from 'moment';
// @ts-ignore
import ScrollToBottom from 'react-scroll-to-bottom';
/* eslint-disable */
// @ts-ignore
export default function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()),
      };
      await socket.emit('send_message', messageData);
      // @ts-ignore
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (data: any) => {
      // @ts-ignore
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
              className="message"
              // @ts-ignore
              id={username === messageContent.author ? 'you' : 'other'}
            >
              {/*     @ts-ignore */}
              <p className="message-content">{messageContent.message}</p>
              <div className="message-meta">
                {/*     @ts-ignore */}
                <p id="time">{moment(messageContent.time).format('LT')}</p>
                {/*     @ts-ignore */}
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
          onKeyPress={(event) =>
            /*     @ts-ignore */
            event.key === 'Enter' && sendMessage()
          }
        />
        <button onClick={() => sendMessage()}>&#9658;</button>
      </div>
    </div>
  );
}
