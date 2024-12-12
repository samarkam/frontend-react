import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { useShoppingCart} from 'use-shopping-cart';

const CustomCard = ({article, articleId, title, text, imgSrc }) => {
  const [message, setMessage] = useState("");
  const { addItem } = useShoppingCart();
  const addToCart = (product) => {
    const target = {
    id : product.id,
    title : product.name,
    image : product.reference,
    price : product.prix,
    quantity : 1
    };
    addItem(target);
    setMessage(`${product.name} has been added to your cart!`);
        
    // Clear the message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
    };

  return (
    <Card style={{ width: '18rem', height: '24rem' }} className="d-flex flex-column justify-content-between align-items-center">
      <Card.Img
        variant="top"
        src={imgSrc}
        alt={title}
        style={{ width: '14rem', height: '14rem', objectFit: 'scale-down', }}
      />
      <Card.Body className="d-flex flex-column align-items-center p-2">
        <Card.Title
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'center',
            width: '14rem',
            maxWidth: '14rem',
            margin: 0,
          }}
        >
          {title}
        </Card.Title>
        <Card.Text>{text}</Card.Text>
        <Button
          variant="success"
          className="w-75 mt-2 rounded-pill shadow-lg"
          style={{
            backgroundColor: '#28a745',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
             width: '14rem'
          }}
          onClick={() => addToCart(article)}>
          <i className="bi bi-cart-plus" style={{ marginRight: '8px' }}></i> Add to Card
        </Button>
        {/* Show the message below the buttons */}
        {message && <div className="mt-3 alert alert-success">{message}</div>}
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
