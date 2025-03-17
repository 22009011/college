import React, { useState } from "react";
import { saveToLocalStorage } from "../utils/localStorageUtils";
import { Button, Row, Col } from "react-bootstrap";

const CheckGrades = ({ setPredictionResult = () => {} }) => {
  const [formData, setFormData] = useState({
    Attendance: "",
    AssignmentScores: "",
    ExamScores: "",
    Participation: "",
    ExtraCurricular: "",
    StudyHoursPerWeek: "",
    TeacherRatings: "",
    SleepHoursPerNight: "",
    TechnologyUsageHours: "",
    MotivationalLevel: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  };

  const generatePrediction = (data) => {
    const {
      Attendance,
      AssignmentScores,
      ExamScores,
      Participation,
      ExtraCurricular,
      StudyHoursPerWeek,
      TeacherRatings,
      SleepHoursPerNight,
      TechnologyUsageHours,
      MotivationalLevel,
    } = data;

    const totalScore = 
      (Attendance * 0.1) +
      (AssignmentScores * 0.15) +
      (ExamScores * 0.2) +
      (Participation * 0.1) +
      (ExtraCurricular * 0.05) +
      (StudyHoursPerWeek * 0.1) +
      (TeacherRatings * 0.1) +
      (SleepHoursPerNight * 0.05) +
      (TechnologyUsageHours * 0.05) +
      (MotivationalLevel * 0.1);

    if (totalScore >= 80) return "Outstanding";
    if (totalScore >= 60) return "Good";
    if (totalScore >= 40) return "Average";
    return "Below Average";
  };

  const generateFeedback = (predictedPerformance) => {
    const feedbackMap = {
      "Outstanding": [
        "Keep up the excellent work!",
        "Maintain consistent attendance.",
        "Continue excelling in assignments and exams."
      ],
      "Good": [
        "Keep up the good work!",
        "Improve participation in extracurricular activities.",
        "Focus more on exam preparation."
      ],
      "Average": [
        "Try to improve attendance and study hours.",
        "Spend more time on assignments and exams.",
        "Consider increasing participation in extracurricular activities."
      ],
      "Below Average": [
        "Improve attendance to stay consistent.",
        "Focus on improving assignment quality.",
        "Spend more time preparing for exams.",
        "Engage more actively in class participation.",
        "Consider participating in extracurricular activities.",
        "Increase weekly study hours for better preparation.",
        "Work on improving behavior and effort based on teacher feedback.",
        "Ensure adequate sleep to improve focus and energy.",
        "Reduce non-educational technology usage.",
        "Boost motivation with goal setting and rewards."
      ]
    };
    return feedbackMap[predictedPerformance] || [];
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.values(formData).some((val) => val === "" || isNaN(val) || val < 0)) {
      alert("Please enter valid data for all fields.");
      return;
    }

    const predictedPerformance = generatePrediction(formData);
    const feedback = generateFeedback(predictedPerformance);

    const resultData = {
      actualPerformance: "Pending",
      predictedPerformance,
      feedback,
    };

    saveToLocalStorage("studentInput", formData);
    saveToLocalStorage("predictionResult", resultData);

    setPredictionResult(resultData);
    setResult(resultData);
  };

  const handleReset = () => {
    setFormData({
      Attendance: "",
      AssignmentScores: "",
      ExamScores: "",
      Participation: "",
      ExtraCurricular: "",
      StudyHoursPerWeek: "",
      TeacherRatings: "",
      SleepHoursPerNight: "",
      TechnologyUsageHours: "",
      MotivationalLevel: "",
    });
    setResult(null);
  };

  // Inline CSS styles
  const formStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '30px',
    maxWidth: '500px',
    width: '100%',
    boxSizing: 'border-box',
    margin: 'auto'
  };

  const labelStyle = {
    display: 'block',
    fontSize: '14px',
    fontWeight: '600',
    color: '#555',
    marginBottom: '8px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    marginBottom: '20px'
  };

  const inputFocusStyle = {
    borderColor: '#4CAF50',
    outline: 'none',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  const feedbackStyle = {
    marginTop: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  };

  // Split keys into two groups (first half and second half)
  const keys = Object.keys(formData);
  const midIndex = Math.ceil(keys.length / 2);
  const leftKeys = keys.slice(0, midIndex);
  const rightKeys = keys.slice(midIndex);

  return (
    <div>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '24px' }}>
          Student Performance Prediction
        </h2>
        <Row>
          <Col md={6}>
            {leftKeys.map((key) => (
              <div key={key} className="form-group">
                <label style={labelStyle}>
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                </label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder={`Enter ${key}`}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
                  onBlur={(e) => e.target.style.borderColor = '#ccc'}
                />
              </div>
            ))}
          </Col>
          <Col md={6}>
            {rightKeys.map((key) => (
              <div key={key} className="form-group">
                <label style={labelStyle}>
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                </label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required
                  min="0"
                  placeholder={`Enter ${key}`}
                  style={inputStyle}
                  onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
                  onBlur={(e) => e.target.style.borderColor = '#ccc'}
                />
              </div>
            ))}
          </Col>
        </Row>
        <button 
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Predict
        </button>
      </form>
      {result && (
        <div style={feedbackStyle}>
          <h3>Prediction: {result.predictedPerformance}</h3>
          <ul>
            {result.feedback.map((item, index) => (
              <li key={index} style={{ fontSize: '16px', color: '#555', lineHeight: '1.5' }}>
                {item}
              </li>
            ))}
          </ul>
          <Button variant="secondary" size="sm" onClick={handleReset}>
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default CheckGrades;
