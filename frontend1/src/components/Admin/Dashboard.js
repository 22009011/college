import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-actions">
        <Link to="/admin/manage-users">
          <button>Manage Users</button>
        </Link>
        <Link to="/admin/manage-classes">
          <button>Manage Classes</button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
