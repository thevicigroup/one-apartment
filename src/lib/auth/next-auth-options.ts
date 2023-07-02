import { type NextAuthOptions, type Session } from "next-auth";
// Available OAuth Providers
import GithubProvider from "next-auth/providers/github";

import CustomAdapter from "@/lib/auth/next-auth-custom-adapter";
import { db } from "@/lib/database";

export const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, token }) {
            const updatedSession: Session = {
                ...session,
                user: {
                    ...session.user,
                    id: token.id as string,
                    email: token.email,
                },
            };
            return updatedSession;
        },
        jwt: async ({ user, token, account }) => {
            if (!user) {
                const userFromDatabase = await db.user.findFirst({
                    where: { email: token.email! },
                    select: { id: true, email: true, name: true },
                });
                if (!userFromDatabase) return token;
                return { ...userFromDatabase, ...token };
            }
            if (!account) return token;

            return {
                ...token,
                id: user.id,
                email: user.email,
            };
        },
    },
    /**
     * Custom next-auth adapter for prisma
     */
    adapter: CustomAdapter(db),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 8 * 60 * 60,
    },
    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 8 * 60 * 60,
    },
    pages: {
        signIn: "/login",
    },
};
