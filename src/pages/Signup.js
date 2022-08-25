import React,{useEffect, useContext, useRef} from 'react'
import {Redirect} from 'react-router-dom'
import firebase from 'firebase'
import {UserContext} from '../context/UserContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleButton from 'react-google-button'
import Navbar from '../Components/navbar'
import Footer from '../Components/Footer'

export default function Signup() {

const context = useContext(UserContext);

const footerRef = useRef(null)

var provider = new firebase.auth.GoogleAuthProvider();

const googleAuth = () => {
   firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    // var credential = result.credential;
    // var token = credential.accessToken;
    // The signed-in user info.
    // var Signeduser = result.user;
    toast(`Welcome ${result.user.displayName}`,{type: "success"})
  }).catch((error) => {
    // Handle Errors here.
    // var errorCode = error.code;
    var errorMessage = error.message;
    // var email = error.email;
    // var credential = error.credential;
    toast(errorMessage, { type: "error"});
    // ...
  });
}

useEffect(() => {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      context.setUser({email: user.email, uid: user.uid})
    }
  });
}, [])


  if (context === undefined || context.user == null) {
    return (
      <div>
      <ToastContainer/>
      <ToastContainer/>
      <Navbar footerRef={footerRef} />
      <GoogleButton className="align-self-center mx-auto auth-btn" onClick={googleAuth}/>
      <Footer ref={footerRef} />
      </div>
  )
  } else {
    return (
      <Redirect to="/home" />
  )
    
  }
   
}
