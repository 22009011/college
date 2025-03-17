import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleAddContact = () => {
    const newContact = { name, email, phone };
    const storedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    localStorage.setItem('contacts', JSON.stringify([...storedContacts, newContact]));
    setName('');
    setEmail('');
    setPhone('');
    alert('Contact added successfully!');
  };

  return (
    <div className="contact-page">
      <h2>Add Teacher Contact</h2>
      <div className="contact-form">
        <input
          type="text"
          placeholder="Teacher's Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Teacher's Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Teacher's Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleAddContact}>Add Contact</button>
      </div>
    </div>
  );
};

export default Contact;
