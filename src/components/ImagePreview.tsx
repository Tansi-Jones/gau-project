"use client";

import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

export const ImagePreview = ({ image }: { image: string }) => {
  return (
    <PhotoProvider>
      <PhotoView src={image}>
        <div className="h-72 w-full relative hover:cursor-zoom-in">
          <Image
            src={image}
            fill
            className="object-cover overflow-auto rounded-lg"
            alt="img"
          />
        </div>
      </PhotoView>
    </PhotoProvider>
  );
};
