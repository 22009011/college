import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-cover bg-center" 
      style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGqFjbTJDR7CUG2zJPLdBN7QM9B3pWSmGROigp6gCAi-JPaxg4fTrRW9hf&s')`,
        backgroundColor: '#1a365d' // Fallback color
      }}>
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">AcadPredict</span>
            </div>
            <ul className="flex space-x-8">
              <li>
                <Link to="/" className="text-gray-800 hover:text-indigo-600 font-medium transition duration-300">Home</Link>
              </li>
              <li>
                <Link to="/features" className="text-gray-800 hover:text-indigo-600 font-medium transition duration-300">Features</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-800 hover:text-indigo-600 font-medium transition duration-300">About</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-800 hover:text-indigo-600 font-medium transition duration-300">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-800 hover:text-indigo-600 font-medium transition duration-300">Register</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Main content area - Empty for now */}
      <div className="container mx-auto px-6 py-12">
        {/* This div is kept as a placeholder for any future content */}
      </div>
    </div>
  );
};

export default Home;