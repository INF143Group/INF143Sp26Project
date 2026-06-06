import './styles/App.css';
import NavBar from "./components/layout/nav-bar.jsx";
import Footer from "./components/layout/footer.jsx";
import {useNavigate} from "react-router-dom";

function App() {
    const navigate = useNavigate();

    return (
        <div className="ps-wrap">
            <main className="ps-main" id="main-scroll">
                <div className={"div1"} id={"nav-bar"}>
                    <NavBar/>
                </div>
                <div className="hero">
                    <div className="hero-eyebrow">PivotStack</div>
                    <h1>Practice coding interviews the way they actually happen</h1>
                    <p className="hero-sub">Live video calls, a shared code editor, and a library of curated problems in
                        one place. Practice with a peer, get feedback in real time.</p>
                    <div className="hero-actions">
                        <button className="btn-primary" onClick={() => navigate('/create')}>Create an account</button>
                        <button className="btn-ghost" onClick={() => navigate('/resources')}>Browse resources</button>
                    </div>
                </div>

                <hr className="section-divider"/>

                <div className="section">
                    <div className="stat-row">
                        <div className="stat-card">
                            <div className="stat-num">200+</div>
                            <div className="stat-lbl">Curated problems</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-num">3</div>
                            <div className="stat-lbl">Difficulty levels</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-num">Live</div>
                            <div className="stat-lbl">Video + audio</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-num">Free</div>
                            <div className="stat-lbl">To get started</div>
                        </div>
                    </div>

                    <div className="section-label">How it works</div>
                    <h2>Everything you need in one session</h2>
                    <p className="section-body">Schedule a session, join a room with your partner, pick a problem, and code
                        together. The interviewer can watch your editor live while you talk through your approach on video.</p>

                    <div className="feature-grid">
                        <div className="feature-cell">
                            <div className="feature-icon">🎥</div>
                            <div className="feature-title">Live video rooms</div>
                            <div className="feature-desc">Join a private room with your interview partner. Camera and
                                microphone work directly in the browser, no downloads required.</div>
                        </div>
                        <div className="feature-cell">
                            <div className="feature-title">Shared code editor</div>
                            <div className="feature-desc">Both participants see edits in real time. Supports multiple
                                languages with syntax highlighting and run-in-browser execution.</div>
                        </div>
                        <div className="feature-cell">
                            <div className="feature-title">Curated problem library</div>
                            <div className="feature-desc">Problems organized by difficulty and topic. Each problem loads
                                directly into the session so there's no context switching.</div>
                        </div>
                        <div className="feature-cell">
                            <div className="feature-title">Session scheduling</div>
                            <div className="feature-desc">Book sessions with partners ahead of time. Your calendar shows
                                upcoming interviews and past sessions in one view.</div>
                        </div>
                        <div className="feature-cell">
                            <div className="feature-title">In-session chat</div>
                            <div className="feature-desc">Drop links, paste code snippets, or leave notes for your partner
                                during the call without breaking your flow.</div>
                        </div>
                        <div className="feature-cell">
                            <div className="feature-title">Learning resources</div>
                            <div className="feature-desc">Guides and references curated by people who have been through the
                                process. Linked directly to related problems.</div>
                        </div>
                    </div>
                </div>

                <div className="cta-band">
                    <h2>Ready to start practicing?</h2>
                    <p>Create an account in under a minute. No credit card needed.</p>
                    <button className="btn-primary" onClick={() => navigate('/create')}>Create a free account</button>
                </div>
                <div className="div6" id="bottom-nav-bar">
                    <Footer/>
                </div>
            </main>
        </div>
    );
}

export default App;