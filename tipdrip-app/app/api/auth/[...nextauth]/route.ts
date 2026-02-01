import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

declare module "next-auth" {
  interface Session {
    user: {
      stripeAccountId?: string | null;
      username?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    stripeAccountId?: string | null;
    username?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    stripeAccountId?: string | null;
    username?: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const client = await clientPromise;
        const db = client.db("tipdrip");
        
        const existingUser = await db.collection("users").findOne({ email: user.email });
        
        if (!existingUser) {
          // Generate a clean username from their name (e.g., "John Doe" -> "john-doe-123")
          const baseUsername = user.name?.toLowerCase().replace(/\s+/g, '-') || "user";
          const randomId = Math.floor(1000 + Math.random() * 9000);
          const generatedUsername = `${baseUsername}-${randomId}`;

          await db.collection("users").insertOne({
            email: user.email,
            name: user.name,
            username: generatedUsername,
            image: user.image,
            createdAt: new Date(),
            stripeAccountId: null,
          });
        }
        return true;            
      } catch (error) {
        console.error("Database error during sign-in:", error);
        return false;
      }
    },

    async jwt({ token, user }) {

      try {
        const client = await clientPromise;
        const db = client.db("tipdrip");
        const dbUser = await db.collection("users").findOne({ email: token.email });
        
        if (dbUser) {
          token.stripeAccountId = dbUser.stripeAccountId || null;
          token.username = dbUser.username || null;
        }
      } catch (error) {
        console.error("JWT Callback error:", error);
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.stripeAccountId = token.stripeAccountId;
        session.user.username = token.username;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };