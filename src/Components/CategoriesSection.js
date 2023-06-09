import React from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import {Link} from "react-router-dom";
// import personalRoomsPic from '../pictures/personal-rooms.jpg'
// import familyApartments from '../pictures/family-apartments.jpg'
// import villas from '../pictures/villas.jpg'
import condos from '../pictures/Condos.jpeg'
import homes from '../pictures/single family homes.jpeg'
import luxury from '../pictures/luxury residences.jpeg'

export default function CategoriesSection() {
  return (
    <div>
      <Container>
      <h2 className="mt-4">Modernizing Real Estate Transactions</h2>
      <p className="heading-p">CLOSING FROM 3 MONTHS TO 3 MINUTES</p>
    
        <Row className="mt-5">
        <Col sm={12} md={4} lg={4}>
          <Link to="/condos"><Card className="category-cards text-dark mt-3">
            <Card.Img variant="top" src={condos} className="category-img"/>
            <Card.Body>
              <Card.Title>Condos</Card.Title>
              <Card.Text>
                Carefree living in beautifully maintained buildings.
              </Card.Text>
            </Card.Body>
          </Card></Link>
          </Col>
          <Col sm={12} md={4} lg={4}>
          <Link to="/single-family"><Card className="category-cards text-dark mt-3">
            <Card.Img variant="top" src={homes} className="category-img"/>
            <Card.Body>
              <Card.Title>Single Family</Card.Title>
              <Card.Text>
              Stunning propeties to call home.
              </Card.Text>
            </Card.Body>
          </Card></Link>
          </Col>
          <Col sm={12} md={4} lg={4}>
          <Link to="/luxury-residences"><Card className="category-cards text-dark mt-3">
            <Card.Img variant="top" src={luxury} className="category-img"/>
            <Card.Body>
              <Card.Title>Luxury Residences</Card.Title>
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
