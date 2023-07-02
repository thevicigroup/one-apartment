"use client";

import React, { useMemo } from "react";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

interface Props {
    coords: { lat: number, lon: number }[];
}

export const Map: React.FC<Props> = ({ coords }) => {
    const mapCenter  = useMemo(() => ({ lat: 42.3601, lng: -71.0589 }), [42.3601, -71.0589]);
    const mapOptions = useMemo<google.maps.MapOptions>(() => ({
        clickableIcons: true,
        disableDefaultUI: true,
        scrollwheel: true,
    }), []);
        
    const libraries = useMemo(() => ["places"], []);
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
        libraries: libraries as any,
    });
    if (!isLoaded) return null;
    return (
        <GoogleMap
            options={mapOptions}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerStyle={{
                width: "100%", height: "100%",
            }}
        >
            {coords.map((coord, i) => (
                <MarkerF key={`marker-${i}`} position={new google.maps.LatLng(coord["lat"], coord["lon"])} />
            ))}
        </GoogleMap>
    );
};
