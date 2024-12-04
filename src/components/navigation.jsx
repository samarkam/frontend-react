import React, { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie'; // Install with npm install js-cookie
import { FaUser } from 'react-icons/fa'; // Install with npm install react-icons
import { useShoppingCart} from 'use-shopping-cart';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";


function Navigation() {
  const [jwtToken, setJwtToken] = useState(null);
  const { cartCount } = useShoppingCart();
  const navigate = useNavigate();

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
            style={{ maxHeight: '100px' ,    alignItems :  'center !important'}}
            navbarScroll
          >
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/cart"> 
            <FaShoppingCart style={{ fontSize: '20px', color: 'red' }} />

              <span className="badge badge-secondary" style={{ fontSize: '20  px', color: 'red' }} > {cartCount}</span>
            </Nav.Link>
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
                  Cookies.remove('user_email');
                  window.location.href = "/homePage";
                }}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="login">Login</Nav.Link> 
                <Nav.Link as={Link} to="/register"> SignIn</Nav.Link>
              </>


            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
