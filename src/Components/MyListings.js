import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Modal,
  handleClose,
  show,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faShower,
  faMapMarkerAlt,
  faRupeeSign,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons";
import Icon from "react-crypto-icons";
import { v4 as uuidv4 } from "uuid";
import firebase from "firebase";
import { auth, database } from "../config";
import { formatToCurrency, convertToBTC, convertToETH, convertToUSDC } from "../utils/formatCurrency";

export default function MyListings() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listingsCheck, setListingsCheck] = useState(null);
  //snapshots
  const [listings, setListings] = useState([]);

  let history = useHistory();

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

  //TODO : setLoading status as false
  useEffect(() => {
    database
      .ref("properties")
      .orderByChild("userUid")
      .equalTo(userUid)
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          setListingsCheck(true);

        } else {
          setListingsCheck(false);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userUid]);

  //get listing data
  useEffect(() => {
    database
      .ref("properties")
      .orderByChild("userUid")
      .equalTo(userUid)
      .on("value", (snapshot) => {
        const items = [];
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var data = childSnapshot.val();
          let firstImageURL = "";
          if (data.images && Object.keys(data.images).length > 0 && data.images[0].url) {
            firstImageURL = data.images[0].url;
          } else {
            firstImageURL = data.imageOneURL;
          }
          items.push({
            key: childKey,
            title: data.title,
            address: data.address,
            imageOneURL: firstImageURL,
            bedrooms: data.bedrooms,
            bathrooms: data.bathrooms,
            city: data.city,
            per_month: data.per_month,
            price: data.price
          });
        });
        setListings(items);
      });
  }, [userUid]);

  return (
    <>
      {listingsCheck === true ? <h2 className="text-center">My Listings</h2> : ""}

      <Container>
        <Row>
          {listings.map((data) => (
            <Col sm={12} md={4} lg={4} key={uuidv4()}>
              <Card className="mt-4">
                <Card.Img
                  variant="top"
                  src={data.imageOneURL}
                  className="my-listings-thumbnail"
                />
                <Card.Body>
                  <Card.Title>{data.address}</Card.Title>
                  <Card.Text as="div" className="p-2">
                    <FontAwesomeIcon icon={faBed} /> {data.bedrooms}&nbsp;
                    <FontAwesomeIcon icon={faShower} /> {data.bathrooms}&nbsp;
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city}&nbsp;
                    <br />
                    <FontAwesomeIcon icon={faMoneyBill} /> {formatToCurrency(data.price)}
                    <br />
                    <Icon name="eth" size={16} /> {convertToETH(data.price).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    <br />
                    <Icon name="btc" size={16} /> {convertToBTC(data.price).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    <br />
                    <Icon name="usdc" size={16} /> {convertToUSDC(data.price).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Card.Text>

                  <Button variant="primary" onClick={() => history.push(`/become-host/${data.key}`)}>
                    Edit
                  </Button>
                  {' '}
                  <Button variant="danger" onClick={handleShow}>
                    Delete
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Plutus Properties</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          const propertyDB = firebase
                            .database()
                            .ref("properties")
                            .child(data.key);
                          propertyDB.remove();
                          handleClose();
                        }}
                      >
                        Delete
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
      <br />
    </>
  );
}
