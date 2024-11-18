"use client";

import { logOut } from "@/actions/auth";
import Form from "next/form";

export const LogoutButton = () => {
  return (
    <Form
      action={async () => {
        await logOut();
      }}
    >
      <button
        type="submit"
        className="text-rose-500 hover:bg-rose-100 transition-all du text-sm rounded-md py-1 px-3"
      >
        Logout
      </button>
    </Form>
  );
};
