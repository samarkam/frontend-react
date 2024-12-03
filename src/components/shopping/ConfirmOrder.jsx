import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";

const ConfirmOrder = () => {
    const { orderId } = useParams(); // Get orderId from URL
    const [user, setUser] = useState(null);
    const [order, setOrder] = useState(null); // State for storing order details
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const email = Cookies.get("user_email");

        if (!email) {
            navigate("/register");
        } else {
            const fetchUserData = async () => {
                try {
                    const response = await axios.post("http://127.0.0.1:8000/api/user-details", { email });
                    setUser(response.data.user);
                } catch (err) {
                    console.error("Error fetching user data:", err);
                } finally {
                    setLoading(false);
                }
            };

            fetchUserData();
        }

        const fetchOrderData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/orders/${orderId}`);
                setOrder(response.data); // Store order details in the state
            } catch (err) {
                console.error("Error fetching order data:", err);
            }
        };

        // Fetch order data based on orderId
        if (orderId) {
            fetchOrderData();
        }

    }, [orderId, navigate]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="confirm-order-wrapper">
            <div className="confirm-order-container">
                <h2>Order Confirmation </h2>

                {/* User Details Section */}
                <div className="user-details">
                    <h3>User Details</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : user ? (
                        <>
                            <Row>
                                <Col xl={6}>
                                    <p>
                                        <strong>Name:</strong> {user.name}
                                    </p>
                                </Col>
                                <Col xl={6}>
                                    <p>
                                        <strong>Email:</strong> {user.email}
                                    </p>
                                </Col>
                            </Row>
                            <Row>
                                <Col xl={6}>
                                    <p>
                                        <strong>Phone Number:</strong> {user.profile?.phone_number}
                                    </p>
                                </Col>
                                <Col xl={6}>
                                    <p>
                                        <strong>Address:</strong> {user.profile?.address}
                                    </p>
                                </Col>
                            </Row>
                        </>
                    ) : (
                        <p>No user data available.</p>
                    )}
                </div>

                {/* Order Summary */}
                {order ? (
                    <>
                        <div className="order-summary">
                            <h3>Order Summary</h3> <span>order date : {order.order_date}</span>
                            <table className="order-table">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.order_details.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.article.name}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.price} TND</td>
                                            <td>{item.quantity * item.price} TND</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="order-total">
                            <h4>Total Price: {order.total_amount} TND</h4>
                        </div>

                        {/* Print Button */}
                        <div className="order-actions">
                            <button
                                className="btn btn-primary"
                                onClick={handlePrint}
                                style={{
                                    backgroundColor: "#28a745",
                                    color: "white",
                                    border: "1px solid #0056b3",
                                    padding: "7px 20px",
                                    fontSize: "16px",
                                    borderRadius: "5px",
                                    cursor: "pointer",
                                    marginTop: "20px",
                                }}
                            >
                                Print Order
                            </button>
                        </div>
                    </>
                ) : (
                    <p>Loading order details...</p>
                )}
            </div>
        </div>
    );
};

export default ConfirmOrder;
