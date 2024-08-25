import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import './Home.css'; 
import axios from 'axios';


  const Home = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      if (username.trim() === '' || password.trim() === '') {
        setError('Username and password cannot be empty.');
        return;
      }
    
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', {
          email: username,
          password: password,
        });
    
        if (response.data.access_token) {
          // Ako je prijava uspešna
          onLogin(true); // Postavljanje isLoggedIn na true nakon prijave
          navigate('/chat');
        } else {
          // Ako je prijava neuspešna (npr. pogrešni kredencijali)
          setError('Invalid username or password.');
        }
      } catch (error) {
        // Ako se desi greška tokom zahteva ka serveru
        if (error.response && error.response.status === 401) {
          // Ako server vrati 401 Unauthorized, postavite specifičnu poruku o grešci
          setError('Invalid username or password.');
        } else {
          // Za sve ostale greške
          setError('An error occurred during login. Please try again.');
          console.error('Login error:', error);
        }
      }
    };
    
  return (
    <div className="home-page">
      <div className="login-container">
        <div className="sign-in-section">
          <h2>Sign In</h2>
          <TextInput
            id="username"
            label="Email"
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
