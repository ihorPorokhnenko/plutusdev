import React, { useState, useEffect } from "react";
import Navbar from "../Components/navbar";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Carousel,
  Row,
  Col,
  Container,
  Card,
  Form,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faShower,
  faMapMarkerAlt,
  faHome,
  faArrowCircleRight,
  faCheckSquare,
  faTimesCircle,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons";
import Icon from "react-crypto-icons";
import firebase from "firebase";
import { auth, database } from "../config";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import MapContainer from '../Components/MapContainer'
import ReadReviews from '../Components/ReadReviews'
import { formatToCurrency, convertToBTC, convertToETH, convertToUSDC } from "../utils/formatCurrency";


export default function SinglePropertyPage({ match }) {
  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listings, setListings] = useState([]);
  //Booking form states
  const [arrivalDate, setArrivalDate] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [guests, setGuests] = useState("");
  const [propertyKey, setPropertyKey] = useState("");
  const [hostUid, setHostUid] = useState("");
  const [submit, setSubmit] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [heading, setheading] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  //Review form states
  const [stars, setStars] = useState("")
  const [review, setReview] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        setAuthState(false);
      } else {
        setAuthState(true);
        setUserUid(user.uid);
        setName(user.displayName);
      }
    });
  }, []);

  //get listing data
  useEffect(() => {
    //Retrive key from URL
    const RetrivedchildKey = match.params.propertyKey;
    setPropertyKey(RetrivedchildKey);

    database
      .ref("properties")
      .child(RetrivedchildKey)
      .once("value", function (snapshot) {
        const items = [];
        var val = snapshot.val();
        var hostUid = val.userUid;
        var img = val.imageOneURL;
        var amount = val.per_night;
        var title_head = val.title;
        var city_vr = val.city;
        var address_vr = typeof val.address !== 'undefined' ? val.address : '';
        var address2 = typeof val.address2 !== 'undefined' ? val.address2 : '';
        var city = typeof val.city !== 'undefined' ? val.city : '';
        var state = typeof val.state !== 'undefined' ? val.state : '';
        var zip = typeof val.zip !== 'undefined' ? val.zip : '';
        var livingRoom = val.livingRoom;
        var internet = val.internet;
        var gym = val.gym;
        var parking = val.parking;
        var ac = val.ac;
        var gatedSecurity = val.gatedSecurity;
        var waterSupply = val.waterSupply;
        var phoneNumber = val.phoneNumber;
        setHostUid(hostUid);
        setImageUrl(img)
        setPrice(amount)
        setheading(title_head)
        setCity(city_vr)
        setAddress(address_vr)
        items.push({
          key: RetrivedchildKey,
          userUid: userUid,
          title: val.title,
          imageOneURL: val.imageOneURL,
          // imageTwoURL: val.imageTwoURL,
          // imageThreeURL: val.imageThreeURL,
          // imageFourURL: val.imageFourURL,
          images: val.images,
          bedrooms: val.bedrooms,
          bathrooms: val.bathrooms,
          address: address_vr,
          address2: address2,
          city: city,
          state: state,
          zip: zip,
          fullAddress: `${address_vr}, ${address2} ${city}, ${state} ${zip}`,
          price: val.price,
          // per_night: per_night,
          // per_week: per_week,
          // per_month: per_month,
          // per_year: per_year,
          lat: val.lat,
          lng: val.lng,
          category: val.category,
          propertyStatus: val.propertyStatus,
          propertyType: val.propertyType,
          about: val.about,
          name: val.name,

          tours: val.tours,
          taxInfo: val.taxInfo,
          commInfo: val.commInfo,
          equipment: val.equipment,
          interiorFeatures: val.interiorFeatures,
          garageInfo: val.garageInfo,
          parkingInfo: val.parkingInfo,
          buildingInfo: val.buildingInfo,
          exteriorFeatures: val.exteriorFeatures,
          poolInfo: val.poolInfo,
          utilityInfo: val.utilityInfo,
          heatCool: val.heatCool,
          lotInfo: val.lotInfo,
          propInfo: val.propInfo,

          livingRoom: livingRoom,
          internet: internet,
          gym: gym,
          parking: parking,
          ac: ac,
          gatedSecurity: gatedSecurity,
          waterSupply: waterSupply,
          phoneNumber: phoneNumber
        });
        setListings(items);
      });
  }, [userUid]);

  const submitBooking = (e) => {
    e.preventDefault();
    database.ref("Bookings").push({
      userUid: userUid,
      arrivalDate: arrivalDate,
      departDate: departDate,
      guests: guests,
      propertyKey: propertyKey,
      hostUid: hostUid,
      imageUrl: imageUrl,
      price: price,
      title: heading,
      city: city,
      address: address,
    });
    setSubmit("Submitted");
  };

  const submitReview = (e) => {
    e.preventDefault();
    database.ref("Reviews").push({
      userUid: userUid,
      propertyKey: propertyKey,
      hostUid: hostUid,
      stars: stars,
      review: review,
      name: name,
    });
    toast("Review has been successfully posted", { type: "success" })
    document.getElementById("review-form").reset();
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    const body = e.target[0].value;
    console.log(body);
    const subject = "Plutus Property Question";

    window.location.href = `mailto:contact@plutusproperties.org?subject=${subject}&body=${body}`;
  }

  //Option values
  function handleChange(event) {
    setStars(event.target.value);
  }

  //Redirect after form submission
  if (submit === "Submitted") {
    return (
      <>
        <Redirect to="/done-booking" />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {listings.map((data) => (
        <React.Fragment key={data.key}>
          <div className="caraousel-slider mr-top-slider">
            <Container>
              <Carousel>
                {data.images ? Object.entries(data.images).map(([key, value]) => {
                  if (value.url) {
                    return (
                      <Carousel.Item key={key}>
                        <img
                          className="d-block w-100 img-thumbnail"
                          src={value.url}
                          alt={value.name ? value.name : `Slide ${Number(key) + 1}`}
                        />
                      </Carousel.Item>
                    )
                  }
                  return '';
                }) : ''}
                {/* {data.imageOneURL ?
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-thumbnail"
                    src={data.imageOneURL}
                    alt="First slide"
                  />
                </Carousel.Item> : ''}
                {data.imageTwoURL ?
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-thumbnail"
                    src={data.imageTwoURL}
                    alt="Second slide"
                  />
                </Carousel.Item> : ''}
                {data.imageThreeURL ?
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-thumbnail"
                    src={data.imageThreeURL}
                    alt="Third slide"
                  />
                </Carousel.Item> : ''}
                {data.imageFourURL ?
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-thumbnail"
                    src={data.imageFourURL}
                    alt="Fourth slide"
                  />
                </Carousel.Item> : ''} */}
              </Carousel>
            </Container>
          </div>

          <Container>
            <Row className="mt-5">
              <Col lg={8} md={8} sm={12}>
                <Card>
                  <h4 className="pl-2 pt-2">{data.address}</h4>
                  <div className="text-lead pl-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.fullAddress}&nbsp;&nbsp;
                    <FontAwesomeIcon icon={faHome} /> {data.category}
                  </div>

                  <Row className="p-2">
                    <Col lg={4} md={4} sm={4}>
                      <Card className="mt-2">
                        <Card.Body>
                          <FontAwesomeIcon icon={faHome} /> {data.category}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg={4} md={4} sm={4} className="mt-2">
                      <Card>
                        <Card.Body>
                          <FontAwesomeIcon icon={faBed} /> Bedrooms:
                          {data.bedrooms}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg={4} md={4} sm={4} className="mt-2">
                      <Card>
                        <Card.Body>
                          <FontAwesomeIcon icon={faShower} /> Bathrooms:
                          {data.bathrooms}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Container>
                    <h4 className="mt-4">About this listing</h4>
                    <p className="text-lead">{data.about}</p>

                    {/*TODO*/}
                    {/* <iframe
                      className="my-3"
                      width="100%"
                      height="300"
                      frameborder="0"
                      scrolling="no"
                      marginheight="0"
                      marginwidth="0"
                      src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;t=&amp;z=11&amp;ie=UTF8&amp;iwloc=B&amp;output=embed&amp;q=delhi"
                    ></iframe> */}

                    <hr />

                    <h4 className="mt-4">Home Facts</h4>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <p className="text-lead">
                          Status:&nbsp;
                          {data.propertyStatus}
                        </p>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <p className="text-lead">
                          Time on Plutus:&nbsp;
                          {"202 days"}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <p className="text-lead">
                          Property Type:&nbsp;
                          {data.propertyType}
                        </p>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <p className="text-lead">
                          Baths:&nbsp;
                          {"9 full, 4 partial"}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <p className="text-lead">
                          Year Built:&nbsp;
                          {"2004"}
                        </p>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <p className="text-lead">
                          Style:&nbsp;
                          {"Two Story"}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <p className="text-lead">
                          Community:&nbsp;
                          {"PALM ISLAND"}
                        </p>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <p className="text-lead">
                          Lot Size:&nbsp;
                          {"0.69 Acres"}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <p className="text-lead">
                          MLS#:&nbsp;
                          {data.mls}
                        </p>
                      </Col>
                    </Row>

                    <hr />

                    <h4 id="priceInsights" className="mt-4">Price Insights</h4>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <div className="text-lead">
                          <FontAwesomeIcon icon={faMoneyBill} /> List Price:&nbsp;
                          {formatToCurrency(data.price)}
                        </div>
                        <div className="text-lead">
                          <Icon name="eth" size={18} /> Ethereum Price:&nbsp;
                          {convertToETH(data.price).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <p className="text-lead">
                          Est. Mo. Payment:&nbsp;
                          {data.monthlyPayment}
                        </p>
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <div className="text-lead">
                          <Icon name="btc" size={18} /> Bitcoin Price:&nbsp;
                          {convertToBTC(data.price).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <div className="text-lead">
                          <Icon name="usdc" size={18} /> USD Coin Price:&nbsp;
                          {convertToUSDC(data.price).toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        </div>
                        <p className="text-lead">
                          Price/Sq.Ft.:&nbsp;
                          {data.priceSqFt}
                        </p>
                      </Col>
                    </Row>

                    <hr />

                    <MapContainer lat={data.lat ? data.lat : 26.003570} lng={data.lng ? data.lng : -80.353600} address={data.address ? data.address : "602 E Enclave Cir E, Pembroke Pines, FL 33027"} />

                    <h4 id="askQuestion" className="mt-4">Ask a Question</h4>
                    <Row>
                      <Col>
                        <form onSubmit={handleQuestionSubmit}>
                          <div className="form-group">
                            <textarea className="form-control" id="FormControlTextarea1" rows="3" placeholder="Write a question here"></textarea>
                          </div>
                          <Button type="submit" variant="outline-secondary">Ask a Question</Button>
                        </form>
                      </Col>
                    </Row>

                    {
                      data.tours !== undefined || data.taxInfo !== undefined || data.commInfo !== undefined ||
                        data.equipment !== undefined || data.interiorFeatures !== undefined ||
                        data.garageInfo !== undefined || data.parkingInfo !== undefined ||
                        data.buildingInfo !== undefined || data.exteriorFeatures !== undefined || data.poolInfo !== undefined || data.utilityInfo !== undefined || data.heatCool !== undefined ||
                        data.lotInfo !== undefined || data.propInfo !== undefined ?
                        (<><hr />
                          <h4 className="mt-4">Property Details for {data.title}</h4></>) : null
                    }
                    <Row>
                      <Col>
                        {data.tours !== undefined || data.taxInfo !== undefined || data.commInfo !== undefined ?
                          <Card className="virtualTour">
                            <Card.Header>
                              Virtual Tour, Taxes / Assessments, Location Details
                            </Card.Header>
                            <Card.Body>
                              <div className="super-group-content">
                                {data.tours !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Virtual Tour</h3>
                                        {
                                          data.tours.map((tour, index) => (
                                            <li key={`tour${index}`} className="entryItem "><span className="entryItemContent"><span>{tour}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                                {data.taxInfo !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Tax Information</h3>
                                        {
                                          data.taxInfo.map((info, index) => (
                                            <li key={`taxInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                                {data.commInfo !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Community Information</h3>
                                        {
                                          data.commInfo.map((info, index) => (
                                            <li key={`commInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                              </div>
                            </Card.Body>
                          </Card> : null}
                        {data.equipment !== undefined || data.interiorFeatures !== undefined ?
                          <Card className="interiorFeatures">
                            <Card.Header>
                              Interior Features
                            </Card.Header>
                            <Card.Body>
                              <div className="super-group-content">
                                {data.equipment !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Equipment</h3>
                                        {
                                          data.equipment.map((info, index) => (
                                            <li key={`equipment${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                                {data.interiorFeatures !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Interior Features</h3>
                                        {
                                          data.interiorFeatures.map((info, index) => (
                                            <li key={`interiorFeature${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                              </div>
                            </Card.Body>
                          </Card> : null}
                        {data.garageInfo !== undefined || data.parkingInfo !== undefined ?
                          <Card className="parking">
                            <Card.Header>
                              Parking / Garage
                            </Card.Header>
                            <Card.Body>
                              <div className="super-group-content">
                                {data.garageInfo !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Garage/Carport Information</h3>
                                        {
                                          data.garageInfo.map((info, index) => (
                                            <li key={`garageInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                                {data.parkingInfo !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Interior Features</h3>
                                        {
                                          data.parkingInfo.map((info, index) => (
                                            <li key={`parkingInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                              </div>
                            </Card.Body>
                          </Card> : null}
                        {data.buildingInfo !== undefined || data.exteriorFeatures !== undefined || data.poolInfo !== undefined ?
                          <Card className="exteriorFeatures">
                            <Card.Header>
                              Exterior Features
                            </Card.Header>
                            <Card.Body>
                              <div className="super-group-content">
                                {data.buildingInfo !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Building Information</h3>
                                        {
                                          data.buildingInfo.map((info, index) => (
                                            <li key={`buildInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                                {data.exteriorFeatures !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Exterior Features</h3>
                                        {
                                          data.exteriorFeatures.map((info, index) => (
                                            <li key={`exteriorFeature${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                                {data.poolInfo !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Pool Information</h3>
                                        {
                                          data.poolInfo.map((info, index) => (
                                            <li key={`poolInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                              </div>
                            </Card.Body>
                          </Card> : null}

                        {data.utilityInfo !== undefined || data.heatCool !== undefined ?
                          <Card className="utilities">
                            <Card.Header>
                              Utilities
                            </Card.Header>
                            <Card.Body>
                              <div className="super-group-content">
                                {data.utilityInfo !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Utility Information</h3>
                                        {
                                          data.utilityInfo.map((info, index) => (
                                            <li key={`utilityInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                                {data.heatCool !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Heating &amp; Cooling</h3>
                                        {
                                          data.heatCool.map((info, index) => (
                                            <li key={`heatCool${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                              </div>
                            </Card.Body>
                          </Card> : null}

                        {data.lotInfo !== undefined || data.propInfo !== undefined ?
                          <Card className="property">
                            <Card.Header>
                              Property / Lot Details
                            </Card.Header>
                            <Card.Body>
                              <div className="super-group-content">
                                {data.lotInfo !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Lot Information</h3>
                                        {
                                          data.lotInfo.map((info, index) => (
                                            <li key={`lotInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                                {data.propInfo !== undefined ?
                                  <div className="amenity-group">
                                    <ul>
                                      <div className="no-break-inside">
                                        <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Property Information</h3>
                                        {
                                          data.propInfo.map((info, index) => (
                                            <li key={`propInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                          ))
                                        }
                                      </div>
                                    </ul>
                                  </div> : null}
                              </div>
                            </Card.Body>
                          </Card> : null}
                      </Col>
                    </Row>

                    {/* <Form onSubmit={submitReview} id="review-form">
                    <Form.Row>
                      <Form.Group
                        as={Col}
                        lg={8}
                        md={8}
                        sm={12}
                        controlId="formBasicText"
                      >
                        <Form.Label>Write Your Review</Form.Label>
                        <Form.Control type="text" placeholder="Write here..." required onChange={(e)=>setReview(e.target.value)}/>
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        lg={4}
                        md={4}
                        sm={12}
                        controlId="formBasicText"
                      >
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                    as="select"
                    name="category"
                    onChange={handleChange}
                  >
                    <option>Select</option>
                    <option value="5">5 Star</option>
                    <option value="4">4 Star</option>
                    <option value="3">3 Star</option>
                    <option value="2">2 Star</option>
                    <option value="1">1 Star</option>
                  </Form.Control>
                      </Form.Group>
                      </Form.Row>
                     
                      <Button variant="success" type="submit">
                        Post Review
                      </Button>
                      
                    </Form>
                   
                    <hr />
                    <ReadReviews/> */}
                    <br />
                  </Container>
                </Card>
              </Col>

              <Col lg={4} md={4} sm={12} className="sticky-top">
                <div className="sticky-sidebar">
                  <Button
                    variant="danger"
                    className="btn-block"
                    href="https://calendly.com/plutusproperties">
                    Schedule Tour
                  </Button>
                  <Button
                    variant="light"
                    className="btn-block"
                    href="mailto:offers@plutusproperties.org?subject=Plutus Offer">
                    Start an Offer
                  </Button>
                  <div className="OrSeparator">
                    <div className="divider"></div>
                    <div className="label">OR</div>
                    <div className="divider"></div>
                  </div>
                  <ButtonGroup>
                    <Button variant="outline-primary" onClick={() => { document.getElementById("askQuestion").scrollIntoView({ block: "center", behavior: "smooth" }) }}>Ask a Question</Button>{' '}
                    {data.phoneNumber ?
                      <Button variant="outline-primary" href={`tel:1${data.phoneNumber}`}>{data.phoneNumber}</Button> : ''}
                  </ButtonGroup>
                  {' '}
                  <Card className="sale-tax-history">
                    <Card.Header>
                      Sale & Tax History
                    </Card.Header>
                    <Card.Body>Coming Soon</Card.Body>
                  </Card>

                  {/* <Card className="text-center booking-form">
                  <Card.Header className="card-booking-form-header">
                    ₹ {data.per_night}/Night
                  </Card.Header>
                  <Card.Body>
                    <Form onSubmit={submitBooking}>
                      <Form.Group controlId="formBasicEmail">
                        <Form.Label>Arrival Date</Form.Label>
                        <Form.Control
                          type="date" required
                          onChange={(e) => setArrivalDate(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Depart Date</Form.Label>
                        <Form.Control
                          type="date" required
                          onChange={(e) => setDepartDate(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group controlId="formBasicPassword">
                        <Form.Label>Number of Guestes</Form.Label>
                        <Form.Control
                          type="number" required
                          onChange={(e) => setGuests(e.target.value)}
                        />
                      </Form.Group> */}
                  {/* TODO Booking button */}
                  {/* {userUid==hostUid? "" : ""} */}
                  {/* <Button
                        variant="primary"
                        className="btn-block"
                        type="submit"
                      >
                        Book Now
                      </Button>
                    </Form>
                  </Card.Body> */}

                  {/* TODO: */}

                  {/* <Card.Footer className="text-muted">
                    <Link to={`/find-roommates?${data.city}Yes`}><Button variant="warning">
                      Find Roommates in {data.city}
                    </Button></Link>
                  </Card.Footer>

                </Card> */}
                </div>
              </Col>
            </Row>
          </Container>
          <br />
          <br />
          <br />
        </React.Fragment>
      ))}
    </>
  );
}
