import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import heroPic from '../pictures/hero.svg'
import Vdo from '../pictures/pexels-kindel-media-7578552.mp4'

export default function hero_section() {
  return (
    <div className="fullscreen-bg">
      <video autoPlay loop muted style={{ position: "absolute", width: "100%", height: "70%", objectFit: "cover", zIndex: "-1" }}>
        <source src={Vdo} type="video/mp4"></source>
      </video>
      <Container fluid>
        <Row>
          <Col lg={6} md={12} sm={12} className="d-flex flex-column justify-content-center mt-5">
            <h1 className="text-light mt-5 hero-text">Buy and sell homes with cryptocurrency!</h1>
          </Col>
          <Col lg={6} md={12} sm={12} className="d-flex justify-content-center">
            <img src={heroPic} className="img-fluid hero-pic align-middle" alt="hero-img" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
