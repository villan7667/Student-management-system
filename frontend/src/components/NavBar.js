import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Navbar expanded={expanded} expand="lg" className="modern-nav fixed-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="animated-brand">
          Academy Portal
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(expanded ? false : "expanded")} 
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="nav-link-modern" onClick={() => setExpanded(false)}>Home</Nav.Link>
            <Nav.Link as={Link} to="/add" className="nav-link-modern" onClick={() => setExpanded(false)}>Add Student</Nav.Link>
            <Nav.Link as={Link} to="/view" className="nav-link-modern" onClick={() => setExpanded(false)}>View Students</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
