import React, { useState } from "react";
import "../Styles/Login.css";
import bgImage from "./assets/login-bg.png"; // <-- swap this path to wherever you save your image
import bgMain from "./assets/login-m.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Email:", email, "Password:", password);
    // Add your login logic / API call here
  };

  return (
// LOGIN SECTION - Partha
<div className="login-wrapper" style={{ backgroundImage: `url(${bgMain})` }}>
          <button className="login-top-btn">Login</button>

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
        </div>
      </div>
    </div>
  );
}

export default Login;