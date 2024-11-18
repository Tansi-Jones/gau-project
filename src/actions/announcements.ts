"use server";

import { revalidateTag } from "next/cache";
import { server } from "../../www";
import { auth } from "@/auth";
// import { uploadImage } from "@/utils/cloudinary";

export const getAnnouncements = async () => {
  try {
    const request = await fetch(`${server}/announcements`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["announcements"],
      },
    });
    const response = await request?.json();

    return response;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

export const getAnnouncementById = async (id: string) => {
  try {
    const request = await fetch(`${server}/announcements/${id}`, {
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

export const createAnnouncement = async (
  data: FormData,
  image: Base64URLString
) => {
  const session = await auth();

  try {
    // const upload = await uploadImage(image);
    // console.log(upload);

    const request = await fetch(`${server}/announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.get("title"),
        body: data.get("body"),
        image: "",
        startDate: data.get("startDate"),
        endDate: data.get("endDate"),
        announcerId: session?.user?.id,
        isUrgent: false,
      }),
    });
    const response = await request?.json();
    revalidateTag("announcements");

    return response;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

export const editAnnouncementById = async (id: string, data: FormData) => {
  try {
    const request = await fetch(`${server}/announcements/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.get("title"),
        body: data.get("body"),
        image: "",
        startDate: data.get("startDate"),
        endDate: data.get("endDate"),
        announcerId: "37a208f2-bae7-4b92-a1bd-47740bbcd2ec",
        isUrgent: false,
      }),
    });
    const response = await request?.json();
    revalidateTag("announcements");

    return response;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};

export const deleteAnnouncementById = async (id: string) => {
  try {
    const request = await fetch(`${server}/announcements/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await request?.json();
    revalidateTag("announcements");

    return response;
  } catch (error) {
    return { message: "Something went wrong!" };
  }
};
