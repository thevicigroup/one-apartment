"use client";

import React, { useMemo, useState } from "react";
import { GoogleMap, InfoBoxF, MarkerF, Polygon, useLoadScript } from "@react-google-maps/api";
import { Coords } from "traveltime-api";

import type { Apartment } from "@/types/apartment";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface Props {
    shapes?: Coords[][];
    isochrones?: Coords[][];
    aparmentMarkers: { lat: number; lng: number }[];
    apartments?: Apartment[];
}





export const Map: React.FC<Props> = ({ aparmentMarkers, isochrones, shapes, apartments }) => {
    const [activeMarker, setActiveMarker] = useState<string>("");
    function clearMarkers(): void {
        isochrones = [];
        markers = [];
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
        ["#fee2e2", "#ef4444"],
        ["#dbeafe", "#3b82f6"],
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
            {shapes &&
                shapes.map((iso, i) => (
                    <Polygon
                        key={i}
                        path={iso}
                        options={{
                            fillColor: "#c4b5fd",
                            fillOpacity: 0.5,
                            strokeColor: "#8b5cf6",
                            strokeOpacity: 0.8,
                            strokeWeight: 1.5,
                            zIndex: 40,
                        }}
                    />
                ))}
            {isochrones &&
                isochrones.map((iso, i) => (
                    <Polygon
                        key={i}
                        path={iso}
                        options={{
                            fillColor: isochroneColors[i][0],
                            fillOpacity: 0.15,
                            strokeColor: isochroneColors[i][1],
                            strokeOpacity: 0.8,
                            strokeWeight: 1,
                            zIndex: 1,
                        }}
                    />
                ))}

            {apartments &&
                apartments.map((apt, i) => (
                    <MarkerF
                        key={`marker-${i}`}
                        position={new google.maps.LatLng(apt["latitude"], apt["longitude"])}
                        onMouseOver={() => setActiveMarker(apt.id)}
                        onMouseOut={() => setActiveMarker("")}
                        icon={{ url: "/icon.png" }}
                    >
                        {activeMarker === apt.id ? (
                            <InfoBoxF
                                options={{
                                    closeBoxURL: "",
                                    alignBottom: true,
                                    infoBoxClearance: new window.google.maps.Size(24, 24),
                                    pixelOffset: new window.google.maps.Size(-150, -60),
                                }}
                            >
                                <div className="bg-white rounded-md p-4">
                                    {apt.formattedAddress}
                                </div>
                            </InfoBoxF>
                        ) : null}
                    </MarkerF>
                ))}

        </GoogleMap>
    );
};

// ! WE SHOULD CHECK FOR AN INTERSECTION ISOCHRONE AND IF IT EXISTS THEN TAKE CALCULATE THE FURTHEST COORDINATE
// ! FROM THE CENTER AND USE THAT AS THE RADIUS FOR OUR APARTMENT SEARCH
