import React from "react";
import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap(props) {
  const lat = Number(props.lat);
  const lng = Number(props.lng);
  
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
        {/* <AnyReactComponent
          lat={26.003570}
          lng={-80.353600}
        /> */}
      </GoogleMapReact>
    </div>
  );
}