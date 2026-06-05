import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import "../../styles/Login.css";
import NavBar from "../layout/nav-bar";
import Footer from "../layout/footer.jsx";
import { supabase, getCurrentUserInfo } from "../../lib/supabase";

const ROOT = "http://localhost:8080/";  

function Help() {
  const [problem, setProblem] = useState("");

  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setToken(session?.access_token ?? null);
    });
  }, []);

  const navigate = useNavigate();

  async function sendHelpEmail(){
    let user_info = await getCurrentUserInfo();
    if (!user_info || !user_info.email) {
        throw new Error("User email not found");
    }
    console.log("Preparing to send help email to self from " + user_info.email + " with message: " + problem);
    const resp = await fetch(ROOT + "api/mail/send-help-email", {
        method: "POST",
        body: JSON.stringify({fromEmail: user_info.email, message: problem}),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })

    if (!resp.ok) {
        throw new Error("Failed to send email");
    }

    let respJson = await resp.json();
    if (respJson.success===false){
        throw new Error("Failed to send email");
    }
    return respJson;
  }

  const handleSubmit = async () => {
    let resp = await sendHelpEmail();
    if (resp.success === true) {
      alert("Your message has been sent! We will get back to you as soon as possible.");
      setProblem("");
    } else {
      console.error("There was an error sending your message. Please try again later.", resp);
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