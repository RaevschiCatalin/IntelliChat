// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import config from "@/lib/config";


const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = config;
console.log(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),

    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
