import React from "react";

export function parseApartments(apartments: any[], polygon: any) {
    const parsedApartments = [];
    for (let i = 0; i < apartments.length; i++) {
        const apartment = apartments[i];
        if (polygon.contains(apartment.coordinates)) {
            parsedApartments.push(apartment);
        }
    }
    return parsedApartments;
}
