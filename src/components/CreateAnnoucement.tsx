"use client";

import { createAnnouncement } from "@/actions/announcements";
import { getCurrentDate } from "@/utils/format";
import {
  Button,
  Field,
  Input,
  Label,
  Switch,
  Textarea,
} from "@headlessui/react";
import Form from "next/form";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export const CreateAnnouncements = ({ role }: { role: string }) => {
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
      action={(e: any) => {
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

      {role === "Admin" && (
        <Field className="flex justify-between items-center bg-white border rounded-lg p-2">
          <Label htmlFor="isUrgent" className="text-primary font-medium">
            Make this post urgent.
          </Label>
          <Switch
            name="isUrgent"
            id="isUrgent"
            defaultValue={0}
            className="group relative flex h-7 w-14 cursor-pointer rounded-full bg-primary/20 p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-rose-500 data-[checked]:bg-rose-500"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none inline-block size-5 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-7"
            />
          </Switch>
        </Field>
      )}

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
};
