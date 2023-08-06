"use client";

import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { SearchParameter } from "@prisma/client";
import { Coords, TimeMapResponse } from "traveltime-api";

import type { Apartment } from "@/types/apartment";

export type Friend = {
    id: string;
    name: string;
    email: string;
    phone: string;
    isSaved: boolean;
    isFriend: boolean;
    isRequested: boolean;
    isPending: boolean;
    isBlocked: boolean;
    isOnline: boolean;
    lastSeen: string;
    lastMessage: string;
    lastMessageDate: string;
    lastMessageTime: string;
};

// @see /src/lib/validators/search-parameters.ts
export type Parameter = {
    id: string;
    address: string;
    nickname: string;
    traveltime: string;
    travelmode: string;
    isSaved: boolean;
};

interface Config {
    apartments?: Apartment[];
    updateApartments: (apartments: Apartment[]) => void;
    parameters?: Parameter[];
    addParameter: (param: Parameter) => void;
    delParameter: (id: string) => void;
    saveParameter: (param: Parameter) => void;
    unsaveParameter: (id: string) => void;
    shapes: Coords[][];
    saveShapes: (s: Coords[][]) => void;
    getShapes: () => Coords[][];
    isochrones: Coords[][];
    saveIsochrones: (isochrones: Coords[][]) => void;
    getIsochrones: () => Coords[][];
}

const ApartmentContext = React.createContext<Config>({} as Config);

const ApartmentProvider = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [apartments, setApartments] = useState<Apartment[]>([]);
    const [parameters, setParameters] = useState<Parameter[]>([]);
    const [isochrones, setIsochrones] = useState<Coords[][]>([]);
    const [shapes, setShapes] = useState<Coords[][]>([]);

    // TODO: clean up this is horrible.
    const getIsochrones = () => {
        return isochrones;
    };

    const getShapes = () => {
        return shapes;
    };

    const saveShapes = (s: Coords[][]) => {
        setShapes(s);
    };

    const saveIsochrones = (iso: Coords[][]) => {
        setIsochrones(iso);
    };

    const addParameter = (parameter: Parameter) => {
        setParameters((parameters) => [...parameters, parameter]);
    };

    const delParameter = (id: string) => {
        setParameters((parameters) => {
            return parameters.filter((param) => param.id !== id);
        });
    };

    const saveParameter = async (param: Parameter) => {
        // add the parameter to the database for the signed in user
        const response = await fetch("/api/user/parameter", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(param),
        });
        if (response?.ok) {
            const savedParameter: SearchParameter = await response.json();
            setParameters((parameters) => {
                let newParams: Parameter[] = [];
                for (const p of parameters) {
                    if (p.id === param.id) {
                        p.id = savedParameter.id;
                        p.isSaved = true;
                    }
                    newParams.push(p);
                }
                return newParams;
            });
            router.refresh();
        }
    };

    const unsaveParameter = async (id: string) => {
        const response = await fetch(`api/user/parameter/${id}`, {
            method: "DELETE",
        });
        if (response?.ok) {
            setParameters((parameters) => {
                let newParams: Parameter[] = [];
                for (const p of parameters) {
                    if (p.id === id) {
                        p.isSaved = false;
                    }
                    newParams.push(p);
                }
                return newParams;
            });
            router.refresh();
        }
    };

    const updateApartments = (apartments: Apartment[]) => {
        setApartments(apartments);
    };

    const init = {
        apartments,
        updateApartments,
        parameters,
        addParameter,
        delParameter,
        saveParameter,
        unsaveParameter,
        isochrones,
        saveIsochrones,
        getIsochrones,
        saveShapes,
        getShapes,
        shapes,
    };
    return <ApartmentContext.Provider value={init}>{children}</ApartmentContext.Provider>;
};

export const useApartmentContext = () => {
    return useContext(ApartmentContext);
};

export { ApartmentContext, ApartmentProvider };
