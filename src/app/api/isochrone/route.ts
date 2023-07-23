import { NextResponse } from "next/server";
import * as z from "zod";

import { TimeMapRequestDepartureSearch, TimeMapRequestUnionOrIntersection, TravelTimeClient } from "traveltime-api";

const client = new TravelTimeClient({
    applicationId: process.env.TRAVELTIME_ID!,
    apiKey: process.env.TRAVELTIME_APPLICATION_KEY!,
});

export async function POST(req: Request) {
    const departure_search1: TimeMapRequestDepartureSearch = {
        id: 'public transport from Trafalgar Square',
        coords: { lat: 51.507609, lng: -0.128315 },
        departure_time: new Date().toISOString(),
        travel_time: 900,
        transportation: { type: 'public_transport' },
        properties: ['is_only_walking'],
    };
    
    const departure_search2: TimeMapRequestDepartureSearch = {
        id: 'driving from Trafalgar Square',
        coords: { lat: 51.507609, lng: -0.128315 },
        departure_time: new Date().toISOString(),
        travel_time: 900,
        transportation: { type: 'driving' }
    };

    const union: TimeMapRequestUnionOrIntersection = {
        id: 'union of driving and public transport',
        search_ids: ['public transport from Trafalgar Square', 'driving from Trafalgar Square'],
    };
    const intersection: TimeMapRequestUnionOrIntersection = {
        id: 'intersection of driving and public transport',
        search_ids: ['public transport from Trafalgar Square', 'driving from Trafalgar Square'],
    };

    const data = await client.timeMap({
        departure_searches: [departure_search1, departure_search2],
        unions: [union],
        intersections: [intersection],
    });
    if (data) {
        console.log(data);
        return NextResponse.json(data);
    }
    return new Response(null, { status: 500 });
}