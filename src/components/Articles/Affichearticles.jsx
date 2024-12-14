import React from 'react';
import MediaCard from './MediaCard';
import { Col, Row, Container } from 'react-bootstrap';

const Affichearticles = ({ articles }) => {
  return (
    <Container>
      <Row>
        {
          articles.map((art) => (
            <Col xs={12} sm={6} md={4} lg={3} xl={2} key={art.articleId} className="mb-2">
              <MediaCard 
                articleId={art.articleId}
                name={art.name}
                price={art.price}
                reference={art.reference}
                categoryName={art.category.name}
              />
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};

export default Affichearticles;
