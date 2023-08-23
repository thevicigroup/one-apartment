import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

import { testApartments } from "@/test-apartments";
import { getCurrentUser } from '@/lib/auth/get-server-session';
import { db } from '@/lib/database';
import { userParametersSchema } from '@/lib/validators/search-parameters';
import { loadSavedSearchParams } from '@/components/search-functions';
import { User } from '@prisma/client';
import { json } from 'stream/consumers';
import { Prisma } from '@prisma/client';
import { Next } from 'react-bootstrap/esm/PageItem';


export async function GET(req: NextRequest) {
    const json = await req.json();
    // console.log(json)

    const userID = userParametersSchema.parse(json).id;

    // Load Saved Search Parameters is from the search-functions file
    const parameters = await loadSavedSearchParams(userID)
    // console.log(parameters);
    return NextResponse.json(parameters);
}

export async function POST(req: NextRequest) {
    const json = await req.json();
    console.log(json)
    
    const userID = userParametersSchema.parse(json).id;

    // Load Saved Search Parameters is from the search-functions file
    const parameters = await loadSavedSearchParams(userID)
    // console.log(parameters);
    return NextResponse.json(parameters);
}
