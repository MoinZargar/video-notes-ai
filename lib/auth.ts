import { NextAuthOptions, Account, Profile, User as NextAuthUser, Session, User, } from "next-auth"
import type { JWT } from "next-auth/jwt"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'
import bcrypt from "bcrypt"
import { z } from "zod"
import { signInSchema } from "./schemas/authSchema"
import db from "../lib/prisma"
import { Provider } from "@prisma/client"
import { AuthUser } from "@/types/next-auth"
import { SignInFormData } from "@/types/forms"


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
        captchaToken: { label: "Captcha Token", placeholder: "Captcha Token" },
        isPostSignup: { label: "Source of SignIn request", placeholder: "Is Request Post Signup" }
      },
      async authorize(
        credentials: SignInFormData | undefined
      ): Promise<AuthUser | null> {
        try {
          //if user sign up through email and password

          if (!credentials) {
            return null;
          }

          const result = signInSchema.safeParse(credentials);
          if (!result.success) {
            return null;
          }
          // Check if this is a post-signup signin request
          const isPostSignup = credentials.isPostSignup === 'true';

          // Skip CAPTCHA verification for post-signup signin
          if (!isPostSignup) {
            // Verify the captcha token
            const res = await fetch(process.env.CLOUDFLARE_VERIFY_TOKEN_ENDPOINT!, {
              method: 'POST',
              body: `secret=${encodeURIComponent(process.env.CLOUDFLARE_SECRET_KEY!)}&response=${encodeURIComponent(credentials.captchaToken || '')}`,
              headers: {
                'content-type': 'application/x-www-form-urlencoded'
              }
            })
            const verifyToken = await res.json()
            if (!verifyToken.success) {
              return null
            }
          }

          const existingUser = await db.user.findFirst({
            where: {
              email: credentials.email,
            }
          });

          if (!existingUser || !existingUser.password) {
            return null;
          }

          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );

          if (!passwordValidation) {
            return null;
          }
          const User = {
            id: String(existingUser.id),
            email: existingUser.email,
            name: existingUser.name,
            provider: existingUser.provider,
            isOAuthUser: existingUser.isOAuthUser
          }
          return User;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile }
      : {
        user: User,
        account: Account | null,
        profile?: Profile | undefined
      }
    ) {
      try {

        if (account?.provider === 'google' || account?.provider === 'github') {
          const existingUser = await db.user.findUnique({
            where: { email: user.email! }
          });
          // if email exits but user has not signed up using oAuth
          if (existingUser) {
            if (!existingUser.isOAuthUser) {
              await db.user.update({
                where: { email: user.email! },
                data: {
                  isOAuthUser: true,
                  provider: account.provider.toUpperCase() as Provider
                }
              });
            }
          }
          //new user signing up through oAuth 
          else {
            await db.$transaction(async (tx) => {
              const User = await tx.user.create({
                data: {
                  email: user.email as string,
                  name: user.name || null,
                  isOAuthUser: true,
                  provider: account.provider.toUpperCase() as Provider
                }
              });

              const plan = await db.plan.findUnique({
                where: { planId: process.env.NEXT_PUBLIC_BASIC_PLAN_ID! },
              });

              //intialize the subscription and daily usage models
              const Subscription = await tx.subscription.create({
                data: {
                  userId: User?.id,
                  planId: plan?.id || 1
                }
              })
              const DailyUsage = await tx.dailyUsage.create({
                data: {
                  subscriptionId: Subscription?.id,
                }
              })
            })
          }
        }
        return true;
      } catch (error) {
        console.error("SignIn Callback Error:", error);
        return false;
      }
    },
    async session({ session, token }
      : {
        session: Session,
        user: User,
        token: JWT,


      }
    ) {
      const user = await db.user.findUnique({
        where: {
          email: session.user.email
        }
      });
      if (!user) {
        throw new Error("User not found");
      }
      session.user.id = String(user.id);
      session.user.name = user.name;
      session.user.provider = user.provider;
      session.user.isOAuthUser = user.isOAuthUser;
      return session;

    },
    async jwt({ token, account }:
      {
        token: JWT,
        account: Account | null

      }
    ) {

      if (account) {
        token.provider = account.provider;
      }
      return token;
    }
  }
};
