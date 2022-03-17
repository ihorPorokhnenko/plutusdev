import React from "react";
import GoogleMapReact from 'google-map-react';

// InfoWindow component
const InfoWindow = (props) => {
  const { address } = props;
  const infoWindowStyle = {
    position: 'relative',
    bottom: 90,
    left: '-80px',
    width: 220,
    backgroundColor: 'white',
    boxShadow: '0 2px 7px 1px rgba(0, 0, 0, 0.3)',
    padding: 10,
    fontSize: 14,
  };

  return (
    <div style={infoWindowStyle}>
      <div style={{ fontSize: 16 }}>
        {address}
      </div>
    </div>
  );
};

// Marker component
const Marker = ({ address }) => {
  const markerStyle = {
    border: '1px solid white',
    borderRadius: '50%',
    height: 20,
    width: 20,
    backgroundColor: 'red',
    cursor: 'pointer',
    zIndex: 10,
  };

  return (
    <>
      <div style={markerStyle} />
      <InfoWindow address={address} />
    </>
  );
};

export default function SimpleMap(props) {
  const lat = Number(props.lat);
  const lng = Number(props.lng);
  const address = props.address;

  const defaultProps = {
    center: {
      lat: lat, //26.003570,
      lng: lng //-80.353600
    },
    zoom: 11
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCDcytsmCXOAZRpIiWX7jhR5dIQ9Mhzkeo" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <Marker
          lat={defaultProps.center.lat}
          lng={defaultProps.center.lng}
          address={address}
        />
      </GoogleMapReact>
    </div>
  );
}