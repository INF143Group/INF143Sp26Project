import NavBar from "../layout/nav-bar";
import Footer from "../layout/footer";
import Nav from 'react-bootstrap/Nav';


function About() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', overflowX: 'hidden'}}>
            <div className={"div1"} id={"nav-bar"}>
                <NavBar/>
            </div>
            <div style={{flex: 1, overflowY: 'auto', backgroundColor: '#f0ebe3'}}>
                <div className="container mt-5 mb-5">
                    <h1 className="text-center mb-5">
                        About PivotStack
                    </h1>
                    <p>
                        PivotStack is a platform focused on helping students
                        strengthen coding and interview skills through
                        collaborative learning and practice.
                    </p>
                    <p>
                        Users can engage with coding problems, community
                        discussions, and educational resources designed
                        to improve technical understanding.
                    </p>
                    <p>
                        Our mission is to make technical interview preparation
                        more accessible and supportive for students of all levels.
                    </p>
                    <h2 className="text-center mb-5">
                        Credit to:
                    </h2>
                    <p>
                        <Nav.Link  href="https://github.com/OpenVidu/openvidu-livekit-tutorials/tree/master/application-client/openvidu-react"
                                   title="GitHub Repository"
                                   target="_blank"
                        >OpenVidu Github</Nav.Link>
                    </p>
                </div>
            </div>
            <div className="div6" id="bottom-nav-bar" >
                <Footer/>
            </div>
        </div>
    );
}

export default About;