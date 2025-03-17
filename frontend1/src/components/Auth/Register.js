import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
  });

  const handleRegister = (e) => {
    e.preventDefault();

    // Check if a user with the same email already exists
    const existingUser = JSON.parse(localStorage.getItem('users')) || [];
    if (existingUser.find((user) => user.email === formData.email)) {
      alert("User with this email already exists");
      return;
    }

    // Save user to localStorage
    const updatedUsers = [...existingUser, formData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    console.log("User registered:", formData);
    alert("Registration successful! Please log in.");

    // Redirect to login page
    navigate('/login');

  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        <select
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Register</button>
        
        <div className="login-link" style={{
          marginTop: '15px',
          textAlign: 'center',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          Already have an account? {' '}
          <Link 
            to="/login" 
            style={{
              color: '#4e73df',
              textDecoration: 'none',
              fontWeight: '600',
              transition: 'color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.color = '#2e59d9'}
            onMouseOut={(e) => e.target.style.color = '#4e73df'}
          >
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;

