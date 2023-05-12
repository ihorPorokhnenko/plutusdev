import React from "react";
import { Button, Container, Col, Form, InputGroup, Row } from "react-bootstrap";

export default function EmailSignup() {
  return (
    <div className="py-5 email-signup-container">
      <Container>
        <Row>
          <Col xs={6}>
            <h2 style={{ color: "white" }}>The latest investing opportunities</h2>
            <p>Let us help you take you from zero to serious business and beyond. Our no-strings attached free trial lets you test our product today.</p>
          </Col>
          <Col xs={6} className="mt-4">
            <InputGroup>
              <Form.Control
                placeholder="Enter your email"
                aria-label="Enter your email"
                aria-describedby="basic-addon"
              />
              <Button variant="dark" id="button-addon">
                Submit
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
