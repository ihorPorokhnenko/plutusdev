import React from "react";
import { Container, Image, Col, Row } from "react-bootstrap";
import processImg from '../pictures/plutus-process.svg'

export default function PlutusProcess() {
  return (
    <div>
      <Container>
        <h2 className="mt-4 text-center">The Plutus Process</h2>
        <Row className="mt-5 justify-content-center">
          <Image src={processImg} fluid></Image>
        </Row>
      </Container>
    </div>
  );
}
