import React, { useState } from 'react';
import { Form, Button, Row, Col, Image, OverlayTrigger, Tooltip, Card, Tabs, Tab } from 'react-bootstrap';

const Profile = () => {
  // Get login details from local storage or fallback defaults (expanded fields)
  const loginDetails = JSON.parse(localStorage.getItem('loginDetails')) || {
    name: 'John Doe',
    email: 'john.doe@example.com',
    studentId: 'STU001',
    department: 'Computer Science',
    year: '3rd Year',
    phone: '123-456-7890',
    address: '123 Campus Street, University Town',
    dob: '1999-01-01',
    enrollmentDate: '2020-08-15',
    bio: 'A passionate computer science student who loves coding and technology.',
    hobbies: 'Reading, Coding, Traveling',
    achievements: 'Dean’s List 2021, Hackathon Winner'
  };

  const [profile, setProfile] = useState(loginDetails);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  
  // For simple fade-in animation for the tab content
  const tabContentStyle = {
    transition: 'opacity 400ms ease-in-out',
    opacity: 1
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    localStorage.setItem('loginDetails', JSON.stringify(profile));
  };

  return (
    <div>
      <h2 className="mb-4">Student Profile</h2>
      <Row>
        <Col md={4} className="text-center mb-4">
          <div className="position-relative d-inline-block" style={{ marginBottom: '1rem' }}>
            <Image
              src="https://via.placeholder.com/150"
              roundedCircle
              style={{ marginBottom: '1rem', width: '150px', height: '150px', transition: 'transform 0.3s' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            <OverlayTrigger placement="bottom" overlay={<Tooltip>Edit Photo</Tooltip>}>
              <span
                style={{
                  position: 'absolute',
                  top: '0',
                  right: '-10px',
                  cursor: 'pointer',
                  backgroundColor: '#0d6efd',
                  borderRadius: '50%',
                  width: '30px',
                  height: '30px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white'
                }}
              >
                <i className="fas fa-edit"></i>
              </span>
            </OverlayTrigger>
          </div>
          {!isEditing && (
            <Button variant="primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </Button>
          )}
        </Col>
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <Tabs
              activeKey={activeTab}
              onSelect={(k) => setActiveTab(k)}
              className="mb-3"
            >
              <Tab eventKey="general" title="General Info">
                <div style={tabContentStyle}>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Student ID</Form.Label>
                          <Form.Control type="text" value={profile.studentId} disabled />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Email</Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Department</Form.Label>
                          <Form.Control
                            type="text"
                            name="department"
                            value={profile.department}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Year</Form.Label>
                          <Form.Control
                            type="text"
                            name="year"
                            value={profile.year}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Phone</Form.Label>
                          <Form.Control
                            type="text"
                            name="phone"
                            value={profile.phone}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <Form.Group className="mb-3">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    {isEditing && (
                      <div className="mt-3">
                        <Button variant="primary" type="submit" className="me-2">
                          Save Changes
                        </Button>
                        <Button variant="secondary" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                      </div>
                    )}
                  </Form>
                </div>
              </Tab>
              <Tab eventKey="about" title="About">
                <div style={tabContentStyle}>
                  <h4>Biography</h4>
                  <p>{profile.bio}</p>
                  <Row>
                    <Col md={6}>
                      <h5>Hobbies</h5>
                      <p>{profile.hobbies || "Not Provided"}</p>
                    </Col>
                    <Col md={6}>
                      <h5>Achievements</h5>
                      <p>{profile.achievements || "Not Provided"}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <h5>Date of Birth</h5>
                      <p>{profile.dob}</p>
                    </Col>
                    <Col md={6}>
                      <h5>Enrollment Date</h5>
                      <p>{profile.enrollmentDate}</p>
                    </Col>
                  </Row>
                </div>
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
