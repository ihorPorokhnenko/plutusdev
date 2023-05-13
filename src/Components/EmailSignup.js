import React, { useState } from "react";
import { Button, Container, Col, Form, InputGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { database } from "../config";

// If adding via google sheet
// const form = document.querySelector("#form")
// const submitButton = document.querySelector("#submit")
// const scriptURL = 'https://script.google.com/macros/s/AKfycbwJ-CuEu9jBZok68WSjSvGTqbDVZmt9IV9BMcBbcd-dgyRCSotbHOT7ca_Ie8TFmZrVng/exec'

// form.addEventListener('submit', e => {
//   submitButton.disabled = true
//   e.preventDefault()
//   let requestBody = new FormData(form)
//   fetch(scriptURL, { method: 'POST', body: requestBody})
//     .then(response => {
//       alert('Success!', response)
//       submitButton.disabled = false
//     })
//     .catch(error => {
//       alert('Error!', error.message)
//       submitButton.disabled = false
//     })
// })

export default function EmailSignup() {
  //form submission
  const [email, setEmail] = useState("");

  //form submit status
  const [submit, setSubmit] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmail = {
      email: email
    }
    // console.log(newEmail);
    // database.ref("newsletter").push(newEmail);
    // toast("Email Submitted Successfully", { type: "success" });
    // setSubmit("Email Submitted");
    // Get a key for a new Post.
    const newEmailKey = database.ref("newsletter").push().key;
    database.ref(`newsletter/${newEmailKey}`).set(newEmail, (error) => {
      if (error) {
        // The write failed...
        toast("Email Submission error", { type: "error" });
      } else {
        // Data saved successfully!
        toast("Email Submitted Successfully", { type: "success" });
        setSubmit("Email Submitted");
      }

      // fetch(scriptURL, { method: 'POST', body: newEmail})
      //   .then(response => {
      //     alert('Success!', response)
      //     // submitButton.disabled = false
      //   })
      //   .catch(error => {
      //     alert('Error!', error.message)
      //     // submitButton.disabled = false
      //   })
    });
  };

  return (
    <div className="py-5 email-signup-container">
      <Container>
        <Row>
          <Col xs={6}>
            <h2 style={{ color: "white" }}>The latest investing opportunities</h2>
            <p>Let us help you take you from zero to serious business and beyond. Our no-strings attached free trial lets you test our product today.</p>
          </Col>
          <Col xs={6} className="mt-4">
            <Form onSubmit={handleSubmit}>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  aria-label="Enter your email"
                  aria-describedby="basic-addon"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
                <Button variant="dark" id="button-addon" type="submit">
                  Submit
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
