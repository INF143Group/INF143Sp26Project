import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabase.js";
import "./chat.css";
import sendIcon from './assets/send.png';
import addIcon from "./assets/add.png";
import NavBar from "./nav-bar.jsx";
import Footer from "./footer.jsx";

const mockUsers = [
  { id: 1, name: "Elena Vance", role: "Product Designer", status: "online", initials: "EV", color: "#5b8ef0" },
  { id: 2, name: "Marcus Thorne", role: "Backend Engineer", status: "away", initials: "MT", color: "#e07b4f" },
  { id: 3, name: "Sarah Chen", role: "Frontend Dev", status: "online", initials: "SC", color: "#5bc48e" },
  { id: 4, name: "Design Team", role: "Group", status: "offline", initials: "DT", color: "#a87fe8" },
];

const mockMessages: Record<number, { from: string; text: string; time: string; self: boolean }[]> = {
  1: [
    { from: "Elena Vance", text: "Hey! Just finished the wireframes.", time: "11:42 AM", self: false },
    { from: "You", text: "Looks great! Can you share the Figma link?", time: "11:45 AM", self: true },
    { from: "Elena Vance", text: "Sure! Here's the preview of the main layout section.", time: "11:48 AM", self: false },
  ],
  2: [{ from: "Marcus Thorne", text: "The meeting is pushed to 4 PM today.", time: "10:20 AM", self: false }],
  3: [{ from: "Sarah Chen", text: "Did you see the latest update from the repo?", time: "9:15 AM", self: false }],
  4: [{ from: "Alex", text: "Check out the new bento layout!", time: "8:00 AM", self: false }],
};

function Chat() {
  const [selectedMock, setSelectedMock] = useState(mockUsers[0]);
  const [messages, setMessages] = useState(mockMessages);
  const [input, setInput] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [realUser, setRealUser] = useState<any>(null);
  const [realMessages, setRealMessages] = useState<any[]>([]);
  const navigate = useNavigate();
  const currentUserId = sessionStorage.getItem("user_id");

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) { setSearchResults([]); return; }
    const { data } = await supabase.from("users")
      .select("user_id, username, display_name")
      .ilike("username", `%${query}%`)
      .limit(8);
    setSearchResults(data || []);
  };

  const handleSelectRealUser = async (user: any) => {
    setRealUser(user);
    setSelectedMock(null as any);
    setShowSearch(false);
    setSearchQuery("");
    setSearchResults([]);
    const { data } = await supabase.from("messages").select("*")
      .or(`and(sender_id.eq.${currentUserId},recipient_id.eq.${user.user_id}),and(sender_id.eq.${user.user_id},recipient_id.eq.${currentUserId})`)
      .order("message_id", { ascending: true });
    setRealMessages(data || []);
  };

  const handleSendReal = async () => {
    if (!input.trim() || !realUser) return;
    await supabase.from("messages").insert([{
      sender_id: currentUserId,
      recipient_id: realUser.user_id,
      subject: "chat",
      body: input,
      status: "sent",
    }]);
    setInput("");
    handleSelectRealUser(realUser);
  };

  const handleSendMock = () => {
    if (!input.trim()) return;
    const newMsg = { from: "You", text: input, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), self: true };
    setMessages((prev) => ({ ...prev, [selectedMock.id]: [...(prev[selectedMock.id] || []), newMsg] }));
    setInput("");
  };

  return (
    <>
      <div className = {"div1"} id = {"nav-bar"}>
        <NavBar/>
      </div>
      <div className="chat-wrapper">
        <div className="chat-sidebar">
          <div className="chat-sidebar-header">
            <span className="chat-title">Messages</span>
          </div>

          <input className="chat-search" type="text" placeholder="Search conversations..." />

          <div className="chat-user-list">
            {realUser && (
              <div className="chat-user-item active" onClick={() => setSelectedMock(null as any)}>
                <div className="chat-avatar" style={{ background: "#6c63ff" }}>
                  {realUser.username.slice(0, 2).toUpperCase()}
                </div>
                <div className="chat-user-info">
                  <span className="chat-user-name">{realUser.display_name || realUser.username}</span>
                  <span className="chat-user-preview">@{realUser.username}</span>
                </div>
              </div>
            )}

            {mockUsers.map((user) => (
              <div key={user.id} className={`chat-user-item ${selectedMock?.id === user.id ? "active" : ""}`}
                onClick={() => { setSelectedMock(user); setRealUser(null); }}>
                <div className="chat-avatar" style={{ background: user.color }}>{user.initials}</div>
                <div className="chat-user-info">
                  <span className="chat-user-name">{user.name}</span>
                  <span className="chat-user-preview">{messages[user.id]?.slice(-1)[0]?.text.slice(0, 30)}...</span>
                </div>
                <div className={`chat-status-dot ${user.status}`}></div>
              </div>
            ))}
          </div>

          <div style={{ padding: "12px 16px", position: "relative", zIndex: 100 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <button className="chat-icon-btn" onClick={() => setShowSearch(!showSearch)} style={{ padding: 0 }}>
                <img src={addIcon} alt="add" style={{ width: "28px", height: "28px" }} />
              </button>
              {showSearch && (
                <input
                  className="chat-search"
                  type="text"
                  placeholder="Search the person..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  autoFocus
                  style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(4px)", margin: 0, flex: 1 }}
                />
              )}
            </div>
            {searchResults.length > 0 && (
              <div className="chat-search-results">
                {searchResults.map((user) => (
                  <div key={user.user_id} className="chat-search-item" onClick={() => handleSelectRealUser(user)}>
                    <div className="chat-avatar small" style={{ background: "#6c63ff" }}>
                      {user.username.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <span className="chat-user-name">{user.display_name || user.username}</span>
                      <br />
                      <span className="chat-user-preview">@{user.username}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="chat-main">
          <div className="chat-main-header">
            <div className="chat-avatar" style={{ background: realUser ? "#6c63ff" : selectedMock?.color }}>
              {realUser ? realUser.username.slice(0, 2).toUpperCase() : selectedMock?.initials}
            </div>
            <div>
              <p className="chat-main-name">{realUser ? (realUser.display_name || realUser.username) : selectedMock?.name}</p>
              <p className="chat-main-role">{realUser ? `@${realUser.username}` : selectedMock?.role}</p>
            </div>
          </div>

          <div className="chat-messages">
            {realUser ? (
              realMessages.map((msg, i) => (
                <div key={i} className={`chat-message ${msg.sender_id === currentUserId ? "self" : "other"}`}>
                  {msg.sender_id !== currentUserId && (
                    <div className="chat-avatar small" style={{ background: "#6c63ff" }}>
                      {realUser.username.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <div className="chat-bubble"><p>{msg.body}</p></div>
                </div>
              ))
            ) : (
              (messages[selectedMock?.id] || []).map((msg, i) => (
                <div key={i} className={`chat-message ${msg.self ? "self" : "other"}`}>
                  {!msg.self && (
                    <div className="chat-avatar small" style={{ background: selectedMock?.color }}>
                      {selectedMock?.initials}
                    </div>
                  )}
                  <div className="chat-bubble">
                    <p>{msg.text}</p>
                    <span className="chat-time">{msg.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="chat-input-area">
            <input
              className="chat-input-main"
              type="text"
              placeholder={`Message ${realUser ? realUser.username : selectedMock?.name}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (realUser ? handleSendReal() : handleSendMock())}
            />
            <button className="chat-send-btn" onClick={realUser ? handleSendReal : handleSendMock}>
              <img src={sendIcon} alt="send" style={{ width: "20px", height: "20px" }} />
            </button>
          </div>
        </div>
      </div>
      <div className="div6" id="bottom-nav-bar" >
        <Footer/>
      </div>
    </>
  );
}

export default Chat;