import React, { useState, useEffect } from "react";
// import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import Navbar from '../Components/navbar';
import firebase from "firebase";
import { auth, database } from "../config";
import DOMPurify from 'dompurify';

export default function Blog() {
  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listingsCheck, setListingsCheck] = useState(null);
  //snapshots
  const [blogArticles, setBlogArticles] = useState([]);
  //spinner
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        setAuthState(false);
      } else {
        setAuthState(true);
        setUserUid(user.uid);
      }
    });
  }, []);

  useEffect(() => {
    database
      .ref("blog")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          setListingsCheck(true);
          setLoading(false);
        } else {
          setListingsCheck(false);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userUid]);

  //get listing data
  useEffect(() => {
    database
      .ref("blog")
      .on("value", (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var data = childSnapshot.val();
          items.push({
            key: childKey,
            title: data.title,
            content: data.content
          });
        });
        setBlogArticles(items);
      });
  }, [userUid]);

  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data)
  })

  return (
    <>
      <Navbar />

      {/* Spinner */}
      {loading === true ? <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div> : ""}

      <Container>
        <Row>
          {blogArticles.map((data) => (
            <Col key={data.key}>
              {/* <Link to={{ pathname: `/property/${data.key}`, state: { fromDashboard: true } }}> */}
              <Card className="all-properties">
                <Card.Header as="h1">{data.title}</Card.Header>
                <Card.Body>
                  {/* <Card.Title className="text-dark">{data.title}</Card.Title> */}
                  <Card.Text as="div" className="p-2 text-dark" dangerouslySetInnerHTML={sanitizedData(data.content)} />
                </Card.Body>
                <Card.Footer className="text-muted">2 days ago</Card.Footer>
              </Card>
              {/* </Link> */}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
