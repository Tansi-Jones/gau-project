"use server";

import { signOut, signIn } from "@/auth";
import { AuthError } from "next-auth";

export const logOut = async () => {
  return await signOut({ redirectTo: "/" });
};

export const logIn = async (data: FormData) => {
  try {
    await signIn("credentials", {
      email: data?.get("email"),
      password: data?.get("password"),

      redirectTo: "/account",
    });

    return { success: "success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "This Email doesn't exist!" };
        case "CallbackRouteError":
          return { error: "Callback route error!" };

        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }
};
