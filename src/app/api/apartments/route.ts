import { NextResponse } from "next/server";
import { testApartments } from "@/test-apartments";
import axios from "axios";

import { userParametersSchema } from "@/lib/validators/search-parameters";

export async function GET(req: Request) {
    // const url = req.url;
    // const queryParams = url.split("?")[1];
    // let queryKeys: any = {};
    // queryParams.split("&").map((k) => {
    //     const key: string = k.split("=")[0];
    //     const val: string = k.split("=")[1];
    //     queryKeys[key] = val;
    // });
    // const body = userParametersSchema.parse(queryKeys);

    // const response = await axios.request({
    //     method: "GET",
    //     url: "https://zillow56.p.rapidapi.com/search",
    //     params: {
    //         isApartment: 'true',
    //         location: 'Boston, MA',
    //     },
    //     headers: {
    //         "X-RapidAPI-Key": process.env.X_RAPID_API_KEY,
    //         "X-RapidAPI-Host": process.env.X_RAPID_API_HOST,
    //     },
    // });
    // return NextResponse.json(response.data);
    return NextResponse.json(testApartments);
}
