"use client";

import React, { useMemo, useState } from "react";
import { GoogleMap, Marker, MarkerF, Polygon, useLoadScript } from "@react-google-maps/api";
import { Coords } from "traveltime-api";
import { UpdateIcon } from "@radix-ui/react-icons";
import { stringify } from "querystring";

interface Props {
    isochrones?: Coords[][];
    parameters?: { address: string }[];
    aparmentMarkers: { lat: number; lng: number }[];
}

export const Map: React.FC<Props> = ({ aparmentMarkers, isochrones }) => {
    
    // const geocoder = new google.maps.Geocoder();
    // geocoder.geocode({  parameters }, (results, status) => {
    //   if (status === google.maps.GeocoderStatus.OK) {
    //     const lat = results![0].geometry.location.lat();
    //     const lng = results![0].geometry.location.lng();
    //     console.log(`The latitude is ${lat} and the longitude is ${lng}`);
    //   } else {
    //     console.log(`Geocoding failed with status code ${status}`);
    //   }
    // });

    // TODO: Ask Jack how best to approach this, do we make our own icons one without the price and one with?
    // The markers are classified by coordinates!
    const initialIcon = 'no prices'
    const [icon, setIcon] = useState(initialIcon)


    const showApartmentInfo = (coord: { lat: number; lng: number; }) => {

        console.log('showing apartment info')
        console.log(coord)
    }

    const zoomCheck = (zoom: number) => {
        console.log(zoom)
        // 18 chosen as arbitrary value for when to change icons to show price
        if (zoom >= 18) {
                    if (icon === 'no prices') {
                        setIcon('with prices')
                        console.log('setting icon to with prices')
                    }
                }
        else if (icon === 'with prices') {
                        setIcon('no prices')
                        console.log('setting icon to no prices')
                    }
    }

    

    const mapCenter = useMemo(() => ({ lat: 42.3601, lng: -71.0589 }), [42.3601, -71.0589]);
    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            clickableIcons: true,
            disableDefaultUI: true,
            scrollwheel: true,
            zoomControl: true,
            zoomControlOptions: { position: 1 },
            controlSize: 25,
            styles: [
                {
                    featureType: "all",
                    elementType: "labels.icon",
                    stylers: [
                        {
                            visibility: "off",
                        },
                    ],
                },
            ],
        }),
        [],
    );

    const libraries = useMemo(() => ["places"], []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
    });

    // Make the first value the color of the intersection we want to show!
    const isochroneColors = [
        ["#ff6f00", "#ff6f00"],
        ["#ffcdd2", "#ffcdd2"],
        ["#bbdefb", "#bbdefb"],
        ["#c8e6c9", "#c8e6c9"],
        ["#ffe0b2", "#ffe0b2"],
        ["#fff9c4", "#fff9c4"],
        ["#e1bee7", "#e1bee7"],
        ["#d7ccc8", "#d7ccc8"],
        ["#f5f5f5", "#f5f5f5"],
        ["#cfd8dc", "#cfd8dc"],
        ["#ffccbc", "#ffccbc"]
    ];
    if (!isLoaded) return <div className="w-full h-full"></div>;
    return (
        <GoogleMap
            options={mapOptions}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerClassName="w-100 h-100"
            onZoomChanged={zoomCheck(mapOptions.zoom!)}
        >
            {/* TODO: Figure out why this is not working, it is plotting every shell as a different color instead of every isochrone??? */}
            {isochrones &&
                isochrones.map((iso, i) => (
                    <Polygon
                        key={i}
                        path={iso}
                        options={{
                            // ! THIS IS HARD CODED TO ONE COLOR, CHANGE THE FIRST VALUE TO i IF WISH TO VARY
                            fillColor: isochroneColors[0][0],
                            fillOpacity: 0.25,
                            strokeColor: isochroneColors[0][1],
                            strokeOpacity: 0.8,
                            strokeWeight: 1.5,
                        }}
                    />
                ))}

            {/* TODO: Add in check for zoom in to show prices */}
            {/* {parameters!.map((coord, i) => (
                <MarkerF
                    key={`marker-${i}`}
                    position={new google.maps.LatLng(coord["lat"], coord["lng"])}
                />
            ))} */}
            {aparmentMarkers.map((coord, i) => (
                <MarkerF
                    key={`marker-${i}`}
                    title={stringify(coord['lat'], coord['lng'])}
                    position={new google.maps.LatLng(coord["lat"], coord["lng"])}
                    icon={icon}
                    onMouseOver={showApartmentInfo(coord)}
                    onClick={showApartmentInfo(coord)}
                />
            ))}
        </GoogleMap>
    );
};

// ! WE SHOULD CHECK FOR AN INTERSECTION ISOCHRONE AND IF IT EXISTS THEN TAKE CALCULATE THE FURTHEST COORDINATE
// ! FROM THE CENTER AND USE THAT AS THE RADIUS FOR OUR APARTMENT SEARCH