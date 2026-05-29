import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from './supabase.js';
import "../Styles/Login.css";
import NavBar from "./nav-bar.jsx";
import Footer from "./footer.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    // Save user ID to sessionStorage for other components to use
    sessionStorage.setItem('user_id', data.user.id);
    alert("Login successful!");
    navigate("/");
  }
};

  return (
    <div style={{display: 'flex', flexDirection: 'column', overflowX: 'hidden'}}>
      <div className={"div1"} id={"nav-bar"}>
        <NavBar/>
      </div>
      <div className="login-wrapper">
        <button className="login-top-btn" onClick={() => navigate("/")}>Back</button>

        <div className="login-card" style={{ backgroundColor: 'black' }}>
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
      <div className="div6" id="bottom-nav-bar" >
        <Footer/>
      </div>
    </div>

  );
}

export default Login;