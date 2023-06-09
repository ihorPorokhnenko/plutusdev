import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/navbar";
import Footer from '../Components/Footer';
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
  Tab,
  Tabs,
  ProgressBar
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBed,
  faShower,
  faMapMarkerAlt,
  faHome,
  faArrowCircleRight,
  faCircle,
  faCheckSquare,
  faTimesCircle,
  faMoneyBill
} from "@fortawesome/free-solid-svg-icons";
import opensea from '../pictures/opensea.svg';
import Icon from "react-crypto-icons";
import firebase from "firebase";
import { auth, database } from "../config";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import MapContainer from '../Components/MapContainer'
import { NFTE } from '@nfte/react';
import { formatToCurrency, convertToBTC, convertToETH, convertToUSDC } from "../utils/formatCurrency";


export default function ManagedProperty({ match }) {
  //Authstate
  const [authState, setAuthState] = useState(null);
  const [userUid, setUserUid] = useState(null);
  const [listings, setListings] = useState([]);
  //Booking form states
  const [propertyKey, setPropertyKey] = useState("");
  const [hostUid, setHostUid] = useState("");
  const [submit, setSubmit] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [heading, setheading] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  //Review form states
  const [name, setName] = useState("")

  const footerRef = useRef(null)

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
          videos: val.videos,
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
          sellerName: val.sellerName,
          sellerEmail: val.sellerEmail,
          sellerPhone: val.sellerPhone,

          matterportUrl: val.matterportUrl,
          taxInfo: val.taxInfo,
          hoaInfo: val.hoaInfo,
          otherHoaFeeInfo: val.otherHoaFeeInfo,
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
          nftInfo: val.nftInfo,
          nftAddress: val.nftAddress,
          nftTokenId: val.nftTokenId,
          disclosures: val.disclosures,
          stakeable: val.stakeable,

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

  //Property status class
  function getPropertyStatusClassName(someInput) {
    switch (someInput) {
      case 'Active': {
        return 'fa-active'
      }
      case 'Coming Soon': {
        return 'fa-soon'
      }
      case 'Under Contract / Pending': {
        return 'fa-pending'
      }
      default:
        return ''
    }
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
    <div className="managed">
      <Navbar footerRef={footerRef} />
      {listings.map((data) => (
        <React.Fragment key={data.key}>
          <div className="caraousel-slider mr-top-slider">
            <Container>
              <Carousel interval={null}>
                {data.videos && Object.entries(data.videos).map(([key, value]) => {
                  if (value.url) {
                    return (
                      <Carousel.Item key={`video${key}`}>
                        <video
                          className="VideoInput_video d-block w-100 img-thumbnail"
                          controls
                          src={value.url}
                          alt={value.name ? value.name : `Slide ${Number(key) + 1}`}
                        />
                      </Carousel.Item>
                    )
                  }
                  return '';
                })}
                {data.images && Object.entries(data.images).map(([key, value]) => {
                  if (value.url) {
                    return (
                      <Carousel.Item key={`image${key}`}>
                        <img
                          className="d-block w-100 img-thumbnail"
                          src={value.url}
                          alt={value.name ? value.name : `Slide ${Number(key) + 1}`}
                        />
                      </Carousel.Item>
                    )
                  }
                  return '';
                })}
              </Carousel>
            </Container>
          </div>

          <Container>
            <Row className="mt-5">
              <Col lg={8} md={8} sm={12}>
                <Card>
                  <h4 className="pl-2 pt-2">{data.address}</h4>
                  <div className="text-lead pl-2">
                    <FontAwesomeIcon icon={faMapMarkerAlt} /> {data.fullAddress}
                    <br />
                    {data.propertyStatus &&
                      <><FontAwesomeIcon icon={faCircle} className={getPropertyStatusClassName(data.propertyStatus)} /> {data.propertyStatus}</>
                    }
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
                          <FontAwesomeIcon icon={faBed} /> Bedrooms: {data.bedrooms}
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col lg={4} md={4} sm={4} className="mt-2">
                      <Card>
                        <Card.Body>
                          <FontAwesomeIcon icon={faShower} /> Bathrooms: {data.bathrooms}
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                  <Container>
                    {
                      data.about !== undefined || data.price !== undefined || data.lat !== undefined || data.lng !== undefined || data.hoaInfo !== undefined ||
                        data.otherHoaFeeInfo !== undefined || data.matterportUrl !== undefined || data.taxInfo !== undefined || data.commInfo !== undefined ||
                        data.equipment !== undefined || data.interiorFeatures !== undefined || data.garageInfo !== undefined || data.parkingInfo !== undefined ||
                        data.buildingInfo !== undefined || data.exteriorFeatures !== undefined || data.poolInfo !== undefined || data.utilityInfo !== undefined ||
                        data.heatCool !== undefined || data.lotInfo !== undefined || data.propInfo !== undefined || data.nftAddress !== undefined ||
                        data.nftTokenId !== undefined || data.disclosures !== undefined ?
                        (<><hr />
                          <h4 className="mt-4">Property Details for {data.title}</h4></>) : null
                    }
                    <Row>
                      <Col>
                        <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example" className="mb-3">
                          <Tab eventKey="overview" title="Overview">
                            <h4 className="mt-4">About this listing</h4>
                            <p className="text-lead">{data.about}</p>
                          </Tab>
                          <Tab eventKey="price" title="Price Insights">
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
                              </Col>
                            </Row>
                            <br />
                            <p className="text-lead">For crypto-collateralized financing reach out to <a href="mailto:financing@plutusproperties.org">financing@plutusproperties.org</a></p>
                          </Tab>
                          <Tab eventKey="map" title="Location">
                            <MapContainer lat={data.lat ? data.lat : 26.003570} lng={data.lng ? data.lng : -80.353600} address={data.address ? data.address : "602 E Enclave Cir E, Pembroke Pines, FL 33027"} />
                          </Tab>
                          {data.matterportUrl !== undefined && data.matterportUrl.trim() !== '' &&
                            <Tab eventKey="tour" title="Virtual Tour">
                              <iframe title="Matterport Virtual Tour" width='100%' height='480' src={data.matterportUrl} frameBorder='0' allowFullScreen allow='xr-spatial-tracking'></iframe>
                            </Tab>}
                          {data.hoaInfo !== undefined || data.otherHoaFeeInfo !== undefined ?
                            <Tab eventKey="hoa" title="HOA Info">
                              <Card className="hoa">
                                <Card.Header>
                                  Homeowners Association
                                </Card.Header>
                                <Card.Body>
                                  <div className="super-group-content">
                                    {data.hoaInfo !== undefined ?
                                      <div className="amenity-group">
                                        <ul>
                                          <div className="no-break-inside">
                                            <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">HOA Information</h3>
                                            {
                                              data.hoaInfo.map((info, index) => (
                                                <li key={`hoaInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                              ))
                                            }
                                          </div>
                                        </ul>
                                      </div> : null}
                                    {data.otherHoaFeeInfo !== undefined ?
                                      <div className="amenity-group">
                                        <ul>
                                          <div className="no-break-inside">
                                            <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Other Fee Information</h3>
                                            {
                                              data.otherHoaFeeInfo.map((info, index) => (
                                                <li key={`otherHoaFeeInfo${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                              ))
                                            }
                                          </div>
                                        </ul>
                                      </div> : null}
                                  </div>
                                </Card.Body>
                              </Card>
                            </Tab> : null}
                          {data.taxInfo !== undefined || data.commInfo !== undefined ?
                            <Tab eventKey="taxes" title="Taxes / Location Details">
                              <Card className="taxes">
                                <Card.Header>
                                  Taxes / Assessments, Location Details
                                </Card.Header>
                                <Card.Body>
                                  <div className="super-group-content">
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
                              </Card>
                            </Tab> : null}
                          {data.equipment !== undefined || data.interiorFeatures !== undefined ?
                            <Tab eventKey="interiorFeatures" title="Interior Features">
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
                              </Card>
                            </Tab> : null}
                          {data.garageInfo !== undefined || data.parkingInfo !== undefined ?
                            <Tab eventKey="parking" title="Parking / Garage">
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
                              </Card>
                            </Tab> : null}
                          {data.buildingInfo !== undefined || data.exteriorFeatures !== undefined || data.poolInfo !== undefined ?
                            <Tab eventKey="exteriorFeatures" title="Exterior Features">
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
                              </Card>
                            </Tab> : null}
                          {data.utilityInfo !== undefined || data.heatCool !== undefined ?
                            <Tab eventKey="utilities" title="Utilities">
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
                              </Card>
                            </Tab> : null}
                          {data.lotInfo !== undefined || data.propInfo !== undefined ?
                            <Tab eventKey="property" title="Property / Lot Details">
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
                              </Card>
                            </Tab> : null}
                          {data.nftAddress !== undefined && data.nftTokenId !== undefined &&
                            <Tab eventKey="nft" title="NFT">
                              <Card className="nft">
                                <Card.Header>
                                  NFT
                                </Card.Header>
                                <Card.Body style={{ 'textAlign': 'center' }}>
                                  <a href={`https://opensea.io/assets/matic/${data.nftAddress}/${data.nftTokenId}`} target="_blank" rel="noreferrer"><img src={opensea} fluid="true" alt="" /></a>
                                  <div style={{ 'padding': '5px' }} />
                                  <a href={`https://opensea.io/assets/matic/${data.nftAddress}/${data.nftTokenId}`} target="_blank" rel="noreferrer" className="btn btn-primary">View NFT</a>
                                </Card.Body>
                              </Card>
                            </Tab>}
                          {data.disclosures !== undefined &&
                            <Tab eventKey="disclosures" title="Disclosures">
                              <Card className="disclosures">
                                <Card.Header>
                                  Disclosures
                                </Card.Header>
                                <Card.Body>
                                  <div className="super-group-content">
                                    <div className="amenity-group">
                                      <ul>
                                        <div className="no-break-inside">
                                          <h3 className="title font-color-gray-dark font-weight-bold propertyDetailsHeader">Disclosure Information</h3>
                                          {
                                            data.disclosures.map((info, index) => (
                                              <li key={`disclosures${index}`} className="entryItem "><span className="entryItemContent"><span>{info}</span></span></li>
                                            ))
                                          }
                                        </div>
                                      </ul>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Card>
                            </Tab>}
                        </Tabs>
                      </Col>
                    </Row>

                    <hr />
                    <br />
                  </Container>
                </Card>
              </Col>

              <Col lg={4} md={4} sm={12} className="sticky-top">
                <div className="sticky-sidebar">
                  <div id="invest-form" className="font-abc-favorit-trial font-bold text-center mr-0.5 mb-2.5 rounded-xl bg-white border-0 border-black border-opacity-5 shadow-deep w-full ">
                    <div className="w-full">
                      <div className="w-full">
                        <div className="bg-lofty-light bg-opacity-20 px-2 pt-3 rounded-t-xl">
                        <ProgressBar className="" animated now={74.5} label={'74.5%'} />
                          <div className="flex justify-between py-2">
                            <div>
                              <span className="text-lofty"></span></div>
                            <div>
                              <span className="text-lofty-dark opacity-60">2238 tokens left</span></div>
                            </div>
                        </div></div>
                      <div className="flex flex-col px-2 py-3 space-y-4">
                        <div className="w-full flex justify-between items-center">
                          <div className="text-gray-400 dark:text-themeBlue-dark">
                            <div className="flex items-start justify-center mr-px p-0 cursor-pointer">
                              <div className="flex items-center">
                                <span className="text-lofty-dark text-lg">Projected IRR</span>
                                <i className="fas fa-info text-12 p-1 rounded-full w-5 h-5 ml-2 text-lofty-purple bg-lofty-light bg-opacity-10"></i>
                              </div></div>
                            <div className="transition-opacity rounded z-50 bg-gray-600 text-white text-sm font-normal p-1.5 pointer-events-none invisible opacity-0" style={{ position: "absolute", inset: "0px auto auto 0px", transform: "translate3d(187.5px, 796.5px, 0px)" }} data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="right"><div className="block max-w-350-px p-2 text-left"><span>This is the estimated IRR if you were to invest in this property based on current estimated fair market value, property appreciation, and Cash on Cash Return. Internal Rate of Return (IRR) is an annualized return for equity investments that includes cash distributions and appreciation. The IRR percentage here is a combination of the Cash on Cash return and the projected appreciation over a one year time period.</span></div><div className="tt-pp-arrow block w-2 h-2 bg-transparent -left-1" style={{ position: "absolute", top: "0px", transform: "translate3d(0px, 100px, 0px)" }}></div></div></div><p className="text-lofty-purple text-4xl">18.4%</p></div>
                        <div className="w-full flex justify-between items-center"><div className="text-gray-400 dark:text-themeBlue-dark max-w"><div className="flex items-start justify-center mr-px p-0 cursor-pointer"><div className="flex items-center"><span className="text-lofty-dark opacity-70 text-md">CoC Return</span><i className="fas fa-info text-12 p-1 rounded-full w-5 h-5 ml-2 text-lofty-purple bg-lofty-light bg-opacity-10"></i></div></div><div className="transition-opacity rounded z-50 bg-gray-600 text-white text-sm font-normal p-1.5 pointer-events-none invisible opacity-0" style={{ position: "absolute", inset: "0px auto auto 0px", transform: "translate3d(158.5px, 832.5px, 0px)" }} data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="right">
                          <div className="block max-w-350-px p-2 text-left"><span>This is the Cash on Cash (CoC) return if you were to invest in this property at the current property fair market value and net operating income. CoC Return is another term for Cash Payout. CoC Return is the cash return on an investment compared to the amount of cash invested. For example, an investment with cash distributions of $50 on a $1,000 investment has a 5% CoC return. The percentage here is dependent on the property being rented out for the exact numbers listed in the Financials section.</span></div><div className="tt-pp-arrow block w-2 h-2 bg-transparent -left-1" style={{ position: "absolute", top: "0px", transform: "translate3d(0px, 120px, 0px)" }}></div></div></div><p className="text-lofty-light text-4xl">7.4%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="success"
                    className="btn-block"
                    href="mailto:offers@plutusproperties.org?subject=Plutus Offer">
                    Invest
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
          <br />
          <br />
          <br />
        </React.Fragment>
      ))}
      <Footer ref={footerRef} />
    </div>
  )
}
