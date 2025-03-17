import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, faBook, faCalendarAlt, faClipboard, 
  faChartBar, faBell, faGraduationCap, faComment, faCog 
} from '@fortawesome/free-solid-svg-icons';
import QuickStats from './QuickStats';
import Profile from './Profile';
import CourseEnrollment from './CourseEnrollment';
import ViewAssignments from './ViewAssignments';
import CheckGrades from './CheckGrades';
import ClassSchedule from './ClassSchedule';
import Message from './Message'; // <-- Added import for Message

const StudentDashboard = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [studentData, setStudentData] = useState({
    name: 'John Doe',
    notifications: 3,
    enrolledCourses: 5,
    pendingAssignments: 2,
    latestGPA: 3.8
  });

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return <Profile />;
      case 'courses': return <CourseEnrollment />;
      case 'assignments': return <ViewAssignments />;
      case 'grades': return <CheckGrades />;
      case 'schedule': return <ClassSchedule />;
      case 'messages': return <Message />; // <-- Added case for messages
      default: return null;
    }
  };

  return (
    <Container fluid className="dashboard-container">
      {/* Header with enhanced design and slide-in animation */}
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <Row className="mb-3">
        <Col 
          className="p-4 text-center" 
          style={{
            backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(https://via.placeholder.com/1500x300)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            color: '#fff',
            animation: 'slideIn 1s ease-out',
            position: 'relative'
          }}
        >
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            Student Dashboard
          </h1>
          <p style={{ fontSize: '1.2rem', textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            Your academic journey at a glance
          </p>
          <div style={{ position: 'absolute', top: '10px', right: '20px' }}>
            <FontAwesomeIcon 
              icon={faCog} 
              size="2x" 
              style={{ cursor: 'pointer', color: '#fff' }} 
              title="Settings" 
            />
          </div>
        </Col>
      </Row>
      
      <Row>
        <Col md={3} lg={2} className="sidebar bg-dark text-white p-4 min-vh-100">
          <div className="user-profile text-center mb-4">
            <img
              src="https://via.placeholder.com/80"
              alt="Profile"
              className="rounded-circle mb-3"
            />
            <h5>{studentData.name}</h5>
          </div>
          
          <Nav className="flex-column">
            <Nav.Link 
              className={`mb-2 ${activeSection === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveSection('overview')}
            >
              <FontAwesomeIcon icon={faGraduationCap} className="me-2" />
              Overview
            </Nav.Link>
            <Nav.Link 
              className={`mb-2 ${activeSection === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveSection('profile')}
            >
              <FontAwesomeIcon icon={faUser} className="me-2" />
              Profile
            </Nav.Link>
            <Nav.Link 
              className={`mb-2 ${activeSection === 'courses' ? 'active' : ''}`}
              onClick={() => setActiveSection('courses')}
            >
              <FontAwesomeIcon icon={faBook} className="me-2" />
              Course Enrollment
            </Nav.Link>
            <Nav.Link 
              className={`mb-2 ${activeSection === 'schedule' ? 'active' : ''}`}
              onClick={() => setActiveSection('schedule')}
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
              Class Schedule
            </Nav.Link>
            <Nav.Link 
              className={`mb-2 ${activeSection === 'assignments' ? 'active' : ''}`}
              onClick={() => setActiveSection('assignments')}
            >
              <FontAwesomeIcon icon={faClipboard} className="me-2" />
              Assignments
            </Nav.Link>
            <Nav.Link 
              className={`mb-2 ${activeSection === 'grades' ? 'active' : ''}`}
              onClick={() => setActiveSection('grades')}
            >
              <FontAwesomeIcon icon={faChartBar} className="me-2" />
              Grades
            </Nav.Link>
            <Nav.Link 
              className={`mb-2 ${activeSection === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveSection('messages')}
            >
              <FontAwesomeIcon icon={faComment} className="me-2" />
              Messages
            </Nav.Link>
          </Nav>
        </Col>

        <Col md={9} lg={10} className="main-content p-4">
          <Row className="mb-4">
            <Col>
              <h1 className="welcome-text">
                Welcome back, {studentData.name}!
              </h1>
            </Col>
          </Row>

          {activeSection === 'overview' && (
            <>
              <QuickStats studentData={studentData} />
              <Row className="mt-4">
                <Col md={8}>
                  <Card className="shadow-sm mb-4">
                    <Card.Body>
                      <h3>Recent Activity</h3>
                      {/* Activity content */}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card className="shadow-sm">
                    <Card.Body>
                      <h3>Upcoming Deadlines</h3>
                      {/* Deadlines content */}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          )}

          <Card className="shadow-sm">
            <Card.Body>
              {renderContent()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default StudentDashboard;
