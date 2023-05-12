import React from 'react'
import Container from 'react-bootstrap/Container'
import {
  Row,
  Col,
  Button,
} from "react-bootstrap";
import heroPic from '../pictures/hero.svg'
import hero2Pic from '../pictures/hero2.svg'
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
            <h1 className="text-light mt-5 hero-text2">
            {/* <h1 className="mt-5 hero-text2"> */}
              Build wealth with real estate, one brick at a time
            </h1>
            <p className="text-light hero-text3">Invest in rental properties without getting locked in or out. Buy just a fraction of a property & collect your first rent payment later today.</p>
            <div className='call-to-action'>
              <Button className='view-properties'>View Properties</Button>
              <div className='how-it-works text-light hero-text3'>How it works</div>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12} className="d-flex justify-content-center">
            <img src={hero2Pic} className="img-fluid hero-pic align-middle" alt="hero-img" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}
