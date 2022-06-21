import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Card,
  Button,
  Container,
  Modal,
  handleClose,
  show,
  Nav,
  ProgressBar
} from "react-bootstrap";
import Navbar from '../Components/navbar'
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

export default function ManagedListings() {
  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listingsCheck, setListingsCheck] = useState(null);
  //snapshots
  const [listings, setListings] = useState([]);
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
      .ref("properties")
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
      .ref("properties")
      .orderByChild("stakeable")
      .equalTo(true)
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
    <div className="managed">
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
          {listings.map((data) => (
            <Col sm={12} md={4} lg={4} key={data.key}>
              <Link to={{ pathname: `/managed-property/${data.key}`, state: { fromDashboard: true } }}>
                <Card className="all-properties">
                  <Card.Img
                    variant="top"
                    src={data.imageOneURL}
                    className="my-listings-thumbnail"
                  />
                  <Card.Body>
                    <Card.Title className="text-dark">{data.address}</Card.Title>
                    <Card.Text as="div" className="p-2 text-dark">
                      <FontAwesomeIcon icon={faBed} /> {data.bedrooms}&nbsp;
                      <FontAwesomeIcon icon={faShower} /> {data.bathrooms}&nbsp;
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.city}&nbsp; {data.state}
                      <br />

                      <div className="dark:bg-lofty-600">
                        <div className="flex items-start justify-between">
                          <div className="flex flex-col flex-1 w-3/5">
                            <span className="font-abc-favorit-trial text-16 text-lofty-dark dark:text-lofty-white font-medium whitespace-nowrap overflow-hidden overflow-ellipsis break-all">1248 S Keeler Ave</span>
                            <span className="font-abc-favorit-trial text-12 text-lofty-dark/50 dark:text-lofty-white font-medium whitespace-nowrap overflow-hidden overflow-ellipsis break-all">Chicago, IL 60623</span>
                          </div>
                          <div className="flex flex-col flex-1 items-end">
                            <span className="font-abc-favorit-trial text-22 leading-7 text-lofty-purple dark:text-lofty-light font-medium">18.4<span className="text-sm">%</span> IRR</span>
                            <span className="font-abc-favorit-trial text-16 leading-5 text-lofty-dark dark:text-lofty-white font-medium">7.4% CoC</span>
                          </div></div><div className="flex flex-col"><div className="shadow w-full bg-lofty-dark/10 dark:bg-lofty-10 mt-2 rounded-2xl">
                            {/* <div className="leading-none py-1 text-center bg-lofty-purple dark:bg-lofty-light rounded-2xl" style={{ width: '74.5103%' }}></div> */}
                          </div>
                          <ProgressBar animated now={74.5} label={'74.5%'} />
                          <div className="flex items-start justify-between mt-2">
                            <span className="font-abc-favorit-trial text-13 sm:text-sm text-lofty-purple dark:text-lofty-light font-bold">
                            </span><span className="font-abc-favorit-trial text-13 sm:text-sm text-lofty-dark/50 dark:text-lofty-gray/50 font-bold">2238 tokens left</span>
                          </div>                          
                        </div>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
      <br />
      <br />
    </div >
  );
}
