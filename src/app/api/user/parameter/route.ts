import { NextResponse } from "next/server";
import * as z from "zod";

import { getCurrentUser } from "@/lib/auth/get-server-session";
import { db } from "@/lib/database";
import { userParametersSchema } from "@/lib/validators/search-parameters";

export async function POST(req: Request) {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Unauthorized", { status: 403 });
    }

    try {
        const json = await req.json();
        const body = userParametersSchema.parse(json);

        // create the new parameter
        const parameter = await db.searchParameter.create({
            data: {
                nickname: body.nickname,
                address: body.address,
                traveltime: body.traveltime,
                travelmode: body.travelmode,
                userId: user.id,
            },
        });
        return NextResponse.json(parameter);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }
        return new Response(null, { status: 500 });
    }
}
