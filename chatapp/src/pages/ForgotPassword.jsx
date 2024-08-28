import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/forgot-password', { email });
            setMessage(response.data.message); // Postavi poruku nakon uspeha
        } catch (error) {
            setMessage('Error sending reset link.'); // Postavi poruku nakon greške
        }
    };

    return (
        <div>
            <h2>Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleForgotPassword}>Send Reset Link</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ForgotPassword;
