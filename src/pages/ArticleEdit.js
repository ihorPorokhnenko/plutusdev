import React, { useState, useEffect, useRef } from "react";
import { Form, Col, Button, Container, Card, InputGroup, ToggleButton } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/navbar";
import Footer from '../Components/Footer';
import { database, storage } from "../config";
import firebase from 'firebase'
import DOMPurify from 'dompurify';
import { DefaultEditor } from 'react-simple-wysiwyg';


export default function ArticleEdit({ match }) {

//   const [, updateState] = React.useState();
//   const forceUpdate = React.useCallback(() => updateState({}), []);

  //article data
  const [articleKey, setArticleKey] = useState("");
  // const [property, setProperty] = useState({});

  //form submission
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [datePublished, setDatePublished] = useState(Date.now());
  const [dateModified, setDateModified] = useState(Date.now());
  const [userUid, setUserUid] = useState("");

  //progress status

  //form submit status
  const [submit, setSubmit] = useState("")
  // console.log(submit)

  //Authstate
  const [authState, setAuthState] = useState("");

  const footerRef = useRef(null)

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        setAuthState("Logged-out")
      } else {
        setAuthState("Logged-in")
        setUserUid(user.uid)
        // setEmail(user.email)
        // setName(user.displayName)
      }
    });

    //Retrive key from URL
    if (match.params.hasOwnProperty('articleKey')) {
      const retrivedChildKey = match.params.articleKey;
      setArticleKey(retrivedChildKey);

      database
        .ref("blog")
        .child(retrivedChildKey)
        .once("value", function (snapshot) {
          let val = snapshot.val();
          // console.log(val);
          // setProperty(val);

          // if (val.name) { setName(val.name) };
          // if (val.email) { setEmail(val.email) };
          if (val.title) { setTitle(val.title) };
          if (val.content) { setContent(val.content) };
          if (val.datePublished) { setDatePublished(val.datePublished) };
          if (val.dateModified) { setDateModified(val.dateModified) };
        })
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newArticle = {
      // userUid: userUid
      // name: name,
      // email: email,
      title: title,
      content: content,
      datePublished: datePublished,
      dateModified: dateModified,
    }

    if (articleKey) {
      database.ref("blog").child(articleKey).update(newArticle);
      toast("Updated Successfully", { type: "success" });
    } else {
      let newArticleKey = database.ref("blog").push(newArticle).key;
      setArticleKey(newArticleKey);
      toast("Posted Successfully", { type: "success" });
    }
    setSubmit("Submitted");
  };

  const sanitizedData = (data) => ({
    __html: DOMPurify.sanitize(data)
  })

  //Redirect after form submission
  if (submit === "Submitted") {
    return (
      <>
        <Redirect to={{
          pathname: '/done-posting-home',
          state: { articleKey: articleKey }
        }} />
      </>
    )
  }

  if (authState === "Logged-out") {
    return (
      <>
        <Redirect to="/signup" />
      </>
    )
  }

  return (
    <div className="become-host">
      <Navbar footerRef={footerRef} />

      <ToastContainer
        position="top-right"
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      />

      <Card className="become-host-card main">
        <Card.Body className="container">
          <h2 className="mt-3">Article Details</h2>
          <Form onSubmit={handleSubmit}>
            {/* <Form.Row>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Contact E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Your E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required />
              </Form.Group>
            </Form.Row> */}

            <Form.Group controlId="formGridTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formGridContent">
              <Form.Label>Content</Form.Label>
              {/* <Form.Control
                as="textarea"
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              /> */}
              <DefaultEditor rows={20} value={content} onChange={(e) => setContent(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formGridContentPreview">
              <Form.Label>Content Preview</Form.Label>
              <div className="p-2 text-dark" dangerouslySetInnerHTML={sanitizedData(content)} />
            </Form.Group>

            <Form.Group controlId="formGridDatePublished">
              <Form.Label>Date Published</Form.Label>
              <Form.Control
                type="number"
                placeholder="1651962459228"
                value={datePublished}
                // min="0"
                onChange={(e) => setDatePublished(Number(e.target.value))}
                required />
            </Form.Group>

            <Form.Group controlId="formGridDateModified">
              <Form.Label>Date Modified</Form.Label>
              <Form.Control
                type="number"
                placeholder="1651962459228"
                value={dateModified}
                // min="0"
                onChange={(e) => setDateModified(Number(e.target.value))}
                required />
            </Form.Group>

            {" "}
            <Button variant="primary" className="btn btn-block" type="submit">
              Post My Article
            </Button>
            <br />
            <br />
          </Form>
        </Card.Body>
      </Card >
      <Footer ref={footerRef} />
    </div >
  );
}
