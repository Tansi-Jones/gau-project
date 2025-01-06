"use server";

import { revalidateTag } from "next/cache";
import { server } from "../../www";
import { auth } from "@/auth";
import { uploadImage } from "@/utils/cloudinary";

export const getAllAnnouncements = async () => {
  try {
    const request = await fetch(`${server}/announcements/admin`, {
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
    return { message: "Something went wrong!", error };
  }
};

export const getCurrentAnnouncements = async () => {
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
    return { message: "Something went wrong!", error };
  }
};

export const getAnnouncementsByAnnouncers = async () => {
  const session = await auth();
  try {
    const request = await fetch(
      `${server}/announcements/announcer/${session?.user?.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {
          tags: ["announcements-by-announcers"],
        },
      }
    );
    const response = await request?.json();

    return response;
  } catch (error) {
    return { message: "Something went wrong!", error };
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
    return { message: "Something went wrong!", error };
  }
};

export const createAnnouncement = async (data: FormData, image?: string) => {
  const session = await auth();

  try {
    const upload = await uploadImage(image as string);

    const request = await fetch(`${server}/announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.get("title"),
        body: data.get("body"),
        image: upload?.url,
        startDate: data.get("startDate"),
        endDate: data.get("endDate"),
        announcerId: session?.user?.id,
        isUrgent: data.get("isUrgent") ? 1 : 0,
      }),
    });
    const response = await request?.json();
    revalidateTag("announcements");
    revalidateTag("announcements-by-announcers");

    return response;
  } catch (error) {
    return { message: "Something went wrong!", error };
  }
};

export const editAnnouncementById = async (
  id: string,
  data: FormData,
  image?: string
) => {
  const session = await auth();
  try {
    const upload = await uploadImage(image as string);

    const request = await fetch(`${server}/announcements/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: data.get("title"),
        body: data.get("body"),
        image: upload?.url,
        startDate: data.get("startDate"),
        endDate: data.get("endDate"),
        announcerId: session?.user?.id,
        isUrgent: data.get("isUrgent") ? 1 : 0,
      }),
    });
    const response = await request?.json();
    revalidateTag("announcements");
    revalidateTag("announcements-by-announcers");

    return response;
  } catch (error) {
    return { message: "Something went wrong!", error };
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
    revalidateTag("announcements-by-announcers");

    return response;
  } catch (error) {
    return { message: "Something went wrong!", error };
  }
};
