import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from './supabase.js';
import "../Styles/Login.css";
import bgImage from "./assets/login-bg.png";
import bgMain from "./assets/login-m.png";

function Create() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

const handleCreate = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Step 1 - Create auth account
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      alert("Error creating account: " + error.message);
      return;
    }

    // Step 2 - Insert into users table
    const { error: userError } = await supabase
      .from('users')
      .insert([{
        user_id: data.user.id,
        username: username,
        email: email,
        display_name: username,
        phone: phone,
        linkedin: linkedin,
        role: 'user',
        is_active: true,
      }]);

    if (userError) {
      alert("Account created but profile error: " + userError.message);
    } else {
      alert("Account created successfully! Please login.");
      navigate("/login");
    }
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${bgMain})` }}>
      <button className="login-top-btn" onClick={() => navigate("/login")}>Back</button>

      <div className="login-card" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="login-form">

          <label className="login-label">Email</label>
          <input type="email" className="login-input" value={email}
            onChange={(e) => setEmail(e.target.value)} />

          <label className="login-label">Username</label>
          <input type="text" className="login-input" value={username}
            onChange={(e) => setUsername(e.target.value)} />

          <label className="login-label">Phone Number</label>
          <input type="tel" className="login-input" value={phone}
            onChange={(e) => setPhone(e.target.value)} />

          <label className="login-label">LinkedIn</label>
          <input type="text" className="login-input" value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)} />

          <label className="login-label">Password</label>
          <input type="password" className="login-input" value={password}
            onChange={(e) => setPassword(e.target.value)} />

          <label className="login-label">Confirm Password</label>
          <input type="password" className="login-input" value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} />

          <button className="login-submit-btn" onClick={handleCreate}>
            Create Account
          </button>

          <p className="login-create-text">
            Already have an account?{" "}
            <span className="login-create-link" onClick={() => navigate("/login")}>
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Create;