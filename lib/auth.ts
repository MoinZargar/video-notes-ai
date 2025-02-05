import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { z } from "zod"
import { signInSchema } from "../lib/schemas/auth.schema"
import db from "../lib/prisma"


export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "Email" },
            password: { label: "Password", type: "password", placeholder: "Password" },
          },
        
          async authorize(credentials: z.infer<typeof signInSchema> | undefined) {
           try {
             if(!credentials) {
                 return null;
             }
             
             const result = signInSchema.safeParse(credentials);
             if (!result.success) {
                 return null;
             }
             
             const existingUser = await db.user.findFirst({
                 where: {
                     email: credentials.email
                 }
             });
 
             if (existingUser) {
                 const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                 if (passwordValidation) {
                     return {
                         id : existingUser.id.toString(),
                         email : existingUser.email,
                         name : existingUser.name
                     }
                 }
                 return null;
             }
           } catch (error) {
                console.error(error);
                return null;
           }
           return null;
          },
        })
    ],

    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        
        async session({ token, session }: any) {
            session.user.id = token.sub
            return session
        }
    }
  }


