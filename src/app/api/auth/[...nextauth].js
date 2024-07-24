import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import config from "@/lib/config"

const {GOOGLE_CLIENT_ID,GOOGLE_CLIENT_SECRET} = config;
export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: '/login',
        error: '/login?error'
    },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.sub;
            return session;
        },
    },
});
