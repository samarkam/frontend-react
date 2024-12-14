import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import MainExtraSmallPromoCard from '../cards/mainExtraSmallPromoCard';

const Contact = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="p-4 shadow-sm" style={{minHeight: '500px'}}   >
            <Card.Body>
            <Row className="align-items-center ">
                <Col sm={2} xl={2}>
                    <MainExtraSmallPromoCard />
                </Col>

                <Col sm={8} xl={10}>
                <h2 className="text-center mb-4">Contact Us</h2>
                </Col>
            </Row>
              <p>
                We’d love to hear from you! Whether you have questions about our menu, want to make a reservation, or need assistance, feel free to reach out to us using the details below.
              </p>
              <h4>Phone Numbers:</h4>
              <ul>
                <li>+1 123-456-7890 (Main Branch)</li>
                <li>+1 987-654-3210 (Support Line)</li>
              </ul>
              <h4>Addresses:</h4>
              <ul>
                <li>123 Foodie Street, Gourmet City, CA 90210</li>
                <li>456 Culinary Avenue, Flavor Town, TX 75001</li>
              </ul>
              <p className="mt-3">
                You can also reach us through email at <a href="mailto:support@restaurantapp.com">support@restaurantapp.com</a>.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
