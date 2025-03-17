import React, { useState, useEffect } from 'react';
import './ManageClasses.css';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    id: '',
    name: '',
    teacher: '',
  });
  const [editClass, setEditClass] = useState(null);

  useEffect(() => {
    // Fetching classes from localStorage on initial load
    const savedClasses = JSON.parse(localStorage.getItem('classes')) || [];
    setClasses(savedClasses);
  }, []);

  // Function to handle the form submission for adding/updating classes
  const handleSubmit = (e) => {
    e.preventDefault();

    // If editing, update the class
    if (editClass) {
      const updatedClasses = classes.map((cls) =>
        cls.id === editClass.id ? { ...cls, ...newClass } : cls
      );
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      setClasses(updatedClasses);
      setEditClass(null); // Reset after editing
      setNewClass({ id: '', name: '', teacher: '' });
    } else {
      // If adding new class, generate a new ID and save
      const newClassWithId = { ...newClass, id: Date.now() };
      const updatedClasses = [...classes, newClassWithId];
      localStorage.setItem('classes', JSON.stringify(updatedClasses));
      setClasses(updatedClasses);
      setNewClass({ id: '', name: '', teacher: '' });
    }
  };

  // Function to handle class deletion
  const deleteClass = (id) => {
    const updatedClasses = classes.filter(cls => cls.id !== id);
    localStorage.setItem('classes', JSON.stringify(updatedClasses));
    setClasses(updatedClasses);
    alert(`Class with ID ${id} deleted.`);
  };

  // Function to handle editing a class
  const handleEdit = (cls) => {
    setEditClass(cls);
    setNewClass({ id: cls.id, name: cls.name, teacher: cls.teacher });
  };

  return (
    <div className="manage-classes">
      <h1>Manage Classes</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Class Name"
          value={newClass.name}
          onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Teacher Name"
          value={newClass.teacher}
          onChange={(e) => setNewClass({ ...newClass, teacher: e.target.value })}
          required
        />
        <button type="submit">
          {editClass ? 'Update Class' : 'Add Class'}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Class Name</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls) => (
            <tr key={cls.id}>
              <td>{cls.id}</td>
              <td>{cls.name}</td>
              <td>{cls.teacher}</td>
              <td>
                <button onClick={() => handleEdit(cls)} className="edit-btn">
                  Edit
                </button>
                <button onClick={() => deleteClass(cls.id)} className="delete-btn">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageClasses;
