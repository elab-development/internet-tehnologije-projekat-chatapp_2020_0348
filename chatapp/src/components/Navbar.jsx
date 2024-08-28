import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({handleLogout}) => {

  const navigate=useNavigate();

  const onSingOut = () => {
    handleLogout(); //Poziva handleLogout iz App.js da se setuje isLoggedIn na false
    navigate('/home', { replace: true }); //Preusmerava na početnu stranu bez mogućnosti povratka
  }
  

  return (
    <nav className="navbar">
      <div className="navbar-brand">ChatApp</div>
      <div className="navbar-links">
        <Link to="/chat" className="navbar-link">Chat</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
        <button onClick={onSingOut} className="navbar-link">Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
