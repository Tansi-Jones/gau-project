"use server";

import { revalidateTag } from "next/cache";
import { server } from "../../www";

export const getUsers = async () => {
  try {
    const request = await fetch(`${server}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["users"],
      },
    });
    const response = await request?.json();

    return response;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

export const getUserById = async (id: string) => {
  try {
    const request = await fetch(`${server}/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request?.json();

    return response;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

export const createUser = async (data: FormData) => {
  try {
    const request = await fetch(`${server}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        role: "Announcer",
      }),
    });
    const response = await request?.json();
    revalidateTag("users");

    return response;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

export const editUserById = async (id: string, data: FormData) => {
  try {
    const request = await fetch(`${server}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
      }),
    });
    const response = await request?.json();
    revalidateTag("users");

    return response;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};
