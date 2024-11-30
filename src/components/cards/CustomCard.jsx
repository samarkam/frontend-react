import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CustomCard = ({ articleId, title, text, imgSrc, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(articleId);
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
          onClick={handleAddToCart}
        >
          <i className="bi bi-cart-plus" style={{ marginRight: '8px' }}></i> Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CustomCard;
