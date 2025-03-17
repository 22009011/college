import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <ul className="navbar-links">
          <li>
            <Link to="/" className="navbar-link">Home</Link>
          </li>
          <li>
            <Link to="/about" className="navbar-link">About</Link>
          </li>
          <li>
            <Link to="/contact" className="navbar-link">Contact</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login" className="navbar-link">Login</Link>
              </li>
              <li>
                <Link to="/register" className="navbar-link">Register</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={`/${user.role}/dashboard`} className="navbar-link">Dashboard</Link>
              </li>
              <li>
                <button onClick={() => { localStorage.removeItem('user'); window.location.reload(); }} className="navbar-link">
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
