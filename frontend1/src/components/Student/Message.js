import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

const Message = () => {
  const [recipient, setRecipient] = useState('admin');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // determine endpoint based on recipient selection
    const endpoint = recipient === 'admin' ? '/api/message/admin' : '/api/message/mentor';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (response.ok) {
        setStatus({ type: 'success', msg: 'Message sent successfully.' });
        setMessage('');
      } else {
        setStatus({ type: 'error', msg: 'Failed to send message.' });
      }
    } catch (error) {
      setStatus({ type: 'error', msg: 'Error sending message.' });
    }
  };

  const formStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '500px',
    margin: '20px auto'
  };

  return (
    <div style={formStyle}>
      <h3 className="mb-3">Send Message</h3>
      {status && <Alert variant={status.type === 'success' ? 'success' : 'danger'}>{status.msg}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Recipient</Form.Label>
          <div>
            <Form.Check
              inline
              label="Admin"
              type="radio"
              id="recipient-admin"
              name="recipient"
              value="admin"
              checked={recipient === 'admin'}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <Form.Check
              inline
              label="Mentor"
              type="radio"
              id="recipient-mentor"
              name="recipient"
              value="mentor"
              checked={recipient === 'mentor'}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send Message
        </Button>
      </Form>
    </div>
  );
};

export default Message;
