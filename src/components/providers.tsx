"use client";

import React, { useContext, useState } from "react";

export type Apartment = {
    county: string;
    propertyType: string;
    addressLine1: string;
    city: string;
    state: string;
    zipCode: string;
    formattedAddress: string;
    id: string;
    latitude: number;
    longitude: number;
};

interface Config {
    apartments?: Apartment[];
    updateApartments: (apartments: Apartment[]) => void;
}

const ApartmentContext = React.createContext<Config>({} as Config);

const ApartmentProvider = ({ children }: { children: React.ReactNode }) => {
    const [apartments, setApartments] = useState<Apartment[]>([]);

    const updateApartments = (apartments: Apartment[]) => {
        setApartments(apartments);
    };

    const init = {
        apartments: apartments,
        updateApartments: updateApartments,
    };
    return <ApartmentContext.Provider value={init}>{children}</ApartmentContext.Provider>;
};

export const useApartmentContext = () => {
    return useContext(ApartmentContext);
};

export { ApartmentContext, ApartmentProvider };
