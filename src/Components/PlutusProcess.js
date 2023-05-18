import React from "react";
import { Container, Image, Col, Row } from "react-bootstrap";
// import processImg from '../pictures/plutus-process.svg'
import processImg2 from '../pictures/plutus-process2.svg'

const PlutusProcess = React.forwardRef((props, ref) => {
  return (
    <div id="plutus-process" ref={ref}>
      <Container>
        <h2 className="mt-4 text-center">The Plutus Process</h2>
        <Row className="mt-5 justify-content-center">
          <Image src={processImg2} fluid></Image>
        </Row>
      </Container>
    </div>
  );
});

export default PlutusProcess

