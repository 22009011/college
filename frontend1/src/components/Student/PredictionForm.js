import React, { useState } from "react";
import { saveToLocalStorage } from "../utils/localStorageUtils"; // Ensure this utility function is correctly defined

const PredictionForm = ({ setPredictionResult }) => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
        switch (predictedPerformance) {
            case "Outstanding":
                return [
                    "Keep up the excellent work!",
                    "Maintain consistent attendance.",
                    "Continue excelling in assignments and exams."
                ];
            case "Good":
                return [
                    "Keep up the good work!",
                    "Improve participation in extracurricular activities.",
                    "Focus more on exam preparation."
                ];
            case "Average":
                return [
                    "Try to improve attendance and study hours.",
                    "Spend more time on assignments and exams.",
                    "Consider increasing participation in extracurricular activities."
                ];
            case "Below Average":
                return [
                    "Improve attendance to stay consistent.",
                    "Spend more time preparing for exams.",
                    "Consider participating in extracurricular activities.",
                    "Work on improving behavior and effort based on teacher feedback.",
                    "Reduce non-educational technology usage."
                ];
            default:
                return [];
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate the input before processing
        if (Object.values(formData).some((val) => val === "" || isNaN(val) || val < 0)) {
            alert("Please enter valid data for all fields.");
            return;
        }

        // Generate prediction based on the input data
        const predictedPerformance = generatePrediction(formData);
        const feedback = generateFeedback(predictedPerformance);

        // Store input and prediction in local storage
        const resultData = {
            actualPerformance: "Pending", // Since there's no actual performance to compare, we use a placeholder
            predictedPerformance,
            feedback,
        };

        saveToLocalStorage("studentInput", formData);
        saveToLocalStorage("predictionResult", resultData);

        // Pass the result to the parent component
        setPredictionResult(resultData);
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

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '24px' }}>
              Student Performance Prediction
            </h2>
            {Object.keys(formData).map((key) => (
                <div key={key} className="form-group" style={{ marginBottom: '20px' }}>
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
            <button 
                type="submit" 
                style={buttonStyle}
                onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
            >
                Predict
            </button>
            {/* Tooltip notification on submit can be added via Toast in a real app */}
        </form>
    );
};

export default PredictionForm;
