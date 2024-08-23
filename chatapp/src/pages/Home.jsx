import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import './Home.css'; 

const Home = ({onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === '' || password.trim() === '') {
      setError('Username and password cannot be empty.');
      return;
    }
    setError('');
    onLogin(true); //Postavljanje isloggedin na true nakon prijave
    navigate('/chat');
  };

  return (
    <div className="home-page">
      <div className="login-container">
        <div className="sign-in-section">
          <h2>Sign In</h2>
          <TextInput
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextInput
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="options">
            <label>
              <input type="checkbox" /> Remember Me
            </label>
            <a href="/forgot-password" className="forgot-password">Forgot Password</a>
          </div>
          {error && <p className="error-message">{error}</p>}
          <Button text="Sign In" onClick={handleLogin} />
        </div>
        <div className="welcome-section">
          <h2>Welcome to Login</h2>
          <p>Don't have an account?</p>
          <Button text="Sign Up" onClick={() => navigate('/signup')} />
        </div>
      </div>
    </div>
  );
};

export default Home;
