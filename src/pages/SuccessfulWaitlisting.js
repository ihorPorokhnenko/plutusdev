import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Col } from "react-bootstrap";
import successPic from '../pictures/done.svg'

export default function SuccessfulPosting() {
  return (
    <Container className="mr-top-2">
      <Row>
        <Col>
          <img src={successPic} fluid="true" className="done-img" alt="" />
        </Col>
      </Row>
      &nbsp;
      <Row>
        <Col className="h4 align-self-center">
          <div className="text-center successful-post-text">Thank you, your information was successfully recorded.</div>
        </Col>
      </Row>
      <center><Link to="/coming-soon"><button className="btn btn-primary text-center mt-5">Go back to waitlist form</button></Link></center>
    </Container>
  )
}
