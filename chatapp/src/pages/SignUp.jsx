import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import './SignUp.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = () => {
    // Validacija da li su uneti svi podaci
    if (username && email && password) {
        navigate('/home');
      } else {
        alert('Please fill in all fields.');
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
