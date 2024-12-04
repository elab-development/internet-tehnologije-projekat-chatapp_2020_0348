import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({handleLogout}) => {

  const navigate=useNavigate();

  const onSingOut = () => {
    handleLogout(); //Poziva handleLogout iz App.js da se setuje isLoggedIn na false
    navigate('/home', { replace: true }); //Preusmerava na početnu stranu bez mogućnosti povratka
  }
  
  const isAdmin = () => {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]'); // Čita uloge iz localStorage i pretvara ih iz JSON stringa u objekat
    return roles.includes('Administrator'); // Proverava da li korisnik ima ulogu Administrator
  };
  

  return (
    <nav className="navbar">
      <div className="navbar-brand">ChatApp</div>
      <div className="navbar-links">
        <Link to="/chat" className="navbar-link">Chat</Link>
        <Link to="/contact" className="navbar-link">Contact</Link>
        {isAdmin() && <Link to="/adminDashboard" className="navbar-link">Admin Dashboard</Link>}
        <button onClick={onSingOut} className="navbar-link">Sign Out</button>
      </div>
    </nav>
  );
};

export default Navbar;
