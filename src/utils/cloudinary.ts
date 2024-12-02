import { v2 as cloudinary } from "cloudinary";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (url: string) => {
  const uploadResult = await cloudinary.uploader
    .upload(url, {
      folder: "gau",
    })
    .catch(() => {});

  return uploadResult;
};
