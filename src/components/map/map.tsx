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
    if (!isLoaded) return <div className="w-full h-full"></div>;
    return (
        <GoogleMap
            options={mapOptions}
            zoom={14}
            center={mapCenter}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            mapContainerClassName="w-100 h-100"
        >
            {isochrones && isochrones.map((iso, i) => (
                <Polygon 
                    key={i} 
                    path={iso}
                    options={{
                        fillColor: "#60a5fa",
                        fillOpacity: 0.25,
                        strokeColor: "#3b82f6",
                        strokeOpacity: 0.80,
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
