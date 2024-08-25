import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import Message from '../components/Message';
import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState('Sofija Milosevic'); // Početni chat
  const [chats, setChats] = useState({
    'Milica Bogdanovic': [{ text: 'Ko ti je Sofija?', sender: 'Milica Bogdanovic' }],
    'Sofija Milosevic': [{ text: 'Eej, sta ima?', sender: 'Sofija Milosevic' }],
    'Lazar Todorovic': [{ text: 'Gdee si!', sender: 'Lazar Todorovic' }],
    'Jovana Jovanovic': [{ text: 'Kada se nalazimo?', sender: 'Jovana Jovanovic' }],
  });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      const updatedMessages = [...(chats[selectedChat] || []), { text: message, sender: 'user' }];
      setChats({ ...chats, [selectedChat]: updatedMessages });
      setMessage('');
    }
  };

  const handleChatSelection = (chatName) => {
    setSelectedChat(chatName);
  };

  const handleSearch = () => {
    // Logika za pretragu korisnika
    console.log("Search for:", searchTerm);
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="sidebar">
          <h2>Chats</h2>
          <div className="search-container">
            <TextInput
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search users..."
              className="search-input"
            />
            <button onClick={handleSearch} className="search-button">🔍</button>
          </div>
          <div className="chat-list">
            {Object.keys(chats).map((chatName) => (
              <div
                key={chatName}
                className={`chat-item ${selectedChat === chatName ? 'active' : ''}`}
                onClick={() => handleChatSelection(chatName)}
              >
                {chatName}
              </div>
            ))}
          </div>
        </div>
        <div className="chat-content">
          <div className="chat-header">
            <h2>{selectedChat}</h2>
          </div>
          <div className="message-list">
            {chats[selectedChat]?.map((msg, index) => (
              <Message key={index} text={msg.text} sender={msg.sender} />
            ))}
          </div>
          <div className="message-input-container">
            <TextInput
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
            />
            <button onClick={handleSend} className="send-button">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
