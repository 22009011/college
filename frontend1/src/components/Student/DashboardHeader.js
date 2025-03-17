import React, { useState, useEffect } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const DashboardHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Row className="align-items-center p-3" style={{ background: 'linear-gradient(to right, #4e73df, #7790db)', color: 'white' }}>
      <Col md={6}>
        <h2>Welcome to College Dashboard</h2>
        <p>{currentTime.toLocaleDateString()} | {formatTime(currentTime)}</p>
      </Col>
      <Col md={6} className="position-relative">
        <Form>
          <Form.Group controlId="dashboardSearch" className="position-relative">
            <Form.Control
              type="text"
              placeholder="Search..."
              style={{ borderRadius: '50px', padding: '10px 40px 10px 20px' }}
            />
            <FontAwesomeIcon
              icon={faSearch}
              className="position-absolute"
              style={{ right: '20px', top: '50%', transform: 'translateY(-50%)', color: '#777' }}
            />
          </Form.Group>
        </Form>
      </Col>
    </Row>
  );
};

export default DashboardHeader;