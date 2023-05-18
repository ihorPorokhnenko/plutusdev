import React from 'react'
import { Card, Container, Col, Row} from "react-bootstrap";

import closing from '../pictures/super fast closing2.png'
import transactions from '../pictures/simplifying real estate transactions.jpg'
import crypto from '../pictures/use your crypto to invest in liquid assets.jpg'

/**
 * @returns {JSX.Element}
 * @constructor
 */
export default function FindRoommatesContent() {
    return (
        <section className="find-roommates-content mt-5">
        <Container>
        <h3 className="my-4">The Plutus Solution</h3>
            <Row>
        <Col sm={12} md={4} lg={4}>
          <Card className="find-roommates-content-cards text-dark mt-3">
            <Card.Img variant="top" src={closing} className="find-roommates-content-cards-pic"/>
            <Card.Body>
              <Card.Title>Super-fast Closing</Card.Title>
              <Card.Text>
              Using the power of blockchain technology, Plutus can get you in your new home quickly.
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          <Col sm={12} md={4} lg={4}>
          <Card className="find-roommates-content-cards text-dark mt-3">
            <Card.Img variant="top" src={transactions} className="find-roommates-content-cards-pic" />
            <Card.Body>
              <Card.Title>Simplifying Real Estate Transactions </Card.Title>
              <Card.Text>
              The Plutus solution reduces the inherent complexity of traditional real estate transactions.
              </Card.Text>
            </Card.Body>
          </Card>
          </Col>
          <Col sm={12} md={4} lg={4}>
          <Card className="find-roommates-content-cards text-dark mt-3">
            <Card.Img variant="top"  src={crypto} className="find-roommates-content-cards-pic" />
            <Card.Body>
              <Card.Title>Use Your Crypto to Invest in Liquid Assets</Card.Title>
              <Card.Text>
              Real estate is a tried and tested investment vehicle that's as old as civilization iteslf.
              </Card.Text>
            </Card.Body>
          </Card>          
          </Col>
          </Row>
        </Container>
        </section>
    )
}
