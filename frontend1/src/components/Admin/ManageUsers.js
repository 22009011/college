import React, { useState, useEffect } from 'react';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '', // Add email to newUser state
    role: 'student',
  });

  useEffect(() => {
    // Fetch users from local storage on component mount
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(storedUsers);
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUsersList = [...users, { ...newUser, id: Date.now() }];
    setUsers(newUsersList);
    localStorage.setItem('users', JSON.stringify(newUsersList));
    setNewUser({ name: '', email: '', role: 'student' }); // Reset the form
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const renderUserTable = (role) => {
    const filteredUsers = users.filter(user => user.role === role);
    return (
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td> {/* Display email */}
              <td>{user.role}</td>
              <td>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="manage-users">
      <h1>Manage Users</h1>

      {/* User Creation Form */}
      <form onSubmit={handleAddUser} className="add-user-form">
        <input
          type="text"
          placeholder="User Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"  
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="parent">Parent</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="add-user-btn">Add User</button>
      </form>

      {/* Render Tables for Different Roles */}
      <div className="tables-container">
        <h2>Students</h2>
        {renderUserTable('student')}
        <h2>Teachers</h2>
        {renderUserTable('teacher')}
        <h2>Parents</h2>
        {renderUserTable('parent')}
        <h2>Admins</h2>
        {renderUserTable('admin')}
      </div>
    </div>
  );
};

export default ManageUsers;
