import React, { useRef } from 'react';
import { Form, Col, Row, Button, Container, Card, CardGroup } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import Navbar from '../Components/navbar'
import Footer from '../Components/Footer'
import Erik from '../pictures/Erik Headshot.png'
import Preston from '../pictures/Preston Zen.png'


export default function AboutPage() {
  const footerRef = useRef(null)

  return (
    <>
      <Navbar footerRef={footerRef} />
      <Container>
        <Row>
          <CardGroup className="all-properties">
            <Card style={{ alignItems: 'center' }}>
              <Card.Img variant="top" src={Erik} style={{ width: '50%' }} />
              <Card.Body className="container">
                <Card.Text>
                  Erik is a real estate investor who has been passionate about cryptocurrency for years. He owns property in New York State and is a certified AWS cloud architect. He has served as a technology consultant for some of the world's largest broadcast news networks.
                </Card.Text>
              </Card.Body>
            </Card>
            <Card style={{ alignItems: 'center' }}>
              <Card.Img variant="top" src={Preston} style={{ width: '50%' }} />
              <Card.Body className="container">
                <Card.Text>
                  Preston is a seasoned technology entrepreneur with experience in multiple industries such as application development, cybersecurity, and blockchain technology. He is the president and founder of Kaizen Apps, Cybertech Defence, The Network Helpers & Kaizen Crypto with projects that have included the companies Sephora, Western Digital, San Disk, Disney, Trulia, Top Golf, and many more Fortune 1000 companies.
                </Card.Text>
              </Card.Body>
            </Card>
          </CardGroup>
        </Row>
      </Container>
      <Footer ref={footerRef} />
    </>
  )
}
