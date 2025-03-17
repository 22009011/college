import React from 'react';
import { Navigate } from 'react-router-dom';

// PrivateRoute component to protect admin, student, teacher, parent routes
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));  // Assuming user is stored in localStorage

  if (!user) {
    // If no user is logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  // Add role-based checks here if needed
  if (user.role === 'admin') {
    return children;  // Allow access to admin routes
  }

  // Modify based on the role you want to restrict
  if (user.role === 'student' || user.role === 'teacher' || user.role === 'parent') {
    return children;  // Allow access to student/teacher/parent routes
  }

  // If the user does not have the correct role, redirect to home
  return <Navigate to="/" />;
};

export default PrivateRoute;
