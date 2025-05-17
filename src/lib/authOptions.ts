import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

import { loginUser } from "@/action/auth/LoginUser";
import dbConnect from "@/lib/dbConnection";
import { User as UserModel } from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    // ✅ Credentials Provider
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ): Promise<User | null> {
        if (!credentials?.email || !credentials?.password) return null;

        // ✅ Validate and authenticate with your own logic
        const user = await loginUser(credentials);

        if (!user || "error" in user) return null;

        return {
          id: user._id.toString(),
          name: user.name || null,
          email: user.email,
          image: user.image || null,
          role: user.role, 
        };
        
      },
    }),

    // ✅ Google Provider
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //   authorization: {
    //     params: {
    //       prompt: "consent",
    //       access_type: "offline",
    //       response_type: "code",
    //     },
    //   },
    // }),
  ],

  pages: {
    signIn: "/login", // your custom login page
  },

  callbacks: {
    // ✅ Store user in DB if logged in via Google
    async signIn({ user, account }) {
      if (account && user.email) {
        const { providerAccountId, provider } = account;
        const { email, image, name } = user;

        await dbConnect();

        const isExist = await UserModel.findOne({ email });

        if (!isExist) {
          await UserModel.create({
            providerAccountId,
            email,
            name,
            image,
            provider,
          });
        }
      }
      return true;
    },

    // ✅ Add user ID to JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // ✅ Add role to token
      }
      return token;
    },

    // ✅ Add user ID to session
    async session({ session, token }) {
        if (token && session.user) {
          session.user.id = token.id as string;
          session.user.role = token.role as string; // ✅ Add role to session
        }

      return session;
    },
  },

  session: {
    strategy: "jwt", // needed to use JWT token in middleware
  },

  secret: process.env.NEXTAUTH_SECRET,
};
