import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@mail.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing username or password");
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials?.email,
          },
        });
        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(credentials?.password, user.password))) {
          throw new Error("Invalid username or password");
        }
        // return user as any; //fix for https://github.com/nextauthjs/next-auth/issues/2701
        return {
          id: `${user.id}`,
          username: user.username,
          email: user.email,
          job_title: user.job_title,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, trigger, user, session }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          job_title: user.job_title,
        };
      }
      if (
        trigger === "update" &&
        session.user.username &&
        session.user.job_title
      ) {
        return {
          ...token,
          username: session.user.username,
          job_title: session.user.job_title,
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          job_title: token.job_title,
        },
      };
    },
  },
};
