import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/Login.css";
import NavBar from "../layout/nav-bar";
import Footer from "../layout/footer.jsx";

function Help() {
  const [problem, setProblem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Problem submitted:", problem);
    alert("Your message has been submitted!");
    setProblem("");
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
          <textarea
              placeholder="How can we help?"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              style={{height: "150px", resize: "none", paddingTop: "10px",paddingLeft: "10px" ,color: "white"}}
          />
            <button className="login-submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="div6" id="bottom-nav-bar" >
        <Footer/>
      </div>
    </div>

  );
}

export default Help;