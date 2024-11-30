import React, { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Install with npm install js-cookie
import { FaUser } from 'react-icons/fa'; // Install with npm install react-icons

function Navigation() {
  const [jwtToken, setJwtToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get('jwt_token');
    setJwtToken(token);
  }, []);

  const isLoggedIn = !!jwtToken;

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/homePage">Menus</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>
          {/* <div className="mx-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </div> */}
          <Nav className="ms-auto">
            {isLoggedIn ? (
              <NavDropdown title={<FaUser />} id="userDropdown" align="end">
                <NavDropdown.Item as={Link} to="/user">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => {
                  Cookies.remove('jwt_token');
                  window.location.reload();
                }}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav.Link as={Link} to="/">Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
