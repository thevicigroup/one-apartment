import React from "react";

import type { Apartment } from "@/components/providers";

interface Props {
    apartmentInfo: Apartment;
}

export const SingleApartment: React.FC<Props> = ({ apartmentInfo }) => {
    return (
        <table className="table-fixed w-full bg-white border-collapse odd:bg-gray-100">
            <tr>
                <td className="text-left w-60 px-4">
                    <td>{apartmentInfo.addressLine1}</td>
                    <td>{apartmentInfo.city}</td>
                </td>
                <td className="text-center px-4">{apartmentInfo.bedrooms}</td>
                <td className="text-center px-4">{apartmentInfo.bathrooms}</td>
                <td className="text-center py-2 px-4">{apartmentInfo.price}</td>
            </tr>
        </table>
    )
};
