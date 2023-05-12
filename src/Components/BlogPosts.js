import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import firebase from "firebase";
import { auth, database, blogRef } from "../config";
import DOMPurify from 'dompurify';

export default function BlogPosts() {
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
      .ref(blogRef)
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
      .ref(blogRef)
      .orderByChild("datePublished")
      .limitToLast(4)
      .on("value", (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var data = childSnapshot.val();
          items.push({
            key: childKey,
            title: data.title,
            content: data.content,
            datePublished: data.datePublished,
            dateModified: data.dateModified
          });
        });
        const rev_items = items.reverse()
        setBlogArticles(rev_items);
      });
  }, [userUid]);

  const truncateString = (str, num) => {
    if (str.length <= num) {
      return str
    }
    return str.slice(0, num) + '...'
  }

  const sanitizedData = (data) => {
    const cleanData = DOMPurify.sanitize(data);
    // Grab up to first p tag
    let truncData = cleanData.split("</p>")[0] + "</p>";

    const parsedExcerpt = new DOMParser().parseFromString(data, 'text/html');
    console.log(parsedExcerpt);
    if (parsedExcerpt) {
      const body = parsedExcerpt.querySelector('body').textContent;
      truncData = truncateString(body, 500);
      console.log(truncData);
    }

    return {
      __html: truncData
    }
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  return (
    <>
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

      <h2 className="text-center p-2 mt-4">Latest Blog Posts</h2>

      <Container>
        <Row>
          {blogArticles.map((data) => (
            <Col sm={12} md={6} lg={6} key={data.key}>
              <Link to={{ pathname: `/article/${data.key}`, state: { fromDashboard: true } }}>
                <Card className="all-properties">
                  {/* <Card.Img variant="top" src={closing} className="find-roommates-content-cards-pic"/> */}
                  <Card.Header as="h1">{data.title}</Card.Header>
                  <Card.Body>
                    {/* <Card.Title className="text-dark">{data.title}</Card.Title> */}
                    <Card.Text as="div" className="p-2 text-dark" dangerouslySetInnerHTML={sanitizedData(data.content)} />
                    <Card.Text>Read more ...</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-muted">Published on: {formatDate(data.datePublished)}</Card.Footer>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
    </>
  );
}
