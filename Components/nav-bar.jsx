import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
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
                        <Nav.Link href="#about">About</Nav.Link>
                    </Nav>

                    <Nav className="ms-5 me-9">
                        <Nav.Link href="#login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;