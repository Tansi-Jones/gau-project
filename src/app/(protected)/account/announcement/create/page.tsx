"use client";

import { createAnnouncement } from "@/actions/announcements";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import Form from "next/form";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import ReactFileReader from "react-file-reader";

export default function Create() {
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState("");
  const [imageSize, setImageSize] = useState<number>(0);

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = async (
    e: FormData
  ): Promise<string | number | undefined | any> => {
    try {
      // if (imageSize >= 0.9) return toast.error("Image size is largerthan 1MB!");
      const request = await createAnnouncement(e, image);
      if (request?.type === "error") return toast.error(request.message);
      toast.success(request.message);
    } catch (error) {
      return toast.error("Something went wrong!");
    }
  };

  return (
    <Form
      action={(e) => {
        startTransition(() => handleSubmit(e));
      }}
      className="mx-auto lg:w-5/6 xl:w-2/4 space-y-5 px-3 lg:px-0 my-10"
    >
      <Field className="flex flex-col">
        <Label htmlFor="title" className="text-primary font-medium">
          Title
        </Label>
        <Input
          type="text"
          id="title"
          name="title"
          required
          className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
        />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field className="flex flex-col">
          <Label htmlFor="startDate" className="text-primary font-medium">
            Start date
          </Label>
          <Input
            type="date"
            id="startDate"
            name="startDate"
            required
            defaultValue={getCurrentDate()}
            min={getCurrentDate()}
            className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
          />
        </Field>
        <Field className="flex flex-col">
          <Label htmlFor="endDate" className="text-primary font-medium">
            End date
          </Label>
          <Input
            type="date"
            id="endDate"
            name="endDate"
            required
            min={getCurrentDate()}
            className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
          />
        </Field>
      </div>
      <Field className="flex flex-col">
        <Label htmlFor="body" className="text-primary font-medium">
          Body
        </Label>
        <Textarea
          id="body"
          name="body"
          required
          rows={4}
          className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2 resize-none"
        />
      </Field>

      <Field className="flex flex-col">
        <ReactFileReader
          fileTypes={[".png", ".jpg", ".jpeg"]}
          base64={true}
          multipleFiles={false}
          handleFiles={(value: any) => {
            setImage(value?.base64[0]);
            setImageSize(value?.fileList[0]?.size / 1024 / 1024);
          }}
        >
          <button
            type="button"
            className="bg-white/40 w-full border-2 border-dashed border-gray-400 text-primary rounded-lg p-4"
          >
            Upload image
          </button>
        </ReactFileReader>
      </Field>
      <Button
        type="submit"
        disabled={isPending}
        className="bg-primary text-white w-full flex items-center justify-center rounded-lg p-2"
      >
        {isPending ? (
          <Image
            src="/assets/loader.svg"
            alt="loader"
            width={24}
            height={24}
            sizes="100vh"
            className="animate-spin"
          />
        ) : (
          "Create"
        )}
      </Button>
    </Form>
  );
}
