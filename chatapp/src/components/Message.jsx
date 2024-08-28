import React from 'react';
import './Message.css';

const Message = ({ text, sender }) => {
  return (
    <div className={`message-item ${sender === 'user' ? 'user' : ''}`}>
      {text}
    </div>
  );
};

export default Message;
