import 'bootstrap/dist/css/bootstrap.min.css';
import "../Styles/GridLayout.css";
import NavBar from "./nav-bar.jsx";
import Footer from "./footer.jsx";
import ProblemDisplay from './ProblemDisplay.jsx';
import IdePanel from "./IDEPanel.jsx";
import ExpandablePanel from "./ExpandablePanel.jsx";

function dashboard() {
    return (
        <>
            <div className="parent">
                <div className={"div1"} id={"nav-bar"}>
                    <NavBar/>
                </div>

                <div className="section-tags div2" id="video-top">
                    <p>Interview</p>
                </div>
                <div className="section-tags div4" id="messages-header">
                    <p>Chat</p>
                </div>

                <div className="section-content div3" id="video-container">

                </div>
                <div className="section-content div5" id="messages-container">
                    <div className="card">
                        <div className="chat-window">
                            <ul className="message-list"></ul>
                        </div>
                        <div className="chat-input">
                            <input id="textarea" type="text" className="message-input" placeholder="Type your message here"/>
                            <button className="send-button">Send</button>
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

                <div className="div6" id="bottom-nav-bar" >
                    <Footer/>
                </div>
            </div>
        </>
    );
}
export default dashboard;