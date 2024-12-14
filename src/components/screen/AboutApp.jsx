import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import MainExtraSmallPromoCard from '../cards/mainExtraSmallPromoCard';

const AboutApp = () => {
  return (
    <Container className="mt-5" >
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="p-4 shadow-sm" style={{minHeight: '400px'}}>
            <Card.Body>
            <Row className="align-items-center ">
                <Col sm={2} xl={2}>
                    <MainExtraSmallPromoCard />
                </Col>

                <Col sm={8} xl={10}>
                <h2 className="text-center mb-4">About Our Restaurant App</h2>
                </Col>
            </Row>
              <p>
                Welcome to our restaurant app! Whether you’re craving delicious meals or planning your next dining experience, our app is here to make it easier for you.
              </p>
              <p>
                Explore our diverse menu, place orders seamlessly, and stay updated with exclusive promotions. Enjoy the convenience of viewing our special dishes and reserving a table right from your fingertips.
              </p>
              <p>
                We are committed to bringing you an exceptional dining experience with just a few taps. Bon appétit!
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutApp;
