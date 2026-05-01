import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavLink = ({ href, children }) => (
    <Nav.Link href={href} className="footer-link">
        {children}
    </Nav.Link>
);

const Footer = () => (
    <Navbar data-bs-theme="dark" className="footer-navbar">
        <Container fluid className="flex-column justify-content-center align-items-center py-1 footer-container">
            <span className="footer-copyright">© 2026 - Company, Inc. All rights reserved. UCI</span>
            <Nav className="justify-content-center footer-nav">
                <NavLink href="#home">Home</NavLink>
                <NavLink href="#resources">Resources</NavLink>
                <NavLink href="#about">About</NavLink>
            </Nav>
        </Container>
    </Navbar>
);

export default Footer;