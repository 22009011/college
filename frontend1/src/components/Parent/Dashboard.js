import React, { useState } from 'react';
import AttendanceRecords from './ParentDashboard/AttendanceRecords';
import ContactTeachers from './ParentDashboard/ContactTeachers';
import ViewGrades from './ParentDashboard/ViewGrades';
import './Dashboard.css';

const ParentDashboard = () => {
  const [view, setView] = useState(null);

  const handleViewChange = (component) => {
    setView(component);
  };

  return (
    <div className="dashboard">
      <h1>Parent Dashboard</h1>
      <div className="dashboard-actions">
        <button onClick={() => handleViewChange('grades')}>View Child's Grades</button>
        <button onClick={() => handleViewChange('attendance')}>Attendance Records</button>
        <button onClick={() => handleViewChange('contact')}>Contact Teachers</button>
      </div>

      <div className="dashboard-view">
        {view === 'grades' && <ViewGrades />}
        {view === 'attendance' && <AttendanceRecords />}
        {view === 'contact' && <ContactTeachers />}
      </div>
    </div>
  );
};

export default ParentDashboard;
