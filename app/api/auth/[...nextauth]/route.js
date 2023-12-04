import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';
import { connectToMongoDB } from "@utils/db";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email });

            session.user.id = sessionUser._id.toString();

            return session;
        },
        async signIn({ profile }) {
            console.log(profile);
            try {
                await connectToMongoDB();

                //check if a user already exists
                const isExists = await User.findOne({ email: profile.email });

                //if not create new user
                if (!isExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };