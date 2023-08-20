import {getServerSession} from 'next-auth/next'
import { NextAuthOptions, User } from 'next-auth'
import {  AdapterUser } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'
import jsonnwebtoken from 'jsonwebtoken'
import { JWT } from 'next-auth/jwt'
import { SessionInterface, UserProfile } from '@/common.types'
import { createUser, getUser } from './actions'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    jwt: {
        encode: ({ secret, token}) => {
            const encodedToken = jsonnwebtoken.sign({
                ...token, 
                iss: 'grafbase',
                exp: Math.floor((Date.now() / 1000) + 60 * 60) //13 hours
            }, secret)

            return encodedToken;
        }, 
        decode: async ({ secret, token}) => {
            const decodedToken = jsonnwebtoken.verify(token!, secret) as JWT;

            return decodedToken;
        }
    },
    theme: {
        colorScheme: 'light',
        logo: '/logo.png'
    },

    callbacks: {
        async session({ session }) {
            const email = session?.user?.email as string;

            try {
                const data = await getUser(email) as { user?: UserProfile}

                const newSession = {
                    ...session, user: {
                        ...session.user, 
                        ...data?.user
                    }
                }

                return newSession
            } catch (error) {
                console.log('Error retrieving  user data', error);
                return session
            }
        },

        async signIn({ user }: { user: AdapterUser | User}) {
            try {
                // get user if they exist
                const userExist = await getUser(user?.email as string) as { user? : UserProfile}
                    
                //if user dont exist, create them
                if (!userExist.user) {
                    await createUser(
                        user.name as string, 
                        user.email as string, 
                        user.image as string
                    )
                }

                return true

            } catch (error : any) {
                console.log('error in signing in ',error);
                return false;
            }
        }
    }
}

export async function getCurrentUser() {
    const session = await getServerSession(authOptions) as SessionInterface;

    return session;
}