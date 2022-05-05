import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Form, Col, Button, Container, Card, InputGroup } from "react-bootstrap";
import Icon from "react-crypto-icons";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/navbar";
import { database, storage, googleApiKey } from "../config";
import firebase from 'firebase'
import imageCompression from 'browser-image-compression';
import { imageConfig } from '../utils/imageConfig'
import Geocode from "react-geocode";
import { convertToBTC, convertToETH, convertToUSDC } from "../utils/formatCurrency";


Geocode.setApiKey(googleApiKey);

export default function BecomeHost({ match }) {

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  //property data
  const [propertyKey, setPropertyKey] = useState("");
  // const [property, setProperty] = useState({});

  //form submission
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhone, setSellerPhone] = useState("");
  const [category, setCategory] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [st, setSt] = useState("");
  const [zip, setZip] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  // const [per_night, setPer_night] = useState("");
  // const [per_week, setPer_week] = useState("");
  // const [per_month, setPer_month] = useState("");
  // const [per_year, setPer_year] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [fullBathrooms, setFullBathrooms] = useState("");
  const [partialBathrooms, setPartialBathrooms] = useState("");

  const [about, setAbout] = useState("");
  const [userUid, setUserUid] = useState("")
  const [imageOneName, setImageOneName] = useState("");
  const [imageTwoName, setImageTwoName] = useState("");
  const [imageThreeName, setImageThreeName] = useState("");
  const [imageFourName, setImageFourName] = useState("");
  const [imageOneURL, setImageOneURL] = useState("");
  const [imageTwoURL, setImageTwoURL] = useState("");
  const [imageThreeURL, setImageThreeURL] = useState("");
  const [imageFourURL, setImageFourURL] = useState("");
  const [images, setImages] = useState({});
  const [videos, setVideos] = useState({});

  const [fileObj, setFileObj] = useState([]);
  const [fileArray, setFileArray] = useState([]);
  const [file, setFile] = useState([null]);

  const [matterportUrl, setMatterportUrl] = useState('');
  const [taxInfo, setTaxInfo] = useState([]);
  const [hoaInfo, setHoaInfo] = useState([]);
  const [otherHoaFeeInfo, setOtherHoaFeeInfo] = useState([]);
  const [commInfo, setCommInfo] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [interiorFeatures, setInteriorFeatures] = useState([]);
  const [garageInfo, setGarageInfo] = useState([]);
  const [parkingInfo, setParkingInfo] = useState([]);
  const [buildingInfo, setBuildingInfo] = useState([]);
  const [exteriorFeatures, setExteriorFeatures] = useState([]);
  const [poolInfo, setPoolInfo] = useState([]);
  const [utilityInfo, setUtilityInfo] = useState([]);
  const [heatCool, setHeatCool] = useState([]);
  const [lotInfo, setLotInfo] = useState([]);
  const [propInfo, setPropInfo] = useState([]);
  const [disclosures, setDisclosures] = useState([]);

  //progress status

  //form submit status
  const [submit, setSubmit] = useState("")
  // console.log(submit)

  //Authstate
  const [authState, setAuthState] = useState("");

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        setAuthState("Logged-out")
      } else {
        setAuthState("Logged-in")
        setUserUid(user.uid)
        setEmail(user.email)
        setName(user.displayName)
      }
    });

    //Retrive key from URL
    if (match.params.hasOwnProperty('propertyKey')) {
      const retrivedChildKey = match.params.propertyKey;
      setPropertyKey(retrivedChildKey);

      database
        .ref("properties")
        .child(retrivedChildKey)
        .once("value", function (snapshot) {
          let val = snapshot.val();
          // console.log(val);
          // setProperty(val);

          if (val.name) { setName(val.name) };
          if (val.email) { setEmail(val.email) };
          if (val.sellerName) { setSellerName(val.sellerName) };
          if (val.sellerEmail) { setSellerEmail(val.sellerEmail) };
          if (val.sellerPhone) { setSellerPhone(val.sellerPhone) };
          if (val.category) { setCategory(val.category) };
          if (val.propertyStatus) { setPropertyStatus(val.propertyStatus) };
          if (val.address) { setAddress(val.address) };
          if (val.address2) { setAddress2(val.address2) };
          if (val.city) { setCity(val.city) };
          if (val.state) { setSt(val.state) };
          if (val.zip) { setZip(val.zip) };
          if (val.title) { setTitle(val.title) };
          if (val.price) { setPrice(val.price) };
          // if (val.name) {setPer_night(val.per_night)};
          // if (val.name) {setPer_week(val.per_week)};
          // if (val.name) {setPer_month(val.per_month)};
          // if (val.name) {setPer_year(val.per_year)};
          if (val.bedrooms) { setBedrooms(val.bedrooms) };
          if (val.bathrooms) { setBathrooms(val.bathrooms) };
          if (val.fullBathrooms) { setFullBathrooms(val.bathrooms) };
          if (val.partialBathrooms) { setPartialBathrooms(val.bathrooms) };

          if (val.about) { setAbout(val.about) };
          // if (val.name) {setUserUid(val.userUid)};
          if (val.imageOneName) { setImageOneName(val.imageOneName) };
          if (val.imageTwoName) { setImageTwoName(val.imageTwoName) };
          if (val.imageThreeName) { setImageThreeName(val.imageThreeName) };
          if (val.imageFourName) { setImageFourName(val.imageFourName) };
          if (val.imageOneURL) { setImageOneURL(val.imageOneURL) };
          if (val.imageTwoURL) { setImageTwoURL(val.imageTwoURL) };
          if (val.imageThreeURL) { setImageThreeURL(val.imageThreeURL) };
          if (val.imageFourURL) { setImageFourURL(val.imageFourURL) };

          // let tempImages = {
          //   0: {"name": val.imageOneName, "url": val.imageOneURL},
          //   1: {"name": val.imageTwoName, "url": val.imageTwoURL},
          //   2: {"name": val.imageThreeName, "url": val.imageThreeURL},
          //   3: {"name": val.imageFourName, "url": val.imageFourURL},
          // };
          // console.log(tempImages);
          // setImages(tempImages);

          if (val.images) { setImages(val.images) };
          if (val.videos) { setVideos(val.videos) };

          // Extra Info
          if (val.matterportUrl) { setMatterportUrl(val.matterportUrl) };
          if (val.taxInfo) { setTaxInfo(val.taxInfo) };
          if (val.hoaInfo) { setHoaInfo(val.hoaInfo) };
          if (val.otherHoaFeeInfo) { setOtherHoaFeeInfo(val.otherHoaFeeInfo) };
          if (val.commInfo) { setCommInfo(val.commInfo) };
          if (val.equipment) { setEquipment(val.equipment) };
          if (val.interiorFeatures) { setInteriorFeatures(val.interiorFeatures) };
          if (val.garageInfo) { setGarageInfo(val.garageInfo) };
          if (val.parkingInfo) { setParkingInfo(val.parkingInfo) };
          if (val.buildingInfo) { setBuildingInfo(val.buildingInfo) };
          if (val.exteriorFeatures) { setExteriorFeatures(val.exteriorFeatures) };
          if (val.poolInfo) { setPoolInfo(val.poolInfo) };
          if (val.utilityInfo) { setUtilityInfo(val.utilityInfo) };
          if (val.heatCool) { setHeatCool(val.heatCool) };
          if (val.lotInfo) { setLotInfo(val.lotInfo) };
          if (val.propInfo) { setPropInfo(val.propInfo) };
          if (val.disclosures) { setDisclosures(val.disclosures) };

        })
    }
  }, [])

  // const sleep = (milliseconds) => {
  //   return new Promise(resolve => setTimeout(resolve, milliseconds))
  // }

  function uploadMultipleFiles(e) {
    let tempFileObjs = [];
    setFileObj([]);
    setFileArray([]);
    // setFile([null]);
    // console.log(e.target.files);
    tempFileObjs.push(e.target.files);
    // setFileObj(oldArray => [...oldArray, e.target.files]);
    setFileObj(tempFileObjs);
    // console.log(fileObj);
    let tempFileArray = [];
    let imgLen = Object.keys(images).length;
    let vidLen = Object.keys(videos).length;
    for (let i = 0; i < tempFileObjs[0].length; i++) {
      let f = tempFileObjs[0][i];
      if (f.type.match('image.*')) {
        uploadImage(f, imgLen + i);
      }
      if (f.type.match('video.*')) {
        uploadVideo(f, vidLen + i);
      }
      // await sleep(500);
      let fileURL = URL.createObjectURL(f);
      // fileArray.push(URL.createObjectURL(fileObj[0][i]));
      f.fileURL = fileURL;
      tempFileArray.push(f);
      // setFileArray(oldArray => [...oldArray, f]);
      // setFileArray(fileArray);
    }
    setFileArray(tempFileArray);
    setFile(tempFileArray);
  }

  function uploadFiles(e) {
    e.preventDefault();
    console.log(file);
    console.log(images);
  }

  const uploadVideo = (videoFile, i = 0) => {
    if (videoFile == null)
      return;
    storage.ref(`/videos/${videoFile.name}`).put(videoFile)
      .on(
        "STATE_CHANGED",
        (snapshot) => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast(`${videoFile} videoFile is Uploading: Please Wait`, { type: "warning", toastId: "1", });
          if (progress === 100) {
            toast.update("1", {
              render: `${videoFile.name} videoFile Upload Done`,
              type: "success",
              autoClose: 5000
            });
          }
        },
        (error) => {
          console.log(error);
          toast(error, { type: "error" })
        },
        () => {
          storage
            .ref("videos")
            .child(videoFile.name)
            .getDownloadURL()
            .then((url) => {
              // setVideoURL(url);
              let tempVideos = videos;
              tempVideos[i] = { "name": videoFile.name, "url": url };
              // console.log(tempVideos);
              setVideos(tempVideos);
              forceUpdate();
            });
        }
      );
  }

  async function uploadImage(imageFile, i = 0) {
    try {
      const compressedFile1 = await imageCompression(imageFile, imageConfig);

      uploadToServer(compressedFile1, i); // write your own logic

      function uploadToServer(compressedFile, i = 0) {
        const imageOne = compressedFile;
        setImageOneName(imageOne.name);
        const uploadTask = storage.ref(`images/${imageOne.name}`).put(imageOne);
        uploadTask.on(
          "STATE_CHANGED",
          (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            toast(`${imageOne} Image is Uploading: Please Wait`, { type: "warning", toastId: "1", });
            if (progress === 100) {
              toast.update("1", {
                render: `${imageOne.name} Image Upload Done`,
                type: "success",
                autoClose: 5000
              });
            }
          },
          (error) => {
            console.log(error);
            toast(error, { type: "error" })
          },
          () => {
            storage
              .ref("images")
              .child(imageOne.name)
              .getDownloadURL()
              .then((url) => {
                let tempImages = images;
                tempImages[i] = { "name": imageOne.name, "url": url };
                // console.log(tempImages);
                setImages(tempImages);
                forceUpdate();
              });
          }
        );
      }

    } catch (error) {
      toast(error, { type: "error" })
    }
  }

  //Option values
  function handleChangeCategory(event) {
    setCategory(event.target.value);
  }

  function handleChangeState(event) {
    setSt(event.target.value);
  }

  function handleChangeStatus(event) {
    setPropertyStatus(event.target.value);
  }

  function convertPrice(event) {
    let fPrice = document.getElementById('formGridPrice');
    let fBTCPrice = document.getElementById('formGridBitcoinPrice');
    let fETHPrice = document.getElementById('formGridEthereumPrice');
    let fUSDCPrice = document.getElementById('formGridUSDCPrice');

    fBTCPrice.value = convertToBTC(fPrice.value);
    fETHPrice.value = convertToETH(fPrice.value);
    fUSDCPrice.value = convertToUSDC(fPrice.value);

    setPrice(Number(event.target.value));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProperty = {
      name: name,
      email: email,
      sellerName: sellerName,
      sellerEmail: sellerEmail,
      sellerPhone: sellerPhone,
      category: category,
      propertyStatus: propertyStatus,
      address: address,
      address2: address2,
      city: city,
      state: st,
      zip: zip,
      title: title,
      price: price,
      // per_night: per_night,
      // per_week: per_week,
      // per_month: per_month,
      // per_year: per_year,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      fullBathrooms: fullBathrooms,
      partialBathrooms: partialBathrooms,
      about: about,
      userUid: userUid,
      imageOneName: imageOneName,
      imageTwoName: imageTwoName,
      imageThreeName: imageThreeName,
      imageFourName: imageFourName,
      imageOneURL: imageOneURL,
      imageTwoURL: imageTwoURL,
      imageThreeURL: imageThreeURL,
      imageFourURL: imageFourURL,
      images: images,
      videos: videos,

      matterportUrl: matterportUrl,
      taxInfo: taxInfo,
      hoaInfo: hoaInfo,
      otherHoaFeeInfo: otherHoaFeeInfo,
      commInfo: commInfo,
      equipment: equipment,
      interiorFeatures: interiorFeatures,
      garageInfo: garageInfo,
      parkingInfo: parkingInfo,
      buildingInfo: buildingInfo,
      exteriorFeatures: exteriorFeatures,
      poolInfo: poolInfo,
      utilityInfo: utilityInfo,
      heatCool: heatCool,
      lotInfo: lotInfo,
      propInfo: propInfo,
      disclosures: disclosures
    }

    const fullAddress = `${address}, ${address2} ${city}, ${st} ${zip}`;
    // console.log(fullAddress);

    // Get latitude & longitude from address.
    await Geocode.fromAddress(fullAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        // console.log(lat, lng);
        newProperty.lat = lat;
        newProperty.lng = lng;
      },
      (error) => {
        console.error(error);
      }
    );

    if (propertyKey) {
      database.ref("properties").child(propertyKey).update(newProperty);
      toast("Updated Successfully", { type: "success" });
    } else {
      let newPostKey = database.ref("properties").push(newProperty).key;
      setPropertyKey(newPostKey);
      toast("Posted Successfully", { type: "success" });
    }
    setSubmit("Submitted");
  };

  //Redirect after form submission
  if (submit === "Submitted") {
    return (
      <>
        <Redirect to={{
          pathname: '/done-posting-home',
          state: { propertyKey: propertyKey }
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

      <Navbar />

      {/* Post form */}
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

        {/* <Card.Header className="h3">   
        Become a Host
        </Card.Header> */}

        <Card.Body className="container">

          <h2 className="mt-3">General Details</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Row>
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
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridSellerName">
                <Form.Label>Seller Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Seller Name"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSellerEmail">
                <Form.Label>Seller E-mail</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  value={sellerEmail}
                  onChange={(e) => setSellerEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSellerPhone">
                <Form.Label>Seller Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="1234567890"
                  // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  value={sellerPhone}
                  onChange={(e) => setSellerPhone(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label>Property Type</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={category}
                  onChange={handleChangeCategory}
                >
                  <option>Select</option>
                  <option value="Condos">Condo</option>
                  <option value="House">House</option>
                  <option value="Townhouse">Townhouse</option>
                  <option value="Land">Land</option>
                  <option value="Multi-Family">Muli-Family</option>
                  <option value="Co-op">Co-op</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group
                as={Col}
                lg={6}
                md={6}
                sm={12}
                controlId="formGridAddress1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="1234 Main St"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required />
              </Form.Group>

              <Form.Group
                as={Col}
                lg={6}
                md={6}
                sm={12}
                controlId="formGridAddress2">
                <Form.Label>Address 2</Form.Label>
                <Form.Control
                  placeholder="Apt/Unit #"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group
                as={Col}
                lg={6}
                md={6}
                sm={12}
                controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder="Orange"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required />
              </Form.Group>
              <Form.Group
                as={Col}
                lg={6}
                md={6}
                sm={12}
                controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  value={st}
                  onChange={handleChangeState}
                  required >
                  <option>Select</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Control>
              </Form.Group>

              <Form.Group
                as={Col}
                lg={6}
                md={6}
                sm={12}
                controlId="formGridZip">
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  placeholder="12345"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required />
              </Form.Group>
            </Form.Row>

            <h2 className="mt-3">Specific Details</h2>

            <h4 className="mt-3">Fiat Price</h4>
            <Form.Group controlId="formGridPrice">
              <Form.Label>US Dollar ($)</Form.Label>
              <Form.Control
                type="number"
                placeholder="1234"
                value={price}
                min="0"
                onChange={convertPrice}
                required />
            </Form.Group>

            <h4 className="mt-3">Crypto Price</h4>
            <Form.Group controlId="formGridBitcoinPrice">
              <Form.Label>Bitcoin <Icon name="btc" size={18} /></Form.Label>
              <Form.Control
                type="number"
                min="0"
                readOnly />
            </Form.Group>

            <Form.Group controlId="formGridEthereumPrice">
              <Form.Label>Ethereum <Icon name="eth" size={18} /></Form.Label>
              <Form.Control
                type="number"
                min="0"
                readOnly />
            </Form.Group>

            <Form.Group controlId="formGridUSDCPrice">
              <Form.Label>USD Coin <Icon name="usdc" size={18} /></Form.Label>
              <Form.Control
                type="number"
                min="0"
                readOnly />
            </Form.Group>

            <Form.Group controlId="formGridStatus">
              <Form.Label>Property Status</Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={propertyStatus}
                onChange={handleChangeStatus}
              >
                <option>Select</option>
                <option value="Coming Soon">Coming Soon</option>
                <option value="Active">Active</option>
                <option value="Under Contract / Pending">
                  Under Contract / Pending
                </option>
              </Form.Control>
            </Form.Group>

            <Form.Row>
              <Form.Group as={Col} lg={3} md={3} sm={12}>
                <Form.Label>Bedrooms</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Eg. 2"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  required />
              </Form.Group>
              <Form.Group as={Col} lg={3} md={3} sm={12}>
                <Form.Label>Total Bathrooms</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Eg. 1"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} lg={3} md={3} sm={12}>
                <Form.Label>Full Bathrooms</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Eg. 1"
                  value={fullBathrooms}
                  onChange={(e) => setFullBathrooms(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} lg={3} md={3} sm={12}>
                <Form.Label>Partial Bathrooms</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Eg. 1"
                  value={partialBathrooms}
                  onChange={(e) => setPartialBathrooms(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Multi-Upload Property Videos</Form.Label>
                <input type="file" className="form-control" accept="video/*" onChange={uploadMultipleFiles} multiple />
              </Form.Group>
            </Form.Row>

            {Object.keys(videos).length > 0 && (
              <>
                <Form.Label>Upload/Edit Property Videos</Form.Label>
                <br />
                <Form.Row>
                  {Object.entries(videos).map(([key, value]) => {
                    return (
                      <Col key={key} lg={3} md={3} sm={3}>
                        <Form.Group lg={3} md={3} sm={3} className="file-input">
                          <Form.Control type="file" onChange={(e) => {
                            const videoFile = e.target.files[0];
                            uploadVideo(videoFile, key);
                          }} />
                          <span className='button'>{`Reupload Video ${Number(key) + 1}`}</span>
                        </Form.Group>
                        <video className="VideoInput_video d-block w-100 img-thumbnail" controls src={value.url} />
                        <span className='label' data-js-label>{value.name ? value.name.slice(0, 17) : 'No file selected'}</span>
                        <br />
                        <Button
                          variant="danger"
                          onClick={() => {
                            let videosCopy = { ...images };
                            let lastIndex = Object.keys(videosCopy).length - 1;
                            delete videosCopy[key];
                            if (Number(key) !== lastIndex) {
                              for (let i = Number(key); i < Object.keys(videosCopy).length; i++) {
                                if (videosCopy[i+1]) {
                                  videosCopy[i] = videosCopy[i+1];
                                }
                              }
                              delete videosCopy[Object.keys(videosCopy).length - 1];
                            }
                            setVideos(videosCopy);
                          }}
                        >{`Delete Video ${Number(key) + 1}`}</Button>
                      </Col>
                    )
                  })}
                </Form.Row>
              </>
            )}

            <br />

            <Form.Row>
              {/* <a href="#" onClick={uploadFiles}>test</a> */}
              <Form.Group as={Col}>
                <Form.Label>Multi-Upload Property Images</Form.Label>
                <input type="file" accept="image/*" className="form-control" onChange={uploadMultipleFiles} multiple />
              </Form.Group>
            </Form.Row>

            {Object.keys(images).length > 0 && (
              <>
                <Form.Label>Upload/Edit Property Images</Form.Label>
                <br />
                <Form.Row>
                  {Object.entries(images).map(([key, value]) => {
                    return (
                      <Col key={key} lg={3} md={3} sm={3} className="py-1">
                        <Form.Group lg={3} md={3} sm={3} className="file-input">
                          <Form.Control type="file" onChange={(e) => {
                            const imageFile = e.target.files[0];
                            uploadImage(imageFile, key);
                          }} />
                          <span className='button'>{`Reupload Image ${Number(key) + 1}`}</span>
                        </Form.Group>
                        <img className="d-block w-100 img-thumbnail" src={value.url} alt="" />
                        <span className='label' data-js-label>{value.name ? value.name.slice(0, 17) : 'No file selected'}</span>
                        <br />
                        <Button
                          variant="danger"
                          onClick={() => {
                            let imagesCopy = { ...images };
                            let lastIndex = Object.keys(imagesCopy).length - 1;
                            delete imagesCopy[key];
                            if (Number(key) !== lastIndex) {
                              for (let i = Number(key); i < Object.keys(imagesCopy).length; i++) {
                                if (imagesCopy[i+1]) {
                                  imagesCopy[i] = imagesCopy[i+1];
                                }
                              }
                              delete imagesCopy[Object.keys(imagesCopy).length - 1];
                            }
                            setImages(imagesCopy);
                          }}
                        >{`Delete Image ${Number(key) + 1}`}</Button>
                      </Col>
                    )
                  })}
                </Form.Row>
              </>
            )}

            <br />

            <Form.Group controlId="formGridAbout">
              <Form.Label>About this listing</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formGridMatterportUrl">
              <Form.Label>Matterport URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg. https://my.matterport.com/show/?m=ZfiWvRD4CaW"
                value={matterportUrl}
                onChange={(e) => setMatterportUrl(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formGridHoaInfo">
              <Form.Label>HOA Information</Form.Label>
              {
                hoaInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`hoaInfo${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...hoaInfo];
                          newFormValues[index] = e.target.value;
                          setHoaInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...hoaInfo];
                          newFormValues.splice(index, 1);
                          setHoaInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setHoaInfo([...hoaInfo, ""]);
                  }}>Add HOA info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridOtherHoaInfo">
              <Form.Label>Other HOA Fee Information</Form.Label>
              {
                otherHoaFeeInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`otherHoaFeeInfo${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...otherHoaFeeInfo];
                          newFormValues[index] = e.target.value;
                          setOtherHoaFeeInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...otherHoaFeeInfo];
                          newFormValues.splice(index, 1);
                          setOtherHoaFeeInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setOtherHoaFeeInfo([...otherHoaFeeInfo, ""]);
                  }}>Add HOA Fee info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridTaxInfo">
              <Form.Label>Tax Information</Form.Label>
              {
                taxInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`taxInfo${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...taxInfo];
                          newFormValues[index] = e.target.value;
                          setTaxInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...taxInfo];
                          newFormValues.splice(index, 1);
                          setTaxInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setTaxInfo([...taxInfo, ""]);
                  }}>Add Tax info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridCommInfo">
              <Form.Label>Community Information</Form.Label>
              {
                commInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`commInfo${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...commInfo];
                          newFormValues[index] = e.target.value;
                          setCommInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...commInfo];
                          newFormValues.splice(index, 1);
                          setCommInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setCommInfo([...commInfo, ""]);
                  }}>Add Community info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridEquipment">
              <Form.Label>Equipment</Form.Label>
              {
                equipment.map((equip, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`equipment${index}`}>
                      <Form.Control
                        type="text"
                        value={equip || ""}
                        onChange={(e) => {
                          let newFormValues = [...equipment];
                          newFormValues[index] = e.target.value;
                          setEquipment(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...equipment];
                          newFormValues.splice(index, 1);
                          setEquipment(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setEquipment([...equipment, ""]);
                  }}>Add Equipment info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridInteriorFeatures">
              <Form.Label>Interior Features</Form.Label>
              {
                interiorFeatures.map((feature, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`Interior${index}`}>
                      <Form.Control
                        type="text"
                        value={feature || ""}
                        onChange={(e) => {
                          let newFormValues = [...interiorFeatures];
                          newFormValues[index] = e.target.value;
                          setInteriorFeatures(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...interiorFeatures];
                          newFormValues.splice(index, 1);
                          setInteriorFeatures(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setInteriorFeatures([...interiorFeatures, ""]);
                  }}>Add Interior Feature</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridGarageInfo">
              <Form.Label>Garage/Carport Information</Form.Label>
              {
                garageInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`garage${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...garageInfo];
                          newFormValues[index] = e.target.value;
                          setGarageInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...garageInfo];
                          newFormValues.splice(index, 1);
                          setGarageInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setGarageInfo([...garageInfo, ""]);
                  }}>Add Garage/Carport info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridParkingInfo">
              <Form.Label>Parking</Form.Label>
              {
                parkingInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`Parking${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...parkingInfo];
                          newFormValues[index] = e.target.value;
                          setParkingInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...parkingInfo];
                          newFormValues.splice(index, 1);
                          setParkingInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setParkingInfo([...parkingInfo, ""]);
                  }}>Add Parking info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridBuildingInfo">
              <Form.Label>Building Information</Form.Label>
              {
                buildingInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`Building${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...buildingInfo];
                          newFormValues[index] = e.target.value;
                          setBuildingInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...buildingInfo];
                          newFormValues.splice(index, 1);
                          setBuildingInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setBuildingInfo([...buildingInfo, ""]);
                  }}>Add Building info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridExteriorFeatures">
              <Form.Label>Exterior Features</Form.Label>
              {
                exteriorFeatures.map((feature, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`Exterior${index}`}>
                      <Form.Control
                        type="text"
                        value={feature || ""}
                        onChange={(e) => {
                          let newFormValues = [...exteriorFeatures];
                          newFormValues[index] = e.target.value;
                          setExteriorFeatures(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...exteriorFeatures];
                          newFormValues.splice(index, 1);
                          setExteriorFeatures(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setExteriorFeatures([...exteriorFeatures, ""]);
                  }}>Add Exterior Feature</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridGPooleInfo">
              <Form.Label>Pool Information</Form.Label>
              {
                poolInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`pool${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...poolInfo];
                          newFormValues[index] = e.target.value;
                          setPoolInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...poolInfo];
                          newFormValues.splice(index, 1);
                          setPoolInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setPoolInfo([...poolInfo, ""]);
                  }}>Add Pool info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridUtilityInfo">
              <Form.Label>Utility Information</Form.Label>
              {
                utilityInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`utility${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...utilityInfo];
                          newFormValues[index] = e.target.value;
                          setUtilityInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...utilityInfo];
                          newFormValues.splice(index, 1);
                          setUtilityInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setUtilityInfo([...utilityInfo, ""]);
                  }}>Add Utility info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridHeatCool">
              <Form.Label>Heating & Cooling Information</Form.Label>
              {
                heatCool.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`heatCool${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...heatCool];
                          newFormValues[index] = e.target.value;
                          setHeatCool(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...heatCool];
                          newFormValues.splice(index, 1);
                          setHeatCool(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setHeatCool([...heatCool, ""]);
                  }}>Add Heating & Cooling info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridLotInfo">
              <Form.Label>Lot Information</Form.Label>
              {
                lotInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`lotInfo${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...lotInfo];
                          newFormValues[index] = e.target.value;
                          setLotInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...lotInfo];
                          newFormValues.splice(index, 1);
                          setLotInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setLotInfo([...lotInfo, ""]);
                  }}>Add Lot info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridPropInfo">
              <Form.Label>Property Information</Form.Label>
              {
                propInfo.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`PropInfo${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...propInfo];
                          newFormValues[index] = e.target.value;
                          setPropInfo(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...propInfo];
                          newFormValues.splice(index, 1);
                          setPropInfo(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setPropInfo([...propInfo, ""]);
                  }}>Add Property info</Button>
              </div>
            </Form.Group>
            {" "}
            <Form.Group controlId="formGridDisclosures">
              <Form.Label>Disclosure Information</Form.Label>
              {
                disclosures.map((info, index) => (
                  (index === 0 || index) ?
                    <InputGroup className="" key={`disclosures${index}`}>
                      <Form.Control
                        type="text"
                        value={info || ""}
                        onChange={(e) => {
                          let newFormValues = [...disclosures];
                          newFormValues[index] = e.target.value;
                          setDisclosures(newFormValues);
                        }}
                      />
                      <Button
                        variant="outline-secondary"
                        type="button"
                        className="button remove"
                        onClick={() => {
                          let newFormValues = [...disclosures];
                          newFormValues.splice(index, 1);
                          setDisclosures(newFormValues);
                        }}>Remove</Button>
                    </InputGroup>
                    : null
                ))
              }
              &nbsp;
              <div className="button-section">
                <Button
                  variant="outline-secondary"
                  className="button add"
                  type="button"
                  onClick={() => {
                    setDisclosures([...disclosures, ""]);
                  }}>Add Disclosure info</Button>
              </div>
            </Form.Group>
            {" "}
            <Button variant="primary" className="btn btn-block" type="submit">
              Post My Property
            </Button>
            <br />
            <br />
          </Form>
        </Card.Body>
      </Card >
    </div >
  );
}
