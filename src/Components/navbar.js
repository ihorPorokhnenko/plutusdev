import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import firebase from 'firebase'
import { Container } from 'react-bootstrap';
import logo from '../pictures/handover_67751335/PLUTUS-PROPERTIES-BLACK-VERSION.png'
import Web3 from "web3";

export default function NavigationBar({ footerRef, companyName = "Plutus" }) {

  //Authstate
  const [authState, setAuthState] = useState(null);
  //Transparent scroll navbar state
  const [pos, setPos] = useState("top")
  //Metamask connect status
  const [connectStatus, setConnectStatus] = useState(false);
  const [connectAccount, setConnectAccount] = useState("");

  const scrollToBottom = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    var path = window.location.pathname

    if (path === "/home") {
      document.addEventListener("scroll", e => {
        let scrolled = document.scrollingElement.scrollTop;

        if (scrolled >= 5) {
          setPos("moved")
        } else {
          setPos("top")
        }
      })
    } else {
      setPos("moved")
    }
    // assignDrpdownAlign(); // calling function on load
  }, [])

  // window.addEventListener('resize', () => {
  //   assignDrpdownAlign(); // calling function on resize
  // });

  async function alignMenu() {
    await new Promise(r => setTimeout(r, 0.01));
    let nav = document.querySelector("#basic-navbar-nav");
    let elem = document.querySelector('.align-toggle');
    let elemMenu;
    if (elem && elem.childNodes && elem.childNodes.length > 1) {
      elemMenu = elem.childNodes[1].classList;

      if (nav.classList.contains('show')) {
        if (window.innerWidth > 991) {
          elemMenu.remove('dropdown-menu-left');
          elemMenu.add('dropdown-menu-right');
        } else {
          elemMenu.remove('dropdown-menu-right');
          elemMenu.add('dropdown-menu-left');
        }
      } else {
        elemMenu.remove('dropdown-menu-left');
        elemMenu.add('dropdown-menu-right');
      }
    }
  }

  function assignDrpdownAlign() {
    let elem = document.querySelector('.align-toggle').childNodes[1];
    if (typeof elem !== 'undefined') {
      alignMenu();
    }
  }

  const onClickConnect = async () => {
    try {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
    } catch (error) {
      console.error(error)
    }
  }

  const checkConnection = async () => {
    // Check if browser is running Metamask
    let web3;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    };

    // Check if User is already connected by retrieving the accounts
    web3.eth.getAccounts()
      .then(async function (metaMaskAccounts) {
        let splitedMetaMaskAddress;
        if (typeof metaMaskAccounts !== 'undefined' && metaMaskAccounts.length > 0) {
          splitedMetaMaskAddress =
            metaMaskAccounts[0].substring(0, 6) +
            "......" +
            metaMaskAccounts[0].substring(
              metaMaskAccounts[0].length - 4,
              metaMaskAccounts[0].length
            );
          // Set User account into state
          setConnectStatus(true);
          setConnectAccount(splitedMetaMaskAddress);
        } else {
          setConnectStatus(false);
          setConnectAccount('');
        }
      })
      .catch(function (err) {
        setConnectStatus(false);
        setConnectAccount('');
        console.err(err);
      });
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        setAuthState(false)
      } else {
        setAuthState(true)
      }
    });

    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        checkConnection()
      })
      window.ethereum.on('accountsChanged', () => {
        checkConnection()
      })
    }
    checkConnection()
  }, [])

  //signout function
  const Logout = () => {
    firebase.auth().signOut().then(() => {
      <Redirect to="/" />
    })
      .catch((error) => {
        toast(error, { type: "error" })
      })
  }

  return (
    <>
      <Navbar expand="lg" className="navbar"
        style={{ backgroundColor: pos === "top" ? "" : "rgb(227, 239, 240)" }}
      >
          <Navbar.Brand href="/" className={pos === "top" ? "text-light brand-name" : "text-dark brand-name"}>
            <img
              src={logo}
              width="175"
              height="60"
              // className="d-inline-block align-top"
              alt={companyName}
            />
          </Navbar.Brand>
        <Navbar.Toggle className="ml-auto" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"
              className={pos === "top" ? "text-light" : "text-dark"}
            >Home</Nav.Link>
            {/* {authState ? ( */}
              <Nav.Link as={Link} to="/listings"
                className={pos === "top" ? "text-light" : "text-dark"}
              >Properties</Nav.Link>
              {/* <Nav.Link as={Link} to="/managed-listings"
                className={pos === "top" ? "text-light" : "text-dark"}
              >Stakeable Properties</Nav.Link> */}
              <Nav.Link as={Link} to="/blog"
                className={pos === "top" ? "text-light" : "text-dark"}
              >Blog</Nav.Link>
              <Nav.Link as={Link} to="/about"
                className={pos === "top" ? "text-light" : "text-dark"}
              >About Us</Nav.Link>
              <Nav.Link as={Link} to="#footer"
                className={pos === "top" ? "text-light" : "text-dark"} onClick={scrollToBottom}
              >Contact Us</Nav.Link>
            {/* ):""} */}
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {/* <Navbar.Text>
              <Button id="connectButton" variant="outline-dark" disabled={connectStatus} onClick={onClickConnect} >{connectAccount ? connectAccount : 'Connect wallet'}</Button>
            </Navbar.Text>
            {" "} */}
            &nbsp;
            {/* {authState ? ( */}
              <Navbar.Text>
                <Link to="/become-host"><Button className="host-btn" variant="outline-primary">List a Property</Button></Link>
              </Navbar.Text>
              {" "}
              &nbsp;
              <Nav.Link as={Link} to="/signup" className='login'>Login/Signup</Nav.Link>
            {/* ):""} */}
          </Navbar.Collapse>
          <NavDropdown alignRight title={<FontAwesomeIcon icon={faUserCircle} size="lg"
            className={pos === "top" ? "text-light dropdown-menu-bar" : "text-dark dropdown-menu-bar"} />} className=" align-toggle" onClick={alignMenu} >
            {authState ? (
              <>
                <Container className="menu-container">
                  <Nav.Link as={Link} to="/my-profile" className="text-dark">My Profile</Nav.Link>
                  {/* <Nav.Link as={Link} to="/my-bookings" className="text-dark">Bookings</Nav.Link>
                  <Nav.Link as={Link} to="/my-home-bookings" className="text-dark">Host Bookings</Nav.Link> */}
                </Container>
              </>
            ) : (
              <>
                <NavDropdown.Item><Nav.Link as={Link} to="/">Login</Nav.Link></NavDropdown.Item>
                <NavDropdown.Item><Nav.Link as={Link} to="/signup">Signup</Nav.Link></NavDropdown.Item>
                <NavDropdown.Divider />
              </>
            )}
            {authState ? (
              <>
                <NavDropdown.Item><Button className="btn btn-danger" onClick={Logout}>Logout</Button></NavDropdown.Item>
              </>
            ) : ""}
          </NavDropdown>
        </Navbar.Collapse>
        {/* Error toast */}
        <ToastContainer />

      </Navbar>
      {/* <div className="announcement">
        <div className="alert alert-success alert-dismissible announcement" role="alert">
          <div><b>Demo mode enabled, site features may not work as intended</b></div>
        </div>
      </div> */}
    </>
  )
}
