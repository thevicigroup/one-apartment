import React from "react";

import type { Apartment } from "@/components/providers";

interface Props {
    apartmentInfo: Apartment;
}

export const SingleApartment: React.FC<Props> = ({ apartmentInfo }) => {
    return <div>{apartmentInfo.formattedAddress}</div>;
};
