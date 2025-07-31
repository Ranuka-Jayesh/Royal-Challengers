import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../GI_logo.png';

const Navbar = () => {
  const [authState, setAuthState] = useState({
    isAdmin: localStorage.getItem('isAdmin') === 'true',
    isUser: localStorage.getItem('isUser') === 'true'
  });
  useEffect(() => {
    const syncAuth = () => {
      setAuthState({
        isAdmin: localStorage.getItem('isAdmin') === 'true',
        isUser: localStorage.getItem('isUser') === 'true'
      });
    };
    window.addEventListener('storage', syncAuth);
    window.addEventListener('login', syncAuth);
    return () => {
      window.removeEventListener('storage', syncAuth);
      window.removeEventListener('login', syncAuth);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isUser');
    setAuthState({ isAdmin: false, isUser: false });
    window.dispatchEvent(new Event('login'));
  };
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Global Image Logo" className="navbar-logo-img" />
        <span className="navbar-logo-text">Global Image</span>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/services">SERVICES</Link></li>
        <li><Link to="/about">ABOUT US</Link></li>
        <li><Link to="/portfolio">PORTFOLIO</Link></li>
        <li><Link to="/contact">CONTACT US</Link></li>
        <li><Link to="/booking">BOOKING</Link></li>
        {!(authState.isAdmin || authState.isUser) && <li><Link to="/signin">Sign in</Link></li>}
        {!(authState.isAdmin || authState.isUser) && <li><Link to="/register">Register</Link></li>}
      </ul>
      {(authState.isAdmin || authState.isUser) && (
        <button
          onClick={handleLogout}
          style={{
            marginLeft: 24,
            background: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            padding: '8px 20px',
            fontWeight: 'bold',
            fontSize: 16,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            alignSelf: 'center',
            height: 40
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navbar; 