import React, { useState, useEffect } from 'react';
import { NavDropdown } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; // Install with npm install js-cookie
import { FaUser, FaShoppingCart } from 'react-icons/fa'; // Install with npm install react-icons
import { useShoppingCart } from 'use-shopping-cart';

function Navigation() {
  const [jwtToken, setJwtToken] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Ensure this state is correctly set
  const { cartCount } = useShoppingCart();
  const navigate = useNavigate();

  useEffect(() => {

    const token = Cookies.get('jwt_token');
    setJwtToken(token);

    if (token) {
      const userEmail = Cookies.get("user_email");

      // Check if the user is an admin
      fetch("https://localhost:7260/api/Auth/check-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.isAdmin) {
            setIsAdmin(true);
            setIsLoggedIn(true); // Set isLoggedIn to true when admin
          } else {
            setIsAdmin(false);
            setIsLoggedIn(true); // Set isLoggedIn even if not an admin
          }
        })
        .catch((error) => {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
          setIsLoggedIn(false); // Set isLoggedIn to false on error
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
      {isAdmin ? (
        <Navbar.Brand as={Link} to="/articlescard" style={{fontSize: '23px'}}>Menus</Navbar.Brand>

        ) : (
        <Navbar.Brand as={Link} to="/homePage" style={{fontSize: '23px'}}>Menus</Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', alignItems: 'center !important' }}
            navbarScroll
          >

            {isAdmin ? (
              <>
                <Nav.Link as={Link} to="/articles" style={{fontSize: '23px' ,color:'black'}}>Liste des articles</Nav.Link>
                <Nav.Link as={Link} to="/menus" style={{fontSize: '23px' ,color:'black'}}>Categories</Nav.Link>
                <Nav.Link as={Link} to="/orders" style={{fontSize: '23px' ,color:'black'}}>Orders</Nav.Link>
              </>
            ) : (
              <>
              <Nav.Link as={Link} to="/about"  style={{fontSize: '23px' ,color:'black'}}>About</Nav.Link>
              <Nav.Link as={Link} to="/contact" style={{fontSize: '23px' ,color:'black'}}>Contact</Nav.Link>
              <Nav.Link as={Link} to="/cart">
                <FaShoppingCart style={{ fontSize: '20px', color: 'black' }} />
                <span className="badge badge-secondary" style={{ fontSize: '20px', color: 'black' }}>
                  {cartCount}
                </span>
              </Nav.Link>
              </>
            )}
          </Nav>

          <Nav className="ms-auto">
          {isLoggedIn ? (
      <NavDropdown title={<FaUser />} id="userDropdown" align="end">
        {!isAdmin && (
          <>
          <NavDropdown.Item as={Link} to="/user">Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          </>
        )}
       
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
        <Nav.Link as={Link} to="/login">Login</Nav.Link>
        <Nav.Link as={Link} to="/register">Sign In</Nav.Link>
      </>
    )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
