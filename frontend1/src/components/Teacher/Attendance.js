import React, { useState } from "react";

const Attendance = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [plotUrl, setPlotUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setPlotUrl("");
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please upload a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://127.0.0.1:5000/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (response.ok) {
        setMessage(result.message);
        setPlotUrl(`http://127.0.0.1:5000/${result.plot_url}`);
      } else {
        setMessage(result.error || "An error occurred.");
      }
    } catch (error) {
      setMessage("An error occurred while uploading the file.");
    }
  };

  const containerStyle = {
    textAlign: "center",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const buttonStyle = {
    backgroundColor: "#2b6cb0",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "10px 20px",
    marginTop: "10px",
    cursor: "pointer",
  };

  const buttonHoverStyle = {
    backgroundColor: "#2c5282",
  };

  const messageStyle = {
    color: "#e53e3e",
  };

  const imgStyle = {
    maxWidth: "100%",
    height: "500px",
    marginTop: "20px",
    border: "2px solid #2b6cb0",
    borderRadius: "4px",
  };

  const bodyStyle = {
    margin: "0",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f4f9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  return (
    <div style={bodyStyle}>
      <div style={containerStyle}>
        <h1 style={{ fontSize: "24px", color: "#2b6cb0" }}>Attendance Visualization</h1>
        <input type="file" accept=".csv" onChange={handleFileChange} />
        <button
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
          onClick={handleUpload}
        >
          Upload and Visualize
        </button>
        {message && <p style={messageStyle}>{message}</p>}
        {plotUrl && (
          <div>
            <h2 style={{ fontSize: "18px", color: "#333" }}>Visualization:</h2>
            <img src={plotUrl} alt="Attendance Visualization" style={imgStyle} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendance;
