import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminDashboard from './components/Admin/Dashboard';
import ManageUsers from './components/Admin/ManageUsers';
import ManageClasses from './components/Admin/ManageClasses';
import StudentDashboard from './components/Student/Dashboard';
import CheckGrades from './components/Student/CheckGrades';
import ViewGrades from './components/Parent/ParentDashboard/ViewGrades';
import TeacherDashboard from './components/Teacher/Dashboard';
import QuestionBank from './components/Teacher/QuestionBank';
import Attendance from './components/Teacher/Attendance';
import ParentDashboard from './components/Parent/Dashboard';
import Navbar from './components/Navbar';  // Common Navbar component
import PrivateRoute from './components/PrivateRoute';  // Custom route for protecting private routes
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Common Navbar */}
        <Navbar />

        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Private Routes */}
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
          <Route path="/admin/manage-users" element={<PrivateRoute><ManageUsers /></PrivateRoute>} />
          <Route path="/admin/manage-classes" element={<PrivateRoute><ManageClasses /></PrivateRoute>} />

          {/* Student Routes */}
          <Route path="/student/dashboard" element={<PrivateRoute><StudentDashboard /></PrivateRoute>} />
          <Route path="/student/CheckGrades" element={<PrivateRoute><CheckGrades /></PrivateRoute>} />
          {/* Teacher Routes */}
          <Route path="/teacher/dashboard" element={<PrivateRoute><TeacherDashboard /></PrivateRoute>} />
          <Route path="/teacher/Attendance" element={<PrivateRoute><Attendance /></PrivateRoute>} />
          <Route path="/teacher/QuestionBank" element={<PrivateRoute><QuestionBank /></PrivateRoute>} />
          

          {/* Parent Routes */}
          <Route path="/Parent/dashboard" element={<PrivateRoute><ParentDashboard /></PrivateRoute>} />
          <Route path="/Parent/dashboard/ParentDashboard/ViewGrades" element={<PrivateRoute>< ViewGrades/></PrivateRoute>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
