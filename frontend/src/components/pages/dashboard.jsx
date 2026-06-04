 
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/GridLayout.css";
import NavBar from "../layout/nav-bar.jsx";
import Footer from "../layout/footer.jsx";
import ProblemDisplay from './ProblemDisplay.jsx';
<<<<<<< HEAD:Components/dashboard.jsx
import IdePanel from "./IDEPanel.jsx";
import ExpandablePanel from "./ExpandablePanel.jsx";
import App from "../openvidu-livekit-tutorials/application-client/openvidu-react/src/App.tsx";
import { InterviewProvider } from "../openvidu-livekit-tutorials/application-client/openvidu-react/src/interviewContext.tsx";
import { useState, useEffect, useRef } from 'react';
=======
import IdePanel from "../ide/IDEPanel.jsx";
import ExpandablePanel from "../ide/ExpandablePanel.jsx";
import VideoApp from "../video/VideoApp.tsx";
import {InterviewProvider} from "../../context/interviewContext.tsx";
>>>>>>> d8fc2d739bc21a2ca949e15b4fcedd59e0a57665:frontend/src/components/pages/dashboard.jsx

function dashboard() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages(prev => [...prev, { text: input, self: true }]);
        setInput("");
    };

    const messagesEndRef = useRef(null);

useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

    return (
        <>
            <div className="parent">
                <div className={"div1"} id={"nav-bar"}>
                    <NavBar/>
                </div>

                <div className="section-tags div4" id="messages-header">
                    <p>Chat</p>
                </div>

                <div className="div3" id="video-container">
                    <InterviewProvider>
                        <ExpandablePanel label="Interview" showButton={false}>
                            <VideoApp/>
                        </ExpandablePanel>
                    </InterviewProvider>
                </div>

               <div className="section-content div5" id="messages-container">
  <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
    <div className="chat-window" style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {messages.map((msg, i) => (
                    <li key={i} style={{
                        marginBottom: "8px",
                        textAlign: msg.self ? "right" : "left"
                    }}>
                        <span style={{
                            display: "inline-block",
                            padding: "6px 12px",
                            borderRadius: "12px",
                            background: msg.self ? "#6c63ff" : "#f0f0f0",
                            color: msg.self ? "white" : "black",
                            fontSize: "13px",
                            maxWidth: "80%"
                        }}>
                            {msg.text}
                        </span>
                    </li>
                ))}
                <div ref={messagesEndRef} />
            </ul>
        </div>
        <div className="chat-input" style={{ display: "flex", gap: "8px", padding: "8px" }}>
            <input
                type="text"
                className="message-input"
                placeholder="Type your message here"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                style={{ flex: 1 }}
            />
            <button className="send-button" onClick={handleSend}>Send</button>
        </div>
    </div>
</div>

                <div className="expandable-problem">
                    <ExpandablePanel label="Problem:" overlayClass="overlay-problem">
                        <ProblemDisplay />
                    </ExpandablePanel>
                </div>

                <div className="expandable-ide">
                    <IdePanel />
                </div>

                <div className="div6" id="bottom-nav-bar">
                    <Footer/>
                </div>
            </div>
        </>
    );
}

export default dashboard;