import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Dodato stanje za login

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  return (
     <Router>
      {isLoggedIn && <Navbar handleLogout={handleLogout} />}  
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/chat" element={<Chat /> } />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} /> 
      </Routes>
    </Router>
  );
  //Navbar se prikazuje samo ako je korisnik ulogovan
  //Home je default stranica
};


export default App;
