/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import apiClient from "@/lib/api-client";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }
        
        try {
          const response = await apiClient.post('/auth/internal/login', {
            username: credentials.username,
            password: credentials.password,
          });
          
          if (response.data && response.data.user) {
            return {
              id: response.data.user.id,
              name: response.data.user.username,
              email: response.data.user.email,
              accessToken: response.data.token,
            };
          }
          return null;
        } catch (_error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        if (account.provider === 'google') {
          try {
            const response = await apiClient.post('/auth/google/callback', {
              accessToken: account.access_token,
              idToken: account.id_token,
            });
            
            if (response.data && response.data.token) {
              token.accessToken = response.data.token;
              token.id = response.data.user?.id;
            }
          } catch (error) {
            console.error("Error exchanging Google token:", error);
          }
        } else {
          token.accessToken = user.accessToken;
          token.id = user.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = session.user || {};
        session.user.accessToken = token.accessToken as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
  },
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
