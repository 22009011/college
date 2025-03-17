// ClassSchedule.js
import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, ButtonGroup, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faSearch, faStar, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const defaultSchedule = [
  { id: 1, day: 'Monday', info: 'Math (9:00 AM - 10:30 AM)' },
  { id: 2, day: 'Tuesday', info: 'Science (10:00 AM - 11:30 AM)' },
  { id: 3, day: 'Wednesday', info: 'History (1:00 PM - 2:30 PM)' },
  { id: 4, day: 'Thursday', info: 'Art (2:00 PM - 3:00 PM)' },
  { id: 5, day: 'Friday', info: 'Physical Education (8:00 AM - 9:00 AM)' },
];

const STORAGE_KEYS = {
  selectedDay: 'cs_selectedDay',
  searchTerm: 'cs_searchTerm',
  favorites: 'cs_favorites',
  customSchedule: 'cs_customSchedule',
};

const ClassSchedule = () => {
  // Load persisted values from localStorage
  const [selectedDay, setSelectedDay] = useState(localStorage.getItem(STORAGE_KEYS.selectedDay) || 'All');
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem(STORAGE_KEYS.searchTerm) || '');
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem(STORAGE_KEYS.favorites)) || []);
  const [customSchedule, setCustomSchedule] = useState(JSON.parse(localStorage.getItem(STORAGE_KEYS.customSchedule)) || []);
  const [newEvent, setNewEvent] = useState({ day: 'Monday', info: '' });

  // Combine default and custom schedules
  const combinedSchedule = [...defaultSchedule, ...customSchedule];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.selectedDay, selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.searchTerm, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.customSchedule, JSON.stringify(customSchedule));
  }, [customSchedule]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const filteredItems = combinedSchedule.filter(item => {
    const dayMatch = selectedDay === 'All' || item.day === selectedDay;
    const searchMatch = item.info.toLowerCase().includes(searchTerm.toLowerCase());
    return dayMatch && searchMatch;
  });

  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleAddEvent = (e) => {
    e.preventDefault();
    if (newEvent.info.trim() === '') return;
    const id = Date.now();
    setCustomSchedule([...customSchedule, { id, day: newEvent.day, info: newEvent.info }]);
    setNewEvent({ day: 'Monday', info: '' });
  };

  const handleDeleteEvent = (id) => {
    setCustomSchedule(customSchedule.filter(item => item.id !== id));
    setFavorites(favorites.filter(favId => favId !== id));
  };

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="mb-0">
            <FontAwesomeIcon icon={faCalendarAlt} className="me-2" /> Weekly Class Schedule
          </h4>
          <InputGroup style={{ maxWidth: '220px' }}>
            <Form.Control
              type="text"
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ borderRadius: '20px' }}
            />
            <InputGroup.Text style={{ backgroundColor: 'transparent', border: 'none' }}>
              <FontAwesomeIcon icon={faSearch} style={{ color: '#fff' }} />
            </InputGroup.Text>
          </InputGroup>
        </div>
      </Card.Header>
      <Card.Body>
        <ButtonGroup className="mb-3">
          {days.map(day => (
            <Button
              key={day}
              variant={selectedDay === day ? 'primary' : 'outline-primary'}
              onClick={() => setSelectedDay(day)}
            >
              {day}
            </Button>
          ))}
        </ButtonGroup>
        <ListGroup variant="flush">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <ListGroup.Item key={item.id} className="d-flex align-items-center justify-content-between">
                <div>
                  <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-secondary" />
                  <strong>{item.day}:</strong> {item.info}
                </div>
                <div>
                  <Button variant="link" onClick={() => toggleFavorite(item.id)}>
                    <FontAwesomeIcon icon={faStar} className={favorites.includes(item.id) ? 'text-warning' : 'text-secondary'} />
                  </Button>
                  {customSchedule.find(e => e.id === item.id) && (
                    <Button variant="link" onClick={() => handleDeleteEvent(item.id)}>
                      <FontAwesomeIcon icon={faTrash} className="text-danger" />
                    </Button>
                  )}
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item>No classes found.</ListGroup.Item>
          )}
        </ListGroup>
        {/* Form to add custom schedule event */}
        <Form onSubmit={handleAddEvent} className="mt-4">
          <h5>Add Custom Event</h5>
          <Form.Group className="mb-2">
            <Form.Label>Day</Form.Label>
            <Form.Select value={newEvent.day} onChange={(e) => setNewEvent({ ...newEvent, day: e.target.value })}>
              {days.filter(d => d !== 'All').map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Event Details</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event details..."
              value={newEvent.info}
              onChange={(e) => setNewEvent({ ...newEvent, info: e.target.value })}
            />
          </Form.Group>
          <Button variant="success" type="submit">
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add Event
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ClassSchedule;
