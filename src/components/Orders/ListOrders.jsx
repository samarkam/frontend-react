import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Articles/Pagination';
import { Container } from 'react-bootstrap';

const ListOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalOrders, setTotalOrders] = useState(0);

  // Function to fetch the orders with pagination
  const fetchOrders = async (page, itemsPerPage) => {
    try {
      const response = await axios.get('https://localhost:7260/api/Orders', {
        params: { page, pageSize: itemsPerPage },
        headers: { accept: 'text/plain' },
      });
      console.log(response.data)
      setOrders(response.data.data); // Store orders in state
      setTotalOrders(response.data.totalOrders); // Total number of orders from backend
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  // Load orders when the component mounts or when page or itemsPerPage change
  useEffect(() => {
    fetchOrders(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < totalOrders) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    };

  const handleLastPage = () => {
    const totalPages = Math.ceil(totalOrders / itemsPerPage);
    setCurrentPage(totalPages);
  };

  const totalPages = Math.ceil(totalOrders / itemsPerPage);

  return (
    <Container >
    <div>
      <h1 className="mt-4 mb-4">Orders List</h1>
      <table className="table table-striped m-2" style={{width: '100%'}}>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Phone Number</th>
            <th>Total Price</th>
            <th>Order Date</th>
            <th>Order Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order,index )=> (
            <tr key={index}>
              <td>{order.orderId}</td>
              <td>{order.userDetails.userName}</td>
              <td>{order.userDetails.email}</td>
              <td>{order.userDetails.address}</td>
              <td>{order.userDetails.phoneNumber}</td>
              <td>{order.totalPrice}</td>
              <td>{new Date(order.orderDate).toLocaleString()}</td>
              <td>
                <ul>
                  {order.orderDetails.map(detail => (
                    <li key={detail.orderDetailId}>
                      {detail.article.name} - {detail.quantity} x {detail.article.price.toFixed(2)} TND
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <Pagination handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      handlePageChange={handlePageChange}
      totalPages={totalPages}
      currentPage={currentPage}
      />
      
    </div>
    </Container>
  );
};

export default ListOrders;
