import React, { useState, useEffect, useRef } from "react";
import {
  Row,
  Col,
  Card,
  Container,
} from "react-bootstrap";
import Navbar from '../Components/navbar';
import Footer from '../Components/Footer';
import firebase from "firebase";
import { auth, database } from "../config";
import DOMPurify from 'dompurify';

export default function Article({ match }) {

  //article data
  // const [articleKey, setArticleKey] = useState("");
  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  //snapshots
  const [article, setArticle] = useState({});

  const footerRef = useRef(null)

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

  //get article data
  useEffect(() => {
    if (match.params.hasOwnProperty('articleKey')) {
      const retrivedChildKey = match.params.articleKey;
      // setArticleKey(retrivedChildKey);

      database
        .ref("blog")
        .child(retrivedChildKey)
        .once("value", function (snapshot) {
          let val = snapshot.val();
          if (val) { setArticle(val) }
        });
    }
  }, []);

  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data)
  })

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
  }

  return (
    <>
      <Navbar footerRef={footerRef}/>
      <Container>
        <Row>
          <Col>
            <Card className="all-properties">
              <Card.Header as="h1">{article.title}</Card.Header>
              <Card.Body>
                {/* <Card.Title className="text-dark">{data.title}</Card.Title> */}
                <Card.Text as="div" className="p-2 text-dark" dangerouslySetInnerHTML={sanitizedData(article.content)} />
              </Card.Body>
              <Card.Footer className="text-muted">Published on: {formatDate(article.datePublished)}</Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer ref={footerRef}/>
    </>
  );
}
