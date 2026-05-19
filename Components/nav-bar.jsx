import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// LOGIN SECTION - Partha
import { useNavigate } from 'react-router-dom';


const NavBar = () => {
    // LOGIN SECTION - Partha
    const navigate = useNavigate();

    return (
        <Navbar data-bs-theme="dark" style={{alignSelf: 'center'}}>
            <Container fluid>

                <Navbar.Brand href="#home">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {/* Middle Group (Center-Right) */}
                    <Nav className="ms-auto">
                        <Nav.Link href="#my-dashboard">My Dashboard</Nav.Link>
                        <Nav.Link href="#problems">Problems</Nav.Link>
                        <Nav.Link href="#chat">Chats</Nav.Link>
                        <Nav.Link href="#resources">Resources</Nav.Link>
                        <Nav.Link href="calendar">Calendar</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link onClick={() => navigate("/help")}>Help</Nav.Link>
                    </Nav>

                    <Nav className="ms-5 me-9">
                        {/* LOGIN SECTION - Partha */}
                        <Nav.Link onClick={() => navigate('/login')}>Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;