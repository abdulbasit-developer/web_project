import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { baseUrl } from "@/app/lib/auth-config"

// Define auth options directly in the route for simplicity
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // Enable debug messages in both development and production
  // to help troubleshoot deployment issues
  debug: true,
  // Add better error handling
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // Log sign-in attempts for debugging
      console.log("Sign-in attempt:", { user, account });
      return true;
    },
    async session({ session, token }) {
      return session;
    },
  },
  // NextAuth will use NEXTAUTH_URL from environment variables
})

export { handler as GET, handler as POST }