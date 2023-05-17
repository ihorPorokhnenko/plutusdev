import React from "react";
import { Card, Container, Col, Row } from "react-bootstrap";
import {Link} from "react-router-dom";

import fibree from '../pictures/Fibree.svg'
import rogueSignal from '../pictures/RogueSignal_color.svg'
import sdnc from '../pictures/SDNC.svg'
import tenx from '../pictures/Ten-X.svg'
import southcarolina from '../pictures/southcarolina.svg'

export default function AsFeaturedIn() {
  return (
    <div>
      <Container>
      <h2 className="mt-5 text-center">As Featured In</h2>
        <Row className="mt-5 d-flex justify-content-center">
          <img src={fibree} className="img-fluid hero-pic align-middle mx-3" width="500px" alt="hero-img" />
          <img src={rogueSignal} className="img-fluid hero-pic align-middle mx-3" width="500px" alt="hero-img" />
        </Row>
        <Row className="mt-5 d-flex justify-content-center">
          <img src={sdnc} className="img-fluid hero-pic align-middle mx-3" width="500px" alt="hero-img" />
          <img src={tenx} className="img-fluid hero-pic align-middle mx-3" width="500px" alt="hero-img" />
        </Row>
        <Row className="mt-5 d-flex justify-content-center">
          <img src={southcarolina} className="img-fluid hero-pic align-middle mx-3" width="500px" alt="hero-img" />
        </Row>
      </Container>
    </div>
  );
}
