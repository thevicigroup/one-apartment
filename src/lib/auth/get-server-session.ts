import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/next-auth-options";

// return the current session user object from the server
export async function getCurrentUser() {
    const session = await getServerSession(authOptions);
    // if session, return the user. Otherwise return undefined
    return session?.user;
}
