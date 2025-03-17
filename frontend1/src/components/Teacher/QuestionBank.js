import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Badge, Modal, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';

const QuestionBank = () => {
  const [questions, setQuestions] = useState(() => {
    return JSON.parse(localStorage.getItem('teacherQuestions')) || [];
  });
  
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState({
    id: null,
    subject: '',
    topic: '',
    difficulty: 'medium',
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    marks: 1
  });

  useEffect(() => {
    localStorage.setItem('teacherQuestions', JSON.stringify(questions));
  }, [questions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentQuestion.id) {
      // Edit existing question
      setQuestions(questions.map(q => 
        q.id === currentQuestion.id ? currentQuestion : q
      ));
    } else {
      // Add new question
      setQuestions([...questions, { ...currentQuestion, id: Date.now() }]);
    }
    setShowModal(false);
    setCurrentQuestion({
      id: null,
      subject: '',
      topic: '',
      difficulty: 'medium',
      questionText: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      marks: 1
    });
  };

  const handleEdit = (question) => {
    setCurrentQuestion(question);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const filteredQuestions = questions.filter(question =>
    question.questionText.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    question.topic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <Card className="mb-4">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h3 className="mb-0">Question Bank</h3>
          <Button 
            variant="light" 
            onClick={() => setShowModal(true)}
          >
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            Add Question
          </Button>
        </Card.Header>
        <Card.Body>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </Form.Group>

          {filteredQuestions.map(question => (
            <Card key={question.id} className="mb-3 question-card">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start">
                  <div>
                    <h5>{question.questionText}</h5>
                    <div className="mb-2">
                      <Badge bg="primary" className="me-2">{question.subject}</Badge>
                      <Badge bg="secondary" className="me-2">{question.topic}</Badge>
                      <Badge 
                        bg={
                          question.difficulty === 'easy' ? 'success' :
                          question.difficulty === 'medium' ? 'warning' : 'danger'
                        }
                      >
                        {question.difficulty}
                      </Badge>
                    </div>
                    <div className="options-list">
                      {question.options.map((option, index) => (
                        <div 
                          key={index}
                          className={`option ${option === question.correctAnswer ? 'correct-answer' : ''}`}
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      className="me-2"
                      onClick={() => handleEdit(question)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleDelete(question.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {currentQuestion.id ? 'Edit Question' : 'Add New Question'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentQuestion.subject}
                    onChange={(e) => setCurrentQuestion({
                      ...currentQuestion,
                      subject: e.target.value
                    })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Topic</Form.Label>
                  <Form.Control
                    type="text"
                    value={currentQuestion.topic}
                    onChange={(e) => setCurrentQuestion({
                      ...currentQuestion,
                      topic: e.target.value
                    })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Question Text</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={currentQuestion.questionText}
                onChange={(e) => setCurrentQuestion({
                  ...currentQuestion,
                  questionText: e.target.value
                })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Options</Form.Label>
              {currentQuestion.options.map((option, index) => (
                <Form.Control
                  key={index}
                  type="text"
                  className="mb-2"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...currentQuestion.options];
                    newOptions[index] = e.target.value;
                    setCurrentQuestion({
                      ...currentQuestion,
                      options: newOptions
                    });
                  }}
                  placeholder={`Option ${index + 1}`}
                  required
                />
              ))}
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Correct Answer</Form.Label>
                  <Form.Select
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => setCurrentQuestion({
                      ...currentQuestion,
                      correctAnswer: e.target.value
                    })}
                    required
                  >
                    <option value="">Select correct answer</option>
                    {currentQuestion.options.map((option, index) => (
                      <option key={index} value={option}>{option || `Option ${index + 1}`}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Difficulty Level</Form.Label>
                  <Form.Select
                    value={currentQuestion.difficulty}
                    onChange={(e) => setCurrentQuestion({
                      ...currentQuestion,
                      difficulty: e.target.value
                    })}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <div className="text-end mt-3">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {currentQuestion.id ? 'Update' : 'Add'} Question
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .question-card:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        .correct-answer {
          color: #198754;
          font-weight: bold;
        }
        .option {
          margin: 5px 0;
          padding: 5px 10px;
          background:rgb(136, 169, 202);
          border-radius: 4px;
        }
        .search-input {
          border-radius: 20px;
          padding: 10px 20px;
        }
      `}</style>
    </div>
  );
};

export default QuestionBank;
