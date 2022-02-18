import React from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import {Link} from "react-router-dom";
import personalRoomsPic from '../pictures/personal-rooms.jpg'
import familyApartments from '../pictures/family-apartments.jpg'
import villas from '../pictures/villas.jpg'

export default function CategoriesSection() {
  return (
    <div>
      <Container>
      <h2 className="mt-4">Modernizing Real Estate Transactions</h2>
      <p className="heading-p">PURCHASE A PROPERTY IN ABOUT A WEEK</p>
    
        <Row className="mt-5">
        <Col sm={12} md={4} lg={4}>
          <Link to="/personal-rooms"><Card className="category-cards text-dark mt-3">
            <Card.Img variant="top" src={personalRoomsPic} className="category-img"/>
            <Card.Body>
              <Card.Title>Condos</Card.Title>
              <Card.Text>
                Carefree living in beautifully maintained buildings.
              </Card.Text>
            </Card.Body>
          </Card></Link>
          </Col>
          <Col sm={12} md={4} lg={4}>
          <Link to="/family-apartments"><Card className="category-cards text-dark mt-3">
            <Card.Img variant="top" src={familyApartments} className="category-img"/>
            <Card.Body>
              <Card.Title>Single Family</Card.Title>
              <Card.Text>
              Stunning propeties to call home.
              </Card.Text>
            </Card.Body>
          </Card></Link>
          </Col>
          <Col sm={12} md={4} lg={4}>
          <Link to="/vacation-villas"><Card className="category-cards text-dark mt-3">
            <Card.Img variant="top" src={villas} className="category-img"/>
            <Card.Body>
              <Card.Title>Luxurious Residences</Card.Title>
              <Card.Text>
              Immaculate estates in the most exclusive locales.
              </Card.Text>
            </Card.Body>
          </Card></Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
