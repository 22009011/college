import React, { useState, useEffect } from 'react';
import './ContactTeachers.css';

const ContactTeachers = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    // Fetch teacher contact information from local storage
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    setTeachers(storedContacts);
  }, []);

  return (
    <div className="contact-teachers">
      <h2>Contact Teachers</h2>
      {teachers.length > 0 ? (
        <ul className="teacher-list">
          {teachers.map((teacher, index) => (
            <li key={index} className="teacher-item">
              <span className="teacher-name">{teacher.name}</span>
              <span className="teacher-email">{teacher.email}</span>
              <span className="teacher-phone">{teacher.phone}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No teacher contact information available.</p>
      )}
    </div>
  );
};

export default ContactTeachers;
