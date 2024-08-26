import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from '../components/Message';
import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState({});
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user-chats', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setChats(response.data || {});
      if (response.data && Object.keys(response.data).length > 0) {
        setSelectedChat(Object.keys(response.data)[0]);
      } else {
        setSelectedChat(null);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleSend = () => {
    if (message.trim()) {
      const updatedMessages = [...(chats[selectedChat] || []), { text: message, sender: 'user' }];
      setChats({ ...chats, [selectedChat]: updatedMessages });
      setMessage('');
    }
  };

  const handleChatSelection = (chatName) => {
    setSelectedChat(chatName);
    setSearchResults([]);  // Clear search results when selecting a chat
  };

  const handleShowUsers = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:8000/api/list-users', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setSearchResults(response.data);
    } catch (error) {
        console.error('Search error:', error);
        alert('Failed to fetch users');
    }
};

//za kreiranje trajnog ceta izmedju korisnika 
const handleStartChat = async (userId) => {
  try {
      const response = await axios.post('http://127.0.0.1:8000/api/start-chat', {
          user_id: userId
      }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data) {
          setSelectedChat(response.data.chat.id);
          setChats(prevChats => ({ ...prevChats, [response.data.chat.id]: [] }));  // Dodavanje novog četa u listu četova
      }
  } catch (error) {
      console.error('Failed to start chat:', error);
      alert('Failed to start chat');
  }
};


  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="sidebar">
          <h2>Chats</h2>
          <button onClick={handleShowUsers} className="search-button">Show Users</button>
          <div className="search-results">
             {searchResults.map(user => (
               <div key={user.id} onClick={() => handleStartChat(user.id)} className="search-result">
                  {user.name}
               </div>
              ))}
          </div>

          <div className="chat-list">
            {Object.keys(chats).length > 0 ? (
              Object.keys(chats).map((chatName) => (
                <div
                  key={chatName}
                  className={`chat-item ${selectedChat === chatName ? 'active' : ''}`}
                  onClick={() => handleChatSelection(chatName)}
                >
                  {chatName}
                </div>
              ))
            ) : (
              <p>Korisnik nema aktivnih četova.</p>
            )}
          </div>
        </div>
        <div className="chat-content">
          <div className="chat-header">
            <h2>{selectedChat || 'Select a Chat'}</h2>
          </div>
          <div className="message-list">
            {selectedChat && chats[selectedChat] ? chats[selectedChat].map((msg, index) => (
              <Message key={index} text={msg.text} sender={msg.sender} />
            )) : <p>No messages in this chat.</p>}
          </div>
          <div className="message-input-container">
            <input
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
