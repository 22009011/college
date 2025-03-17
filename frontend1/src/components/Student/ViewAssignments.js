import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ViewAssignments = () => {
  // Default teacher details (could also be loaded from localStorage)
  const defaultTeacher = {
    name: 'Ms. Smith',
    email: 'ms.smith@example.com',
    office: 'Room 101'
  };

  // Sample assignments with extra details
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: 'Math Homework',
      description: 'Complete exercises 1-20 on page 45.',
      dueDate: '2023-12-20',
      teacher: defaultTeacher
    },
    {
      id: 2,
      title: 'Science Project',
      description: 'Prepare a presentation on renewable energy.',
      dueDate: '2023-12-22',
      teacher: defaultTeacher
    },
    {
      id: 3,
      title: 'History Essay',
      description: 'Analyze the causes of World War II.',
      dueDate: '2023-12-24',
      teacher: defaultTeacher
    }
  ]);

  const [fadeIn, setFadeIn] = useState(false);
  const fadeStyle = {
    transition: 'opacity 500ms ease-in-out',
    opacity: fadeIn ? 1 : 0
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  return (
    <div>
      <h2 className="mb-4">Assignments</h2>
      <p>Here are your upcoming assignments with teacher details:</p>
      <Row>
        {assignments.map(assignment => (
          <Col key={assignment.id} md={4} className="mb-4">
            <Card style={fadeStyle} className="shadow-sm">
              <Card.Body>
                <Card.Title>{assignment.title}</Card.Title>
                <Card.Text>{assignment.description}</Card.Text>
                <Card.Text>
                  <strong>Due:</strong> {assignment.dueDate}
                </Card.Text>
              </Card.Body>
              <Card.Footer style={{ backgroundColor: '#f8f9fa' }}>
                <small>
                  <strong>Teacher:</strong> {assignment.teacher.name} | {assignment.teacher.email}
                </small>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ViewAssignments;
