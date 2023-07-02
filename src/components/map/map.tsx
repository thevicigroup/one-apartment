"use client";

import React, { useMemo, useState } from "react";
import { CircleF, GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";

export const Map = () => {
    const coordinates = [
        ["42.360", "-71.058"],
        ["42.361", "-71.058"],
        ["42.360", "-71.051"],
        ["42.3602", "-71.058"],
        ["42.3603", "-71.0584"],
    ];

    const [lat, setLat] = useState(42.3601);
    const [lng, setLng] = useState(-71.0589);

    const libraries = useMemo(() => ["places"], []);
    const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

    const mapOptions = useMemo<google.maps.MapOptions>(
        () => ({
            disableDefaultUI: true,
            clickableIcons: true,
            scrollwheel: true,
        }),
        [],
    );

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
                width: "100%",
                height: "100%",
            }}
            onLoad={(map) => console.log("Map Loaded")}
        />
    );
};
