import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import homeLogo from './assets/phoenix.png';
import profileIcon from './assets/profile12.png';
import userIcon from './assets/user12.png';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavBar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!sessionStorage.getItem("user_id");

    const handleLogout = () => {
        sessionStorage.removeItem("user_id");
        navigate("/");
        window.location.reload();
    };

    return (
        <Navbar data-bs-theme="dark" sticky="top" style={{alignSelf: 'center', zIndex: 99}}>
            <Container fluid>
                <Navbar.Brand onClick={() => navigate("/home")} style={{ cursor: 'pointer' }}>
                    <img src={homeLogo} alt = "home" style = {{width: '42px', height: '38px'}} />
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/problems">Problems</Nav.Link>
                        <Nav.Link href="/chat">Chats</Nav.Link>
                        <Nav.Link href="/resources">Resources</Nav.Link>
                        <Nav.Link href="/calendar">Calendar</Nav.Link>
                        <Nav.Link onClick={() => navigate("/about")}>About</Nav.Link>
                        <Nav.Link onClick={() => navigate("/help")}>Help</Nav.Link>
                        {isLoggedIn && (
                            <Nav.Link href="/my-dashboard">My Dashboard</Nav.Link>
                        )}
                    </Nav>

                    <Nav className="ms-3">
                       {isLoggedIn ? (
                                <NavDropdown 
                                    title={<img src={userIcon} alt="user" style={{ width: '25px', height: '25px' }}/>}
                                    id="user-dropdown"
                                    align="end"
                                >
                                    <NavDropdown.Item onClick={() => navigate('/my-dashboard')}>My Dashboard</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <Nav.Link onClick={() => navigate('/login')} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                    <img src={profileIcon} alt="profile" style={{ width: '25px', height: '25px' }}/>
                                </Nav.Link>
                            )}
                              </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;