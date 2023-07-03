"use client";

import React, { useMemo } from "react";
import { GoogleMap, MarkerF, Polygon, useLoadScript } from "@react-google-maps/api";

interface Props {
    isochronePath?: { lat: number; lng: number }[];
    aparmentMarkers: { lat: number; lng: number }[];
}

export const Map: React.FC<Props> = ({ isochronePath, aparmentMarkers }) => {
    const mapCenter = useMemo(() => ({ lat: 42.3601, lng: -71.0589 }), [42.3601, -71.0589]);
    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            clickableIcons: false,
            disableDefaultUI: true,
            scrollwheel: true,
            zoomControl: true,
            zoomControlOptions: { position: 1 },
            controlSize: 25,
            styles: [{
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            }]
        }),
        [],
    );

    const libraries = useMemo(() => ["places"], []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
    });
    if (!isLoaded) return <div className="w-full h-full"></div>;
    return (
        <GoogleMap
            options={mapOptions}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerClassName="w-100 h-100"
        >
            {isochronePath && <Polygon paths={[isochronePath]} />}
            {aparmentMarkers.map((coord, i) => (
                <MarkerF
                    key={`marker-${i}`}
                    position={new google.maps.LatLng(coord["lat"], coord["lng"])}
                />
            ))}
        </GoogleMap>
    );
};
