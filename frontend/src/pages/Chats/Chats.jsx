import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Chats.css';

const Chats = () => {
    const { state } = useLocation();
    const { userId, role, initialMessage } = state;
    const [messageInput, setMessageInput] = useState('');

  return (
    <div className='chat-page'>
        <h1> Customer Service Chat</h1>
        <div className='chat-window'>
            <div className='chat-bubble chat-bubble-right'>
                {initialMessage}
            </div>
        </div>
        <div className='msg-container'>
            <textarea
                value={messageInput}
                placeholder='Type your message ...'
                onChange={(e) => setMessageInput(e.target.value)}
            />
            <button style={{ width: "5rem", height: "3rem", marginLeft: "1rem"}}>Send</button>
        </div>
    </div>
  )
}

export default Chats