import React, { useState, useEffect } from 'react';
import { useShoppingCart } from 'use-shopping-cart';
import { Link, useNavigate } from 'react-router-dom';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
import axios from 'axios';
import MainPromoCard from '../cards/mainPromoCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
const Cart = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [userProfile, setUserProfile] = useState({ phoneNumber: '', address: '' });
  const [error, setError] = useState('');
  const [user, setUser] = useState(null); // Use useState to store the user
  const { cartDetails, removeItem, clearCart, totalPrice, cartCount, incrementItem, decrementItem } = useShoppingCart();

  const handleCheckout = () => {
    const token = Cookies.get("jwt_token");
    const email = Cookies.get("user_email");

    if (token) {
         axios.post("https://localhost:7260/api/Users/getByEmail", { email })
        .then(response => {
          console.log(response.data)
          const userData = response.data.user; // Get user data from the response
          setUser(userData); // Update the user state
          
          setUserProfile({
            phoneNumber: response.data.phoneNumber            || '',
            address: response.data.address || ''
          });
          setShowModal(true);
        })
        .catch(err => {
          setError("Failed to fetch user data.");
        });
    } else {
      navigate("/register");
    }
  };

  const handleContinueShopping = () => {
    navigate("/homePage");
  };

  const handleModalClose = () => setShowModal(false);

  const handleProfileUpdate = () => {
    console.log(userProfile)
    try {
         axios.put(`https://localhost:7260/api/UserProfile/${user.userId}`, {
          
            'Name' : user.userName,
            'Email' : user.email,
            'Address' : userProfile.address,
            'PhoneNumber':userProfile.phoneNumber

        });
        alert("Profile updated successfully!");
    } catch (err) {
        console.error("Error updating user data:", err);
    }


    if (user) {
      const orderData = {
        user_id: user.id,
        total_amount: totalPrice,
        order_details: Object.values(cartDetails).map(cartItem => {
          console.log('Sending article_id:', cartItem.id); // Debug log
          return {
            article_id: cartItem.id,  // Ensure this is the correct ID from the cart item
            quantity: cartItem.quantity,
            price: cartItem.price,
          };
        })
      };
    
      axios.post("http://127.0.0.1:8000/api/orders", orderData)
        .then(response => {
          clearCart();
          const orderId = response.data.order.id;
          console.log(response.data.order.id)
          navigate(`/confirmOrder/${orderId}`);
        })
        .catch(err => {
          console.error(err); // Add error logging
          setError("Failed to create order.");
        });
    }
  };
  
  

  return (
    <div className="cart-container">
      <MainPromoCard />

      <h2>Shopping Cart</h2>
      {cartCount === 0 ? (
        <div className="cart-empty">
          <p>Panier Vide</p>
          <div className="start-shopping">
            <Link to="/homePage">
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cartDetails && Object.values(cartDetails).map((cartItem) => {
              return (
                <div className="cart-item" key={cartItem.id}>
                  <div className="cart-product">
                    <img src={`${cartItem.image}`} alt={cartItem.title} />
                    <div>
                      <h3>{cartItem.title}</h3>
                      <button onClick={() => removeItem(cartItem.id)}>
                      <FontAwesomeIcon icon={faTrash} /> 
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">{cartItem.price} TND</div>
                  <div className="cart-product-quantity">
                    <button className="button-actions" onClick={() => decrementItem(cartItem.id)}>-</button>
                    <div className="count">{cartItem.quantity}</div>
                    <button className="button-actions" onClick={() => incrementItem(cartItem.id)}>+</button>
                  </div>
                  <div className="cart-product-total-price">
                    {cartItem.quantity * cartItem.price} TND
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart-summary">
            <button className="clear-btn" onClick={() => clearCart()}>Clear Cart</button>
            <div className="cart-checkout">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">{totalPrice} TND</span>
              </div>
              <Row className="button-group mt-3">
                <Col xl={6}>
                  <button className="btn btn-primary" onClick={handleCheckout}
                    style={{
                      backgroundColor: "#28a745",
                      color: "white",
                      border: "1px solid #0056b3",
                      padding: "7px 20px",
                      fontSize: "16px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}>
                    Order now
                  </button>
                </Col>
                <Col xl={6}>
                  <button className="btn btn-secondary" onClick={handleContinueShopping}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "1px solid #1e7e34",
                      padding: "7px 20px",
                      fontSize: "16px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}>
                    Continue Shopping
                  </button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                value={userProfile.phoneNumber}
                onChange={(e) => setUserProfile({ ...userProfile, phoneNumber: e.target.value })}
                className="form-control"
                placeholder="Enter phone number"
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input
                type="text"
                value={userProfile.address}
                onChange={(e) => setUserProfile({ ...userProfile, address: e.target.value })}
                className="form-control"
                placeholder="Enter address"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>Fermer</Button>
          <Button variant="primary" onClick={handleProfileUpdate}>Confirmer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Cart;
