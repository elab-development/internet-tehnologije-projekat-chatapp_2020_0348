import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Contact from './pages/Contact';
import SignUp from './pages/SignUp'; 
import ForgotPassword from './pages/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Dodato stanje za login

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Brisanje tokena i svih relevantnih podataka iz localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');  // Ako koristiš userId u localStorage
    localStorage.removeItem('roles');

    // Postavljanje bilo kojeg stanja povezanog sa autentifikacijom na false ili prazne vrednosti
    setIsLoggedIn(false);  // Pretpostavljam da se ovo već radi
  
  };

  const isAdmin = () => {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    return roles.includes('Administrator');
  };

  
  
  return (
    <Router>
     {isLoggedIn && <Navbar handleLogout={handleLogout} />}  
     <Routes>
       <Route path="/home" element={<Home onLogin={handleLogin} />} />
       <Route path="/signup" element={<SignUp />} /> 
       <Route path="/forgot-password" element={<ForgotPassword/>} />
       <Route path="/chat" element={isLoggedIn ? <Chat /> : <Home onLogin={handleLogin} />} />
       <Route path="/contact" element={isLoggedIn ? <Contact /> : <Home onLogin={handleLogin} />} />
       <Route path="/adminDashboard" element={isLoggedIn && isAdmin() ? <AdminDashboard /> : <Navigate replace to="/home" />} />
       <Route path="/" element={<Home onLogin={handleLogin} />} /> 
     </Routes>
   </Router>
 );
 //Navbar se prikazuje samo ako je korisnik ulogovan
 //Home je default stranica
};


export default App;
