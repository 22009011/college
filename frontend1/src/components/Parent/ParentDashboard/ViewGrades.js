import React, { useEffect, useState } from 'react';

const ViewGrades = () => {
  const [grades, setGrades] = useState({});
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Fetch grades and feedback from local storage
    const storedGrades = JSON.parse(localStorage.getItem('studentInput')) || {};
    const predictionResult = JSON.parse(localStorage.getItem('predictionResult')) || {};

    setGrades(storedGrades);
    setFeedback(predictionResult.feedback || []);
  }, []);

  // Inline styles
  const containerStyle = {
    backgroundColor: '#f4f4f9',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: 'auto',
    fontFamily: 'Arial, sans-serif',
  };

  const gradesListStyle = {
    marginBottom: '20px',
  };

  const gradeItemStyle = {
    fontSize: '16px',
    color: '#333',
    marginBottom: '8px',
  };

  const subjectStyle = {
    fontWeight: 'bold',
  };

  const feedbackSectionStyle = {
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  const feedbackHeadingStyle = {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
  };

  const feedbackItemStyle = {
    fontSize: '16px',
    color: '#555',
    lineHeight: '1.5',
  };

  return (
    <div style={containerStyle}>
      <h2>Child's Grades</h2>
      <div style={gradesListStyle}>
        {Object.keys(grades).length > 0 ? (
          Object.entries(grades).map(([subject, grade]) => (
            <div key={subject} style={gradeItemStyle}>
              <span style={subjectStyle}>{subject}</span>: <span>{grade}</span>
            </div>
          ))
        ) : (
          <p>No grades available.</p>
        )}
      </div>

      {feedback.length > 0 && (
        <div style={feedbackSectionStyle}>
          <h3 style={feedbackHeadingStyle}>Feedback:</h3>
          <ul>
            {feedback.map((item, index) => (
              <li key={index} style={feedbackItemStyle}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewGrades;
