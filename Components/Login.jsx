import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS
import "../Styles/Login.css";
import bgImage from "./assets/login-bg.png";
import bgMain from "./assets/login-m.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ADD THIS

  const handleLogin = () => {
    console.log("Email:", email, "Password:", password);
  };

  return (
    // LOGIN SECTION - Partha
    <div className="login-wrapper" style={{ backgroundImage: `url(${bgMain})` }}>
      {/* Changed Login button to Back button */}
      <button className="login-top-btn" onClick={() => navigate("/")}>Back</button>

      <div className="login-card" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="login-form">
          <label className="login-label">Email</label>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
          />

          <label className="login-label">Password</label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
          />

          <button className="login-submit-btn" onClick={handleLogin}>
            Login
          </button>

        <button className="login-submit-btn" onClick={handleLogin}>
            Login
          </button>

          {/* Create account link */}
          <p className="login-create-text">
            Don't have an account?{" "}
            <span className="login-create-link" onClick={() => navigate("/create")}>
              Create one
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;