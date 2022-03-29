import React, { useState, useEffect } from "react";
import { Form, Col, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { database, storage } from "../config";


export default function ComingSoon() {

  //form submission
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  //form submit status
  const [submit, setSubmit] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();

    const newContact = {
      name: name,
      email: email
    }
    // console.log(newContact);
    database.ref("waitlist").push(newContact);
    toast("Posted Successfully", { type: "success" });
    setSubmit("Submitted");
  };

  //Redirect after form submission
  if (submit === "Submitted") {
    return (
      <>
        <Redirect to="/done-waitlisting" />
      </>
    )
  }

  return (
    <Card className="become-host-card main">
      <Card.Body className="container">
        <h2 className="mt-3">Plutus Properties Waitlist Form:</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Your E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </Form.Group>
          </Form.Row>
          <Button variant="primary" className="btn btn-block" type="submit">
            Submit
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}
