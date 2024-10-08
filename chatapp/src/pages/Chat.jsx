import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTubeEmbed from '../components/YouTubeEmbed';
import './Chat.css';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);
  const [chats, setChats] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user-id', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserId(response.data.user_id);
        fetchChats();
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };

    fetchUserId();
  }, []);

  const fetchChats = async () => {
    try {
      const token = localStorage.getItem('token');
      const roles = JSON.parse(localStorage.getItem('roles'));
      const isModerator = roles.includes('moderator');
      const url = isModerator ? 'http://127.0.0.1:8000/api/chats' : 'http://127.0.0.1:8000/api/user-chats';
  
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` }
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

  const handleStartChat = async (userId) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/start-chat', {
        user_id: userId
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (response.data && response.data.chat) {
        const newChatId = response.data.chat.id.toString();
        const newChat = { id: newChatId, messages: [] };
        const newChats = [...chats, newChat];
        setChats(newChats);

        setSelectedChat(newChatId);
      }
    } catch (error) {
      console.error('Failed to start chat:', error);
      alert('Failed to start chat');
    }
  };

  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/;

  const handleExportPDF = async () => {
    if (!selectedChat) {
      alert('Select a chat to export');
      return;
    }
    window.open(`http://127.0.0.1:8000/api/export-chat/${selectedChat}`, '_blank');
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
              <p>No active chats.</p>
            )}
          </div>
        </div>
        <div className="chat-content">
          <div className="chat-header">
            <h2>{selectedChat ? chats.find(chat => chat.id === selectedChat)?.name : 'Select a Chat'}</h2>
            <button onClick={handleExportPDF} className="export-button">Export as PDF</button>
          </div>
          
          <div className="message-list">
            {selectedChat && chats.find(chat => chat.id === selectedChat)?.messages ? (
              chats.find(chat => chat.id === selectedChat).messages.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.user_id === userId ? 'sent' : 'received'}`}>
                  {msg.text.match(youtubeRegex) ? (
                    <YouTubeEmbed videoId={msg.text.match(youtubeRegex)[1]} />
                  ) : (
                    <p>{msg.text}</p>
                  )}
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


