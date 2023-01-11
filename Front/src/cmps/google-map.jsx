import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{fontSize: '2.5rem'}}>{text}</div>;
const Loc1 = ({ text }) => <div style={{fontSize: '2.5rem'}}>{text}</div>
const Loc2 = ({ text }) => <div style={{fontSize: '2.5rem'}}>{text}</div>
const Loc3 = ({ text }) => <div style={{fontSize: '2.5rem'}}>{text}</div>

export function GoogleMap() {

    const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 9

    const handleClick = ({ lat, lng }) => {
        setCoordinates({ lat, lng })
    }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '40vh', width: '40%', margin: 'auto' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "AIzaSyBlbVbvWFhmMwFiVvbSeax1Af8UpghJ6CY" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    // lat={coordinates.lat}
                    // lng={coordinates.lng}
                    {...coordinates}
                    text="🧸"
                />
                <Loc1
                    lat={32.3853}
                    lng={34.8818}
                    text="📍"
                />
                <Loc2
                    lat={32.2853}
                    lng={34.9818}
                    text="📍"
                />
                <Loc3
                    lat={32.1853}
                    lng={34.7818}
                    text="📍"
                />
            </GoogleMapReact>
        </div>
    );
}