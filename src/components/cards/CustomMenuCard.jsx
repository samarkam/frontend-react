import React from 'react';
import { Card } from 'react-bootstrap';

function CustomMenuCard({ title, imgSrc, onClick }) {
  return (
    <Card
      onClick={onClick}
      className="p-2"
      style={{ width: '8rem', cursor: 'pointer', textAlign: 'center' }}
    >
      <Card.Img
        variant="top"
        src={imgSrc}
        alt={title}
        style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
      />
      <Card.Body>
        <Card.Title style={{ fontSize: '0.9rem' }}>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default CustomMenuCard;
