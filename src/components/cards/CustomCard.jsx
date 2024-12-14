import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useShoppingCart } from 'use-shopping-cart';

const CustomCard = ({ article, articleId, title, text, imgSrc }) => {
  const [message, setMessage] = useState("");
  const { addItem } = useShoppingCart();
  
  const addToCart = (product) => {
    const target = {
      id: product.articleId,
      title: product.name,
      image: product.reference,
      price: product.price,
      quantity: 1
    };
    console.log(target);

    addItem(target);
    setMessage(`${product.name} has been added to your cart!`);
        
    // Clear the message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ width: '18rem', height: '24rem' }} className="card d-flex flex-column justify-content-between align-items-center">
      <img
        src={imgSrc}
        alt={title}
        className="card-img-top"
        style={{ width: '14rem', height: '14rem', objectFit: 'scale-down' }}
      />
      <div className="card-body d-flex flex-column align-items-center p-2">
        <h5
          className="card-title text-center"
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '14rem',
            maxWidth: '14rem',
            margin: 0,
          }}
        >
          {title}
        </h5>
        <p className="card-text">{text}</p>
        <Button
          variant="success"
          className="w-75 mt-2 rounded-pill shadow-lg"
          style={{
            backgroundColor: '#28a745',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            width: '14rem',
            zIndex: 9999999999,
          }}
          onClick={() => addToCart(article)}
        >
          <i className="bi bi-cart-plus" style={{ marginRight: '8px' }}></i> Add to Card
        </Button>
        {message && <div className="mt-3 alert alert-success">{message}</div>}
      </div>
    </div>
  );
};

export default CustomCard;
