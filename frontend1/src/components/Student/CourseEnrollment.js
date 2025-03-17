import React, { useState, useEffect } from 'react';
import { Table, Button, Badge, Form, Modal, InputGroup } from 'react-bootstrap';

const STORAGE_KEYS = {
  search: 'course_search',
  favoriteCourses: 'course_favorites',
  customCourses: 'course_custom'
};

const defaultCourses = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Programming',
    instructor: 'Dr. Smith',
    credits: 3,
    schedule: 'Mon/Wed 10:00 AM',
    seats: 5
  },
  // ...existing courses...
];

const CourseEnrollment = () => {
  const [search, setSearch] = useState(localStorage.getItem(STORAGE_KEYS.search) || '');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem(STORAGE_KEYS.favoriteCourses)) || []);
  const [customCourses, setCustomCourses] = useState(JSON.parse(localStorage.getItem(STORAGE_KEYS.customCourses)) || []);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({ code: '', name: '', instructor: '', credits: '', schedule: '', seats: '' });

  // Merge default and custom courses
  const courses = [...defaultCourses, ...customCourses];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.search, search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favoriteCourses, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.customCourses, JSON.stringify(customCourses));
  }, [customCourses]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(search.toLowerCase()) ||
    course.code.toLowerCase().includes(search.toLowerCase())
  );

  const handleEnroll = (course) => {
    // simulate enrollment action or API call
    alert(`Enrolled in ${course.name}`);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.name) return;
    const courseToAdd = { id: Date.now(), ...newCourse, credits: Number(newCourse.credits), seats: Number(newCourse.seats) };
    setCustomCourses([...customCourses, courseToAdd]);
    setNewCourse({ code: '', name: '', instructor: '', credits: '', schedule: '', seats: '' });
    setShowModal(false);
  };

  return (
    <div>
      <h2 className="mb-4">Course Enrollment</h2>
      <InputGroup className="mb-3">
        <Form.Control 
          type="text" 
          placeholder="Search courses..."
          value={search}
          onChange={(e)=> setSearch(e.target.value)}
        />
      </InputGroup>
      <Button variant="success" className="mb-3" onClick={() => setShowModal(true)}>
        Add Custom Course
      </Button>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Instructor</th>
            <th>Credits</th>
            <th>Schedule</th>
            <th>Available Seats</th>
            <th>Favorite</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.map(course => (
            <tr key={course.id}>
              <td>{course.code}</td>
              <td>{course.name}</td>
              <td>{course.instructor}</td>
              <td>{course.credits}</td>
              <td>{course.schedule}</td>
              <td>
                <Badge bg={course.seats > 0 ? 'success' : 'danger'}>
                  {course.seats}
                </Badge>
              </td>
              <td>
                <Button variant="link" onClick={() => toggleFavorite(course.id)}>
                  <i className={`fas fa-star ${favorites.includes(course.id) ? 'text-warning' : 'text-secondary'}`}></i>
                </Button>
              </td>
              <td>
                <Button 
                  variant="primary" 
                  size="sm"
                  disabled={course.seats === 0}
                  onClick={() => handleEnroll(course)}
                >
                  Enroll
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal form for adding a new custom course */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Custom Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddCourse}>
            <Form.Group className="mb-2">
              <Form.Label>Course Code</Form.Label>
              <Form.Control 
                type="text" 
                value={newCourse.code}
                onChange={(e) => setNewCourse({...newCourse, code: e.target.value })}
                required 
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Course Name</Form.Label>
              <Form.Control 
                type="text" 
                value={newCourse.name}
                onChange={(e) => setNewCourse({...newCourse, name: e.target.value })}
                required 
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Instructor</Form.Label>
              <Form.Control 
                type="text" 
                value={newCourse.instructor}
                onChange={(e) => setNewCourse({...newCourse, instructor: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Credits</Form.Label>
              <Form.Control 
                type="number" 
                value={newCourse.credits}
                onChange={(e) => setNewCourse({...newCourse, credits: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Schedule</Form.Label>
              <Form.Control 
                type="text" 
                value={newCourse.schedule}
                onChange={(e) => setNewCourse({...newCourse, schedule: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Available Seats</Form.Label>
              <Form.Control 
                type="number" 
                value={newCourse.seats}
                onChange={(e) => setNewCourse({...newCourse, seats: e.target.value })}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="mt-2">
              Add Course
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CourseEnrollment;
