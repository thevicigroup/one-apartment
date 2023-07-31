"use client";

import React, { useMemo } from "react";
import { GoogleMap, Marker, MarkerF, Polygon, useLoadScript } from "@react-google-maps/api";
import { Coords } from "traveltime-api";

interface Props {
    isochrones?: Coords[][];
    aparmentMarkers: { lat: number; lng: number }[];
}

export const Map: React.FC<Props> = ({ isochrones, aparmentMarkers }) => {
    // const mapCenter = useMemo(() => ({ lat: 51.507609, lng: -0.128315 }), [51.507609, -0.128315]);
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
        ["#ffccbc", "#ffccbc"],
    ];
    if (!isLoaded) return <div className="w-full h-full"></div>;
    return (
        <GoogleMap
            options={mapOptions}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerClassName="w-100 h-100"
        >
            {/* TODO: Figure out why this is not working, it is plotting every shell as a different color instead of every isochrone??? */}
            {isochrones &&
                isochrones.map((iso, i) => (
                    <Polygon
                        key={i}
                        path={iso}
                        options={{
                            fillColor: isochroneColors[i][0],
                            fillOpacity: 0.25,
                            strokeColor: isochroneColors[i][1],
                            strokeOpacity: 0.8,
                            strokeWeight: 1.5,
                        }}
                    />
                ))}

            {aparmentMarkers.map((coord, i) => (
                <MarkerF
                    key={`marker-${i}`}
                    position={new google.maps.LatLng(coord["lat"], coord["lng"])}
                    // icon={"src/icon.png"}
                />
            ))}
        </GoogleMap>
    );
};
