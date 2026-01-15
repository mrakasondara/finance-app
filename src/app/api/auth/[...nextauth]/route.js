import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { connectDB } from "@/database";
import { User } from "@/database/models/user";
import { mongoURI } from "../../../../../constant";
import { getUserImageProfile } from "@/supabase/storage/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectDB(mongoURI);

        const user = await User.findOne({ email: credentials.email });
        let image_thumb = "";
        if (user.image_thumb) {
          const { data, error } = await getUserImageProfile(user.image_thumb);
          image_thumb = data.publicUrl;
        }

        if (!user) {
          return null;
        }

        const isLoginValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isLoginValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          image: image_thumb,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.email = token.email;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
