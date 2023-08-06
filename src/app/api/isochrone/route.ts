import { NextResponse } from "next/server";
import {
    Coords,
    TimeMapRequestDepartureSearch,
    TimeMapRequestUnionOrIntersection,
    TransportationType,
    TravelTimeClient,
} from "traveltime-api";
import * as z from "zod";

import { buildIsochronesFromParameters } from "@/lib/validators/search-parameters";

const client = new TravelTimeClient({
    applicationId: process.env.TRAVELTIME_ID!,
    apiKey: process.env.TRAVELTIME_APPLICATION_KEY!,
});

export async function POST(req: Request) {
    try {
        const json = await req.json();
        const body = buildIsochronesFromParameters.parse(json);

        if (body.parameters.length > 3) {
            return new Response("You can only have up to 3 parameters for now.", { status: 500 });
        }

        let userParameters: TimeMapRequestDepartureSearch[] = [];
        for (const p of body.parameters) {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${p.address}&key=${process.env.GOOGLE_API_KEY}`,
                { method: "GET" },
            );
            const data: any = await response.json();
            const coords: Coords = data.results[0].geometry.location;
            userParameters.push({
                id: p.id,
                coords: coords,
                travel_time: parseInt(p.traveltime) * 60, // convert to seconds
                departure_time: new Date().toISOString(),
                transportation: { type: p.travelmode as TransportationType },
                single_shape: true,
            });
        }

        const inter: TimeMapRequestUnionOrIntersection = {
            id: "inter",
            search_ids: userParameters.map((param) => param.id),
        };

        const data = await client.timeMap({
            departure_searches: userParameters,
            intersections: [inter],
        });
        return NextResponse.json(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }
        return new Response(null, { status: 500 });
    }
}
