import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {supabase} from '../../lib/supabase.js';
import "../../styles/Login.css";
import NavBar from "../layout/nav-bar.jsx";
import Footer from "../layout/footer.jsx";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  const {data, error} = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) {
    alert("Login failed: " + error.message);
  } else {
    // Save user ID to sessionStorage for other components to use
    sessionStorage.setItem('user_id', data.user.id);
    alert("Login successful!");
    navigate("/dashboard");
  }
};

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
};

  return (
    <div style={{display: 'flex', flexDirection: 'column', overflowX: 'hidden',  minHeight: '100vh', background: '#f5f0eb'}}>
      <div className={"div1"} id={"nav-bar"}>
        <NavBar/>
      </div>
      <div className="login-wrapper">

        <button className="login-top-btn" onClick={() => navigate("/")}>Back</button>

        <div className="login-card">
          <div className="login-form">
            <label htmlFor="email-input" className="login-label">Email</label>
            <input
                id="email-input"
                type="email"
                className="login-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=""
            />
            <label htmlFor="password-input" className="login-label">Password</label>
            <input
                id="password-input"
                type="password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                onKeyDown={handleKeyDown}
            />
            <button className="login-submit-btn" onClick={handleLogin}>
              Login
            </button>

            <p className="login-create-text">
              Don't have an account?{" "}
              <span className="login-create-link" onClick={() => navigate("/create")}>Create one</span>
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