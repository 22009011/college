import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUpload, 
  faGraduationCap, 
  faUserCheck, 
  faBell, 
  faSignOutAlt,
  faUser,
  faQuestion
} from '@fortawesome/free-solid-svg-icons';

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const [teacherData, setTeacherData] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Get teacher data from localStorage (saved during registration)
    const teacherInfo = JSON.parse(localStorage.getItem('teacherInfo')) || {
      name: 'Dr. Smith',
      email: 'smith@college.edu',
      department: 'Computer Science',
      qualification: 'Ph.D.',
      joinDate: '2022-01-01',
      expertise: 'Machine Learning'
    };
    setTeacherData(teacherInfo);
  }, []);

  const handleAttendanceRedirect = () => {
    navigate('/teacher/Attendance');
  };

  const handleLogout = () => {
    localStorage.removeItem('teacherInfo');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Profile */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            
            {/* Profile Section */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-3 hover:bg-blue-700 rounded-lg px-3 py-2 transition duration-200"
              >
                <img
                  src={`https://ui-avatars.com/api/?name=${teacherData?.name}&background=random`}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div className="text-left hidden md:block">
                  <p className="font-semibold">{teacherData?.name}</p>
                  <p className="text-sm opacity-90">{teacherData?.department}</p>
                </div>
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-10">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm text-gray-700">{teacherData?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FontAwesomeIcon icon={faGraduationCap} className="text-blue-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-gray-500">Total Students</p>
                <h3 className="text-2xl font-bold">150</h3>
              </div>
            </div>
          </div>
          {/* Add more stat cards here */}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => alert('Upload Assignments')}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 flex items-center justify-center space-x-3"
          >
            <FontAwesomeIcon icon={faUpload} className="text-blue-600" />
            <span>Upload Assignments</span>
          </button>
          
          <button
            onClick={() => alert('Grade Students')}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 flex items-center justify-center space-x-3"
          >
            <FontAwesomeIcon icon={faGraduationCap} className="text-blue-600" />
            <span>Grade Students</span>
          </button>
          
          <button
            onClick={handleAttendanceRedirect}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 flex items-center justify-center space-x-3"
          >
            <FontAwesomeIcon icon={faUserCheck} className="text-blue-600" />
            <span>Attendance Details</span>
          </button>

          <button
            onClick={() => navigate('/teacher/questions')}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition duration-200 flex items-center justify-center space-x-3"
          >
            <FontAwesomeIcon icon={faQuestion} className="text-blue-600" />
            <span>Question Bank</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
