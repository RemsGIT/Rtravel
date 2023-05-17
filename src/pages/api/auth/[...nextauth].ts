import { compare } from "bcrypt"
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import prisma from "../../../../lib/prisma";
import {PrismaAdapter} from "@next-auth/prisma-adapter";


export default async function auth(req: any, res: any) {

    let maxAge = 30 * 60; //30min by default
    if(req.body.remember){
        maxAge = req.body.remember === 'true' ? 30 * 24 * 60 * 60 : maxAge; // 1month if remember me
    }
    
    return await NextAuth(req, res, {
        providers: [
            CredentialsProvider({
                // The name to display on the sign in form (e.g. "Sign in with...")
                name: "Credentials",

                // `credentials` is used to generate a form on the sign in page.
                // You can specify which fields should be submitted, by adding keys to the `credentials` object.
                // e.g. domain, username, password, 2FA token, etc.
                // You can pass any HTML attribute to the <input> tag through the object.
                credentials: {
                    email: { label: "Email", type: "email", placeholder: "john.doe@gmail.com" },
                    password: { label: "Password", type: "password" },
                    remember: {label: 'Se souvenir de moi ?', type: 'checkbox'}
                },

                // @ts-ignore
                async authorize(credentials) {
                    const dbUser = await prisma.user.findUnique({
                        where: {
                            // @ts-ignore
                            email: credentials.email
                        }
                    });

                    if (dbUser) {

                        const hashPass = /^\$2y\$/.test(dbUser.password) ? '$2a$' + dbUser.password.slice(4) : dbUser.password;

                        // @ts-ignore
                        if(await compare(credentials.password, hashPass)){
                            // User logs are correct

                            if(!dbUser.emailVerified) {
                                throw new Error("Ton adresse mail n'est pas vérifiée, vérifie tes mails.")
                            }

                            return dbUser
                        }
                        else {
                            throw new Error('Email ou mot de passe incorrect.')
                        }
                    }
                    throw new Error('Email ou mot de passe incorrect.') // no acount with this email
                },
            }),
        ],
        secret: process.env.NEXT_PUBLIC_JWT_SECRET,
        callbacks: {
            // @ts-ignore
            async jwt({token, user}) {
                user && (token.user = user)

                return token
            },
            async session({ session, token }) {
                // Send properties to the client, like an access_token and user id from a provider.
                // @ts-ignore
                session = {
                    ...session,
                    user: {
                        // @ts-ignore
                        id: token.user.id,
                        name: token.name,
                        email: token.email,
                        image: token.picture,
                        //@ts-ignore
                        role: token.user.role,
                        //@ts-ignore
                        created_at: token.user.createdAt,
                    }
                }

                // @ts-ignore
                return session
            },
        },
        session: {
            strategy: 'jwt',
            maxAge: maxAge
        },
        jwt: {
            maxAge: maxAge
        },
        pages: {
            signIn: '/login'
        },
        adapter: PrismaAdapter(prisma),
    })
}