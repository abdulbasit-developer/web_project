import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { baseUrl } from "./auth-config"
import { Session } from "next-auth"

// Extend the Session type to include the user ID
declare module "next-auth" {
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  // Enhanced callbacks for better error handling
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        // Add the user ID to the session
        session.user.id = token.sub!
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        // Add user info to the token
        token.uid = user.id
      }
      return token
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
  },
  // Enable debug in both development and production temporarily
  // to help troubleshoot deployment issues
  debug: true,
  // Explicitly set the secret
  secret: process.env.NEXTAUTH_SECRET,
}