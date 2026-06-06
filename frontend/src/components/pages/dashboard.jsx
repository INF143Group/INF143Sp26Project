import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/GridLayout.css";
import NavBar from "../layout/nav-bar.jsx";
import Footer from "../layout/footer.jsx";
import ProblemDisplay from './ProblemDisplay.jsx';
import IdePanel from "../ide/IDEPanel.jsx";
import ExpandablePanel from "../ide/ExpandablePanel.jsx";
import VideoApp from "../video/VideoApp.tsx";
import { InterviewProvider, useInterview } from "../../context/interviewContext.tsx";
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabase.js';

// Get or create a stable session UUID for this participant.
function getSessionId() {
    let id = sessionStorage.getItem("interview_session_id");
    if (!id) {
        id = crypto.randomUUID();
        sessionStorage.setItem("interview_session_id", id);
    }
    return id;
}

// Chat panel — must live inside InterviewProvider to access roomName/participantName.
function InterviewChat() {
    const { room, roomName, participantName } = useInterview();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const sessionId = useRef(getSessionId());
    const messagesEndRef = useRef(null);
    const loadSeq = useRef(0);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (!room || !roomName) return;

        loadMessages(roomName);

        const channel = supabase
            .channel(`interview-chat-${roomName}`)
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
                if (payload.new.subject === roomName) {
                    loadMessages(roomName);
                }
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [room, roomName]);

    const loadMessages = async (room) => {
        const seq = ++loadSeq.current;
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .eq("subject", room)
            .order("sent_at", { ascending: true });
        if (error) { console.error("chat load error:", error); return; }
        if (seq !== loadSeq.current) return;
        const sorted = (data || []).slice().sort(
            (a, b) => new Date(a.sent_at ?? 0).getTime() - new Date(b.sent_at ?? 0).getTime()
        );
        setMessages(sorted);
    };

    const handleSend = async () => {
        if (!input.trim() || !room) return;
        const text = input;
        setInput("");
        const { error } = await supabase.from("messages").insert([{
            sender_id: sessionId.current,
            recipient_id: "00000000-0000-0000-0000-000000000000",
            subject: roomName,
            body: text,
            status: "sent",
            sent_at: new Date().toISOString(),
        }]);
        if (error) console.error("send error:", error);
    };

    return (
        <div className="card" style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div className="chat-window" style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
                {!room && (
                    <p style={{ color: "#999", fontSize: "13px", textAlign: "center", marginTop: "16px" }}>
                        Join the meeting to start chatting
                    </p>
                )}
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {messages.map((msg, i) => {
                        const isSelf = msg.sender_id === sessionId.current;
                        return (
                            <li key={msg.message_id || i} style={{ marginBottom: "8px", textAlign: isSelf ? "right" : "left" }}>
                                {!isSelf && (
                                    <div style={{ fontSize: "11px", color: "#888", marginBottom: "2px" }}>
                                        Other participant
                                    </div>
                                )}
                                <span style={{
                                    display: "inline-block",
                                    padding: "6px 12px",
                                    borderRadius: "12px",
                                    background: isSelf ? "#6c63ff" : "#f0f0f0",
                                    color: isSelf ? "white" : "black",
                                    fontSize: "13px",
                                    maxWidth: "80%",
                                }}>
                                    {msg.body}
                                </span>
                            </li>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </ul>
            </div>
            <div className="chat-input" style={{ display: "flex", gap: "8px", padding: "8px" }}>
                <input
                    type="text"
                    className="message-input"
                    placeholder={room ? "Type your message here" : "Join meeting to chat..."}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    disabled={!room}
                    style={{ flex: 1 }}
                />
                <button className="send-button" onClick={handleSend} disabled={!room}>Send</button>
            </div>
        </div>
    );
}

function Dashboard() {
    const [problems, setProblems] = useState([]);
    const [selectedProblem, setSelectedProblem] = useState(null);

    useEffect(() => {
        async function fetchProblems() {
            const { data, error } = await supabase
                .from('problems')
                .select('*')
                .eq('status', 'approved');
            if (!error) setProblems(data);
        }
        fetchProblems().catch(console.error);
    }, []);

    return (
        <InterviewProvider>
            <div className="parent">
                <div className="div1" id="nav-bar">
                    <NavBar />
                </div>

                <div className="section-tags div4" id="messages-header">
                    <p>Chat</p>
                </div>

                <div className="div3" id="video-container">
                    <ExpandablePanel label="Interview" showButton={false}>
                        <VideoApp />
                    </ExpandablePanel>
                </div>

                <div className="section-content div5" id="messages-container">
                    <InterviewChat />
                </div>

                <div className="expandable-problem">
                    <ExpandablePanel label="Problem:" overlayClass="overlay-problem">
                        <div style={{ paddingBottom: '8px', borderBottom: '1px solid black' }}>
                            <select
                                style={{
                                    width: '100%',
                                    padding: '8px 10px',
                                    borderRadius: '6px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                    color: 'black',
                                    backgroundColor: '#f0ebe3'
                                }}
                                value={selectedProblem?.problem_id || ''}
                                onChange={(e) => {
                                    const found = problems.find(p => p.problem_id === e.target.value);
                                    setSelectedProblem(found || null);
                                }}
                            >
                                <option value="">Pick a problem to get started</option>
                                {problems.map(p => (
                                    <option key={p.problem_id} value={p.problem_id}>
                                        {`${p.name} [${p.difficulty}]`}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <ProblemDisplay problem={selectedProblem} dropdownMode={true} />
                    </ExpandablePanel>
                </div>

                <div className="expandable-ide">
                    <IdePanel />
                </div>

                <div className="div6" id="bottom-nav-bar">
                    <Footer />
                </div>
            </div>
        </InterviewProvider>
    );
}

export default Dashboard;