import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import './SignUp.css';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name: username,
        email: email,
        password: password
      });
  
      if (response.data.access_token) {
        alert('Registration successful!');
        navigate('/home'); // Navigacija na početnu stranicu ili neku drugu stranicu po uspešnoj registraciji
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const errors = error.response.data.errors;
        let errorMessage = 'Failed to register. ';
    
        if (errors.email) {
          errorMessage += errors.email; // Specifična poruka za email grešku
        }
    
        if (errors.password) {
          errorMessage += errors.password; // Specifična poruka za grešku lozinke
        }
    
        alert(errorMessage);
      } else {
        alert('An unexpected error occurred. Please try again later.');
      }
      console.error('Registration error:', error);
    }
      
  };
  
  

  return (
    <div className="signup-container">
      <div className="signup-left">
        <h2>Welcome Back!</h2>
        <p>To keep connected with us please login with your personal info.</p>
        <Button text="Sign In" onClick={() => navigate('/home')} />
      </div>
      <div className="signup-right">
        <h2>Create Account</h2>
        
        <TextInput
          id="username"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextInput
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Sign Up" onClick={handleSignup} />
      </div>
    </div>
  );
};

export default Signup;
