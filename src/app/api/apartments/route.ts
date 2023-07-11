import { NextResponse } from "next/server";
import axios from "axios";

import { testApartments } from "@/test-apartments";
import { userParametersSchema } from "@/lib/validators/search-parameters";

export async function GET(req: Request) {
    const url = req.url;
    const queryParams = url.split("?")[1];
    let queryKeys: any = {};
    queryParams.split("&").map((k) => {
        const key: string = k.split("=")[0];
        const val: string = k.split("=")[1];
        queryKeys[key] = val;
    });
    const body = userParametersSchema.parse(queryKeys);
    console.log(body);

    // call reality mole api
    // const response = await axios.request({
    //     method: "GET",
    //     url: "https://realty-mole-property-api.p.rapidapi.com/rentalListings",
    //     params: {
    //         propertyType: "Apartment",
    //         zipCode: "02109",
    //         bathrooms: body.bath,
    //         bedrooms:  body.beds,
    //     },
    //     headers: {
    //         "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
    //         "X-RapidAPI-Host": process.env.X_RAPID_API_HOST,
    //     },
    // });
    // console.log(response.data);
    // return NextResponse.json(response.data);
    return NextResponse.json(testApartments);
}
