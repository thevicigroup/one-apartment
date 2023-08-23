import * as z from "zod";

import { getCurrentUser } from "@/lib/auth/get-server-session";
import { db } from "@/lib/database";

const routeContextSchema = z.object({
    params: z.object({
        id: z.string(),
    }),
});

export async function DELETE(req: Request, context: z.infer<typeof routeContextSchema>) {
    const user = await getCurrentUser();
    if (!user) {
        return new Response("Unauthorized", { status: 403 });
    }

    try {
        const { params } = routeContextSchema.parse(context);

        // see if valid parameter to delete
        const count = await db.searchParameter.count({
            where: {
                userId: user.id,
                id: params.id,
            },
        });
        if (count === 0) {
            return new Response("Unauthorized", { status: 403 });
        }

        await db.searchParameter.delete({
            where: {
                id: params.id as string,
            },
        });
        return new Response(null, { status: 204 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }
        return new Response(null, { status: 500 });
    }
}
