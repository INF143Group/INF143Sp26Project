import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";
import bgMain from "./assets/login-m.png";

function Help() {
  const [problem, setProblem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Problem submitted:", problem);
    alert("Your message has been submitted!");
    setProblem("");
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${bgMain})` }}>
      <button className="login-top-btn" onClick={() => navigate("/")}>Back</button>

      <div className="login-card">
        <div className="login-form">
          <textarea
            className="login-input"
            placeholder="Write your problem......"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            style={{ height: "150px", resize: "none", paddingTop: "10px" }}
          />

          <button className="login-submit-btn" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Help;