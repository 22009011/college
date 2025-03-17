import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faClipboard, 
  faChartLine, 
  faBell 
} from '@fortawesome/free-solid-svg-icons';

const QuickStats = ({ studentData }) => {
  const stats = [
    {
      title: 'Enrolled Courses',
      value: studentData.enrolledCourses,
      icon: faGraduationCap,
      color: 'primary',
      percent: 70
    },
    {
      title: 'Pending Assignments',
      value: studentData.pendingAssignments,
      icon: faClipboard,
      color: 'warning',
      percent: 50
    },
    {
      title: 'Current GPA',
      value: studentData.latestGPA,
      icon: faChartLine,
      color: 'success',
      percent: studentData.latestGPA * 25 // assume 4.0 scale => 100%
    },
    {
      title: 'Notifications',
      value: studentData.notifications,
      icon: faBell,
      color: 'info',
      percent: 30
    }
  ];

  return (
    <Row>
      {stats.map((stat, index) => (
        <Col key={index} md={6} lg={3} className="mb-4">
          <Card className={`border-${stat.color} shadow-sm h-100`}>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="text-muted mb-1">{stat.title}</h6>
                  <h3 className="mb-0">{stat.value}</h3>
                </div>
                <div className={`icon-circle bg-${stat.color} text-white`}>
                  <FontAwesomeIcon icon={stat.icon} size="lg" />
                </div>
              </div>
              <ProgressBar now={stat.percent} variant={stat.color} className="mt-2" />
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default QuickStats;
