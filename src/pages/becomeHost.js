import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Protect from 'react-app-protect'
import { Form, Col, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { Redirect } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Components/navbar";
import { database, storage, googleApiKey } from "../config";
import firebase from 'firebase'
import imageCompression from 'browser-image-compression';
import { imageConfig } from '../utils/imageConfig'
import { hash } from '../utils/hash';
import Geocode from "react-geocode";


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

  const [fileObj, setFileObj] = useState([]);
  const [fileArray, setFileArray] = useState([]);
  const [file, setFile] = useState([null]);

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
    for (let i = 0; i < tempFileObjs[0].length; i++) {
      let f = tempFileObjs[0][i];
      uploadImage(f, i);
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

    fBTCPrice.value = Number(fPrice.value) * 0.00002356;
    fETHPrice.value = Number(fPrice.value) * 0.00033269;
    fUSDCPrice.value = Number(fPrice.value) * 0.99990054;

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
      images: images
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
      database.ref("properties").push(newProperty);
      toast("Posted Successfully", { type: "success" });
    }
    setSubmit("Submitted");
  };

  //Redirect after form submission
  if (submit === "Submitted") {
    return (
      <>
        <Redirect to="/done-posting-home" />
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
    <Protect
      sha512={hash}
      styles={{
        input: { color: 'blue' },
        header: { fontSize: '20px' }
      }}
    >
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
                <Form.Label>Bitcoin</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  readOnly />
              </Form.Group>

              <Form.Group controlId="formGridEthereumPrice">
                <Form.Label>Ethereum</Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  readOnly />
              </Form.Group>

              <Form.Group controlId="formGridUSDCPrice">
                <Form.Label>USD Coin</Form.Label>
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
                <Form.Group as={Col} lg={6} md={6} sm={12}>
                  <Form.Label>Bedrooms</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Eg. 2"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    required />
                </Form.Group>
                <Form.Group as={Col} lg={6} md={6} sm={12}>
                  <Form.Label>Bathrooms</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Eg. 1"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    required />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                {/* <a href="#" onClick={uploadFiles}>test</a> */}
                <Form.Group as={Col}>
                  <Form.Label>Multi-Upload Property Images</Form.Label>
                  <input type="file" className="form-control" onChange={uploadMultipleFiles} multiple />
                </Form.Group>
              </Form.Row>

              {Object.keys(images).length > 0 ? (
                <>
                  <Form.Label>Upload/Edit Property Images</Form.Label>
                  <br />
                  <Form.Row>
                    {Object.entries(images).map(([key, value]) => {
                      return (
                        <Form.Group key={key} as={Col} lg={3} md={3} sm={3} className="file-input">
                          <Form.Control type="file" onChange={(e) => {
                            const imageFile = e.target.files[0];
                            uploadImage(imageFile, key);
                          }} />
                          <span className='button'>{`Upload/Edit Property Image ${Number(key) + 1}`}</span>
                          <img className="d-block w-100 img-thumbnail" src={value.url} alt="" />
                          <span className='label' data-js-label>{value.name ? value.name.slice(0, 17) : 'No file selected'}</span>
                        </Form.Group>
                      )
                    })}
                  </Form.Row>
                </>
              ) : ''}

              <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>About this listing</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" className="btn btn-block" type="submit">
                Post My Property
              </Button>
              <br />
              <br />
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Protect>
  );
}
