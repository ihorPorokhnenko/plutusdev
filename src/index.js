import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './fonts/Comfortaa/Comfortaa-Regular.ttf';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import becomeHost from './pages/becomeHost';
import Signup from './pages/Signup'
// import Home from './pages/Home'
import ComingSoon from './pages/ComingSoon'
import SuccessfulPosting from './pages/SuccessfulPosting'
import SuccessfulWaitlisting from './pages/SuccessfulWaitlisting'
import MyProfile from './pages/MyProfile'
import CreateProfile from './pages/CreateProfile'
import SingleProperty from './pages/SinglePropertyPage'
import SuccessfulBooking from './pages/SuccessfulBooking'
import MyBookings from './pages/MyBookings';
import MyHomeBookings from './pages/MyHomeBookings';
import Listings from './pages/Listings';
import Condos from './pages/Condos';
import SingleFamily from './pages/SingleFamily';
import LuxuryResidences from './pages/LuxuryResidences';
import ScrollToTop from './Components/ScrollToTop';
import PublicProfilePage from './pages/PublicProfilePage';
import Blog from './pages/Blog';


const routing = (
  <Router>
    <ScrollToTop />
    <Route exact path="/" component={App} />
    <Route exact path="/blog" component={Blog} />
    <Route exact path="/coming-soon" component={ComingSoon} />
    <Route exact path="/become-host" component={becomeHost} />
    <Route exact path="/become-host/:propertyKey" component={becomeHost} />
    <Route exact path="/signup" component={Signup} />
    {/* <Route exact path="/home" component={Home} /> */}
    <Route exact path="/done-posting-home" render={(props) => <SuccessfulPosting {...props} />} />
    <Route exact path="/done-waitlisting" component={SuccessfulWaitlisting} />
    <Route exact path="/my-profile" component={MyProfile} />
    <Route exact path="/create-profile" component={CreateProfile} />
    <Route exact path="/property/:propertyKey" component={SingleProperty} />
    <Route exact path="/done-booking" component={SuccessfulBooking} />
    <Route exact path="/my-bookings" component={MyBookings} />
    <Route exact path="/my-home-bookings" component={MyHomeBookings} />
    <Route exact path="/listings" component={Listings} />
    <Route exact path="/condos" component={Condos} />
    <Route exact path="/single-family" component={SingleFamily} />
    <Route exact path="/luxury-residences" component={LuxuryResidences} />
    <Route exact path="/find-roommates" component={PublicProfilePage} />
  </Router>
)

ReactDOM.render(routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
