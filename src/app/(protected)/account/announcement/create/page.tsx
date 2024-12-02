"use client";

import { createAnnouncement } from "@/actions/announcements";
import { getCurrentDate } from "@/utils/format";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import Form from "next/form";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function Create() {
  const [isPending, startTransition] = useTransition();
  const [image, setImage] = useState<string>("");
  const [imageSize, setImageSize] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const sizeInMB = ((file?.size as number) / (1024 * 1024)).toFixed(2); // Rounded to 2 decimal places
    setImageSize(sizeInMB);

    if (file) {
      const reader = new FileReader();

      // When the file is read, update the Base64 state
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };

      // Read the file as Data URL (Base64)
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormData) => {
    if (Number(imageSize) >= 0.5) {
      toast.error("Image size exceeds 500KB!");
      return;
    }

    await createAnnouncement(e, image)
      .then((data) => {
        if (data?.type === "error") return toast.error(data.message);
        toast.success(data.message);
      })
      .catch(() => toast.error("Something went wrong!"));
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
        <Label htmlFor="image" className="text-primary font-medium">
          Image
        </Label>
        <Input
          type="file"
          id="image"
          name="image"
          className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
          accept="image/*"
          onChange={handleImageChange}
        />
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
