import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../../lib/supabase.js';
import "../../styles/Login.css";
import NavBar from "../layout/nav-bar";
import Footer from "../layout/footer";

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
    password_hash: 'managed_by_supabase_auth', // ADD THIS
  }]);

    if (userError) {
      alert("Account created but profile error: " + userError.message);
    } else {
      alert("Account created successfully! Please login.");
      navigate("/login");
    }
  };

  return (
      <div style={{display: 'flex', flexDirection: 'column', overflowX: 'hidden',  minHeight: '100vh', background: '#f5f0eb'}}>

      <div className={"div1"} id={"nav-bar"}>
              <NavBar/>
          </div>
          <div className="login-wrapper" style={{paddingTop:"50px"}}>
              <button className="login-top-btn" onClick={() => navigate("/login")}>Back</button>

              <div className="login-card">
                  <div className="login-form">

                      <label htmlFor="email-input" className="login-label">Email</label>
                      <input id="email-input" type="email" className="login-input" value={email}
                             onChange={(e) => setEmail(e.target.value)} />

                      <label htmlFor="username-input" className="login-label">Username</label>
                      <input id="username-input" type="text" className="login-input" value={username}
                             onChange={(e) => setUsername(e.target.value)} />

                      <label htmlFor="phone-input" className="login-label">Phone Number</label>
                      <input id="phone-input" type="tel" className="login-input" value={phone}
                             onChange={(e) => setPhone(e.target.value)} />

                      <label htmlFor="linkedin-input" className="login-label">LinkedIn</label>
                      <input id="linkedin-input" type="text" className="login-input" value={linkedin}
                             onChange={(e) => setLinkedin(e.target.value)} />

                      <label htmlFor="password-input" className="login-label">Password</label>
                      <input id="password-input" type="password" className="login-input" value={password}
                             onChange={(e) => setPassword(e.target.value)} />

                      <label htmlFor="confirm-password-input" className="login-label">Confirm Password</label>
                      <input id="confirm-password-input" type="password" className="login-input" value={confirmPassword}
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
          <div className="div6" id="bottom-nav-bar" >
              <Footer/>
          </div>
      </div>

  );
}

export default Create;