import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './assets/scss/app.css';

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
import ManagedProperty from './pages/ManagedProperty'
import SuccessfulBooking from './pages/SuccessfulBooking'
import MyBookings from './pages/MyBookings';
import MyHomeBookings from './pages/MyHomeBookings';
import Listings from './pages/Listings';
import ManagedListings from './pages/ManagedListings';
import Condos from './pages/Condos';
import SingleFamily from './pages/SingleFamily';
import LuxuryResidences from './pages/LuxuryResidences';
import ScrollToTop from './Components/ScrollToTop';
import PublicProfilePage from './pages/PublicProfilePage';
import Blog from './pages/Blog';
import Article from './pages/Article';
import AboutPage from './pages/AboutPage';
import ArticleEdit from './pages/ArticleEdit';

/**
 * New
 */
import NewHome from './pages/new/Home';
import NewBlog from './pages/new/Blog';
import NewPropertyDetail from './pages/new/PropertyDetail'
import NewCatalog from './pages/new/Catalog'

/**
 * @type {JSX.Element}
 */
const routing = (
    <Router>
        <ScrollToTop />
        <Route exact path="/" component={App} />

        {/*New pages*/}
        <Route exact path="/new/" component={NewHome} />
        <Route exact path="/new/blog" component={NewBlog} />
        <Route exact path="/new/listings" component={NewCatalog} />
        <Route exact path="/new/property/:propertyKey" component={NewPropertyDetail} />

        <Route exact path="/blog" component={Blog} />
        <Route exact path="/article/edit" component={ArticleEdit} />
        <Route exact path="/article/edit/:articleKey" component={ArticleEdit} />
        <Route exact path="/article/:articleKey" component={Article} />
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
        <Route exact path="/managed-property/:propertyKey" component={ManagedProperty} />
        <Route exact path="/done-booking" component={SuccessfulBooking} />
        <Route exact path="/my-bookings" component={MyBookings} />
        <Route exact path="/my-home-bookings" component={MyHomeBookings} />
        <Route exact path="/listings" component={Listings} />
        <Route exact path="/managed-listings" component={ManagedListings} />
        <Route exact path="/condos" component={Condos} />
        <Route exact path="/single-family" component={SingleFamily} />
        <Route exact path="/luxury-residences" component={LuxuryResidences} />
        <Route exact path="/find-roommates" component={PublicProfilePage} />
        <Route exact path="/about" component={AboutPage} />
    </Router>
)

ReactDOM.render(routing,
    document.getElementById('root')
);

reportWebVitals();
