import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp'; 

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Dodato stanje za login

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Brisanje tokena i svih relevantnih podataka iz localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');  // Ako koristiš userId u localStorage
  
    // Postavljanje bilo kojeg stanja povezanog sa autentifikacijom na false ili prazne vrednosti
    setIsLoggedIn(false);  // Pretpostavljam da se ovo već radi
  
  };
  
  
  return (
    <Router>
     {isLoggedIn && <Navbar handleLogout={handleLogout} />}  
     <Routes>
       <Route path="/home" element={<Home onLogin={handleLogin} />} />
       <Route path="/signup" element={<SignUp />} /> 
       <Route path="/chat" element={isLoggedIn ? <Chat /> : <Home onLogin={handleLogin} />} />
       <Route path="/contact" element={isLoggedIn ? <Contact /> : <Home onLogin={handleLogin} />} />
       <Route path="/" element={<Home onLogin={handleLogin} />} /> 
     </Routes>
   </Router>
 );
 //Navbar se prikazuje samo ako je korisnik ulogovan
 //Home je default stranica
};


export default App;
