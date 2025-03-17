# College Management System with Student Prediction

## Overview
The College Management System is a web application built using the MERN stack that provides role-based access for parents, students, mentors, and admins. It includes advanced features such as course enrollment, timetable management, and student performance prediction.

## Features
### Admin
- Manage users (students, parents, mentors)
- Assign roles and permissions
- View overall analytics and reports
- Manage courses and schedules

### Student
- Enroll in courses
- View timetable
- Track performance and predictions
- Access study materials

### Mentor
- Monitor student progress
- Provide feedback and recommendations
- Manage assigned courses

### Parent
- View student progress
- Receive notifications and updates
- Track attendance and grades

### Student Performance Prediction
- Uses machine learning models to analyze past performance
- Predicts future academic outcomes
- Provides insights for improvement

## Tech Stack
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT-based authentication
- **Machine Learning:** Python (Flask API for prediction model)

## Installation
### Prerequisites
- Node.js & npm
- MongoDB
- Python (for ML model)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/college-management.git
   cd college-management
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the backend server:
   ```sh
   cd backend
   npm start
   ```

4. Start the frontend:
   ```sh
   cd frontend
   npm start
   ```

5. Run the ML model (if applicable):
   ```sh
   cd ml-model
   python app.py
   ```

## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License.
