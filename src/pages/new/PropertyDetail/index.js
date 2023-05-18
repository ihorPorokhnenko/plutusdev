import React, {useRef, useState} from "react";
import {Col, Container, Row, Tab, Tabs} from "react-bootstrap";

/**
 * Style
 */
import '../../../assets/scss/app-new.css';

/**
 * Layout components
 */
import Navbar from "../../../Components/new/NavBar";
import Footer from '../../../Components/new/Footer';

import IconBeds from "../../../assets/images/icon-beds.svg"
import IconBaths from "../../../assets/images/icon-baths.svg"
import Icon720Sqft from "../../../assets/images/icon-720-sqft.svg"
import IconSingleFamily from "../../../assets/images/icon-single-family.svg"

/**
 * @param match
 * @returns {JSX.Element}
 * @constructor
 */
export default function Index({match}) {
    const footerRef = useRef(null);

    const [servicesTab, setServiceTab] = useState('service-overview');
    const [detailsTab, setDetailsTabs] = useState('details');

    const servicesTabs = [
        {
            key: 'service-overview',
            label: 'Overview'
        },
        {
            key: 'service-insights',
            label: 'Insights'
        },
        {
            key: 'service-location',
            label: 'Location'
        },
        {
            key: 'service-virtual-tour',
            label: 'Virtual Tour'
        },
        {
            key: 'service-taxes-only',
            label: 'Taxes only'
        },
        {
            key: 'service-blueprints',
            label: 'Blueprints'
        },
        {
            key: 'service-parking-garage',
            label: 'Parking / garage'
        },
        {
            key: 'service-exterior-features',
            label: 'Exterior Features'
        },
        {
            key: 'service-utilities',
            label: 'Utilities'
        },
        {
            key: 'service-lot-details',
            label: 'Lot Details'
        },
        {
            key: 'service-nft',
            label: "NFT'z"
        },
    ];

    const detailsTabs = [
        {
            key: 'details',
            label: 'Details'
        },
        {
            key: 'details-financials',
            label: 'Financials'
        },
        {
            key: 'details-documents',
            label: 'Documents'
        },
        {
            key: 'details-buying-process',
            label: 'Buying Process'
        },
        {
            key: 'details-market',
            label: 'Market'
        },
        {
            key: 'details-estimated-roi',
            label: 'Estimated ROI'
        }
    ];

    return (
        <>
            <Navbar footerRef={footerRef} />

            <header className="page-header">
            </header>

            <Container fluid className="page-body">
                <Row>
                    <Col lg={7} md={7} sm={12} className="details-tabs">
                        <Tabs
                            activeKey={detailsTab}
                            onSelect={(t) => setDetailsTabs(t)}
                        >
                            {detailsTabs.map((tab) => (
                                <Tab key={tab.key} eventKey={tab.key} title={tab.label}>

                                    <ul className="list-inline options-cards">
                                        <li className="list-inline-item">
                                            <div className="square-block">
                                                <img src={IconBeds} alt="Beds" />
                                                <p>2 beds</p>
                                            </div>
                                        </li>
                                        <li className="list-inline-item">
                                            <div className="square-block">
                                                <img src={IconBaths} alt="Baths" />
                                                <p>3 baths</p>
                                            </div>
                                        </li>
                                        <li className="list-inline-item">
                                            <div className="square-block">
                                                <img src={Icon720Sqft} alt="720 sqft" />
                                                <p>720 sqft</p>
                                            </div>
                                        </li>
                                        <li className="list-inline-item">
                                            <div className="square-block">
                                                <img src={IconSingleFamily} alt="Single Family" />
                                                <p>Single family</p>
                                            </div>
                                        </li>
                                    </ul>


                                    <h3>About the property</h3>
                                    <ul className="list-group">
                                        <li className="list-group-item">Two - story single family home located in 105 william st</li>
                                    </ul>

                                    <h3>Details</h3>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>Fully renovated in late 2022/early 2023</span>

                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>Structral Rehabilliation of floor sytem</span>

                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>New carpeting upstairs</span>

                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>New laminate flooring Downstairs</span>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>New Painting on walls, cellings, & trim</span>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>New Light Fixtures</span>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>New blinds</span>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>Home features a newer furance & water heater, 100 amps electric panel & Ac unit</span>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <i className="custom-icon"></i>
                                            <span>The inspector has recommended to increase the closing costs by $1,000 to account for minor improvements/repairs post closing. <a href="#">See Inspection Report</a>
                                            </span>
                                        </li>
                                    </ul>

                                    <h3>Property Management & Insurance</h3>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>Manage by Evernest Property Management</span>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <i className="custom-icon"></i>
                                            <span>Insurance policy from shelter mutual insurance company will linked here once the property Closes</span>
                                        </li>
                                    </ul>

                                    <h3>Occupancy Status</h3>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>Vacant</span>
                                        </li>
                                        <li className="list-group-item d-flex">
                                            <i className="custom-icon"></i>
                                            <span>The Seller is providing a 2 month rent credit of 2,300$ at closing. Once the property is fully funded & closes, Owners will receive half of the rent credit 1,150$ to their Plutus account, based on ownership percentage. The remaining 1,150$ rent credit will be paid out daily for the following month while the property is marketed for rent
                                            </span>
                                        </li>
                                    </ul>

                                    <h3>Location Data</h3>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>1.5/5 Neighborhood Rating on <a href="#">Roofstock</a></span>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <span>C+ Rating for zip code on <a href="#">Niche</a></span>
                                        </li>
                                    </ul>

                                    <h3>Due Diligence Documents</h3>
                                    <ul className="list-group">
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <a href="#">Appraisal</a>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <a href="#">Renovations & updates</a>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <a href="#">Inspection Report</a>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <a href="#">Inspection Report Repairs</a>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <a href="#">Structural Rehabilitation of floor system</a>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <a href="#">Purchase agreement</a>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <a href="#">Operating agreement</a>
                                        </li>
                                        <li className="list-group-item">
                                            <i className="custom-icon"></i>
                                            <a href="#">View all documents</a>
                                        </li>
                                    </ul>

                                </Tab>
                            ))}
                        </Tabs>
                    </Col>
                    <Col lg={5} md={5} sm={12} className="service-tabs">
                        <Tabs
                            activeKey={servicesTab}
                            onSelect={(t) => setServiceTab(t)}
                        >
                            {servicesTabs.map((tab) => (
                                <Tab key={tab.key} eventKey={tab.key} title={tab.label}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">About this listing</h5>
                                            <p className="card-text">Code de Cavali : The house of horses</p>
                                            <p className="card-text">Stunning from the gate entrance. Driving the 1,500-foot oak tree-Lined driveway welcomes you to a beautiful 10-acre estate that was custom-built in 2004.</p>
                                            <p className="card-text">The four-bed, five-both home, which is over 5.400 square feet, has 24" Italian travertine stone throughout with Brazilian hardwoods in the bedrooms, plantation shutters, and silk drapes. The double-sided fireplace is made of Italian travertine from floor to ceiling. There's a fully equipped media room, kitchen with a DCS gas stove, 42" cherry cabinets, stainless appliances, and on extra-large island.</p>
                                            <p className="card-text">The owner suite has on outdoor terrace overlooking the back postures with a relaxing outdoor shower that can be enjoyed year-round, The screen-enclosed porch houses the outdoor kitchen and fireplace which opens to a heated saltwater pool. Detached three-cor garage and a wood born.<br />Enjoy on overwhelming sense of a private, secluded, Mediterroneon estate just 30 minutes from downtown Tampa and all of the amenities of the city of Tampa!</p>
                                        </div>
                                    </div>
                                </Tab>
                            ))}
                        </Tabs>
                    </Col>
                </Row>
            </Container>

            <Footer ref={footerRef} />
        </>
    );
}
