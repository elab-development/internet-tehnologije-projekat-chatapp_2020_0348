import React, { useState } from 'react';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika za slanje podataka
    alert('Message sent!');
  };

  return (
    <div className="contact-container">
      <div className="contact-info">
        <h2>Kontakt Info</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus blanditiis, perferendis aliquam.</p>
        <div className="location">
          <h4>Srbija</h4>
          <p>Jove Ilica, Vozdovac, Beograd</p>
          <p>+(381) 69 6789 123</p>
          <p>info@mywebsite.com</p>
        </div>
        <div className="location">
          <h4>United States</h4>
          <p>Wall Street, New York, United States</p>
          <p>+1 (222) 345 6789</p>
          <p>info@mywebsite.com</p>
        </div>
      </div>

      <div className="contact-form">
        <h3>Posaljite nam poruku</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <TextInput
              label="Ime:"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Unesite vase ime"
            />
          </div>
          <div className="form-group">
            <TextInput
              label="Email:"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Unesite vas email"
            />
          </div>
          <div className="form-group">
            <TextInput
              label="Poruka:"
              id="message"
              type="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Unesite poruku"
            />
          </div>
          <Button text="Posalji poruku" />
        </form>
      </div>
    </div>
  );
};

export default Contact;
