import { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "./actions/users";

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        if (!credentials) return null;

        const user = await getUserByEmail(credentials?.email as string);

        if (!user?.id) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
