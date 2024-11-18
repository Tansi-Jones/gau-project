import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { getUserById } from "./actions/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/login",
  },

  callbacks: {
    async signIn({ user }) {
      if (user) return true;
      return false;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.role = token.role as boolean;
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return null;

      const existingAccount = await getUserById(token.sub);
      if (!existingAccount) return null;

      token.role = existingAccount?.role;
      token.name = existingAccount?.name;

      return token;
    },
  },

  session: { strategy: "jwt" },
  ...authConfig,
});
