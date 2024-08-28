import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Message from '../components/Message';
import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [userId, setUserId] = useState(null);


  useEffect(() => {
    fetchChats();
  }, []);

  const fetchChats = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/user-chats', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setChats(response.data.chats || []);
      if (response.data.chats && response.data.chats.length > 0) {
        setSelectedChat(response.data.chats[0].id);
      } else {
        setSelectedChat(null);
      }
    } catch (error) {
      console.error('Error fetching chats:', error);
    }
  };

  const handleSend = async () => {
    if (message.trim() && selectedChat) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/send-message', {
          text: message,
          chat_id: selectedChat,
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        if (response.data && response.data.message) {
          const newChats = chats.map(chat => {
            if (chat.id === selectedChat) {
              return { ...chat, messages: [...chat.messages, response.data.message] };
            }
            return chat;
          });
          setChats(newChats);
          setMessage('');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message');
      }
    }
  };

  const handleChatSelection = (chatId) => {
    setSelectedChat(chatId);
    setSearchResults([]);
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
    if (response.data && response.data.chat) {
      const newChatId = response.data.chat.id.toString();
      const newChats = {
        ...chats,
        [newChatId]: { id: newChatId, messages: [] } // Dodaj novi čet sa praznom listom poruka
      };
      setChats(newChats);
      setSelectedChat(newChatId);
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
            {chats.length > 0 ? (
              chats.map((chat) => (
                <div
                  key={chat.id}
                  className={`chat-item ${selectedChat === chat.id ? 'active' : ''}`}
                  onClick={() => handleChatSelection(chat.id)}
                >
                  {chat.name || 'Chat without name'}
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
            {selectedChat && chats.find(chat => chat.id === selectedChat)?.messages ? (
              chats.find(chat => chat.id === selectedChat).messages.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.user_id === userId ? 'sent' : 'received'}`}>
                  <div className="message-content">
                    <Message text={msg.text} sender={msg.sender} />
                  </div>
                </div>
              ))
            ) : <p>No messages in this chat.</p>}
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
