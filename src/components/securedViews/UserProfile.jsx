import React, { useState, useEffect } from "react";
import { Row, Col, Table } from "react-bootstrap";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        Name: "",
        Email: "",
        PhoneNumber: "",
        Address: "",
    });
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUserData = async () => {
          try {
              const email = Cookies.get("user_email");
              if (!email) {
                  navigate("/register");
                  return;
              }
  
              const response = await axios.post(
                  "https://localhost:7260/api/Users/getByEmail",
                  { email }
              );
  
              const userData = response.data.user;
              console.log(response.data)
              setUser(userData);
              setFormData({
                  Name: userData.userName || "",
                  Email: userData.email || "",
                  PhoneNumber: response.data.phoneNumber || "",
                  Address: response.data.address || "",
              });
  
              return userData; 
          } catch (err) {
              console.error("Error fetching user data:", err);
          }
      };
  
      const fetchOrders = async (userId) => {
          try {
              const response = await axios.get(
                  `http://127.0.0.1:8000/api/orders/user/${userId}`
              );
              setOrders(response.data.orders || []);
              console.log("Orders fetched");
          } catch (err) {
              console.error("Error fetching order data:", err);
          } finally {
              setOrdersLoading(false);
          }
      };
  
      const initializeData = async () => {
          setLoading(true);
          setOrdersLoading(true);
          const userData = await fetchUserData(); 
          if (userData && userData.UserId) {
              await fetchOrders(userData.UserId); 
          }
          setLoading(false);
          setOrdersLoading(false);

      };
  
      initializeData();
  }, [navigate]);
  
  const openOrderById = (orderId) => {
    navigate(`/confirmOrder/${orderId}`);
  };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log(user)
        console.log("Payload sent:", formData);

        try {
            await axios.put(`https://localhost:7260/api/UserProfile/${user.userId}`, formData);
            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Error updating user data:", err);
        }
    };

    if (loading || ordersLoading) {
        return <p>Loading...</p>;
    }

    return (
        <>
            <div className="userProfile-wrapper">
                <div className="confirm-order-container">
                    <h2>User Profile</h2>
                    <form onSubmit={handleSubmit} className="user-profile-form">
                        <Row className="mb-3">
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="Name">Name:</label>
                                    <input
                                        type="text"
                                        id="Name"
                                        name="Name"
                                        value={formData.Name}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="Email">Email:</label>
                                    <input
                                        type="Email"
                                        id="Email"
                                        name="Email"
                                        value={formData.Email}
                                        readOnly
                                        className="form-control"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="PhoneNumber">Phone Number:</label>
                                    <input
                                        type="text"
                                        id="PhoneNumber"
                                        name="PhoneNumber"
                                        value={formData.PhoneNumber}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                            </Col>
                            <Col md={6}>
                                <div className="form-group">
                                    <label htmlFor="Address">Address:</label>
                                    <input
                                        type="text"
                                        id="Address"
                                        name="Address"
                                        value={formData.Address}
                                        onChange={handleInputChange}
                                        className="form-control"
                                    />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="text-center">
                                <button type="submit" className="btn btn-primary">
                                    Update Profile
                                </button>
                            </Col>
                        </Row>
                    </form>
                </div>
            </div>
            <div className="userProfile-wrapper mt-1">
                <div className="confirm-order-container">
                    <h2>Order History</h2>
                        {orders.length > 0 ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Order ID</th>
                                        <th>Date</th>
                                        <th>Total Amount</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={order.id} style={{ padding:'10px'}}>
                                            <td>{index + 1}</td> {/* Sequential number starting at 1 */}
                                            <td><button onClick={() => openOrderById(order.id)} style={{ backgroundColor: '#0B5ED7',color : 'white', borderRadius:'5px'  }}>Check Order</button></td>
                                            <td>{new Date(order.order_date).toLocaleString()}</td>
                                            <td>{parseFloat(order.total_amount).toFixed(2)} TND</td>
                                            <td style={{textAlign: 'justify'}}>
                                                {order.order_details.map((detail, idx) => (
                                                    <div key={idx}>
                                                        - {detail.article.name} x {detail.quantity} 
                                                        (Unit Price: {parseFloat(detail.price).toFixed(2)} TND)
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <p>No orders found.</p>
                        )}

                </div>
            </div>
        </>
    );
};

export default UserProfile;
