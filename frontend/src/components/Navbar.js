import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/content-writing.png"
import '../styles/Navbar.css';
import Logo from "../assets/VSIT.png";
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showDropdown, setShowDropdown] = useState(false);

  const userLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='hello lg:w-[80%] lg:ml-[155px] lg:mt-6 max478:w-screen'>
    <div className={`navbar-container  ${isLoggedIn ? 'logged-in' : ''}`}>
      <nav className="navbar">
        <div className="logo">
          <Link to="/" ><img  className="w-14" src={Logo}/>
          </Link>
        </div>
        <div className="menu-icon" onClick={toggleDropdown}>
          ☰
        </div>
        <ul className={`navbar-links ${showDropdown ? 'show' : ''}`}>
          <div className='h-[0.11px] bg-[#000000]'></div>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/" onClick={userLogout}>
                  Logout
                </Link>
              </li>
              <li>
                <Link to="/profile">Settings</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Signup</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div></div>
  );
}

export default Navbar;
