"use client";

import { editAnnouncementById } from "@/actions/announcements";
import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import Form from "next/form";
import Image from "next/image";
import { useTransition } from "react";
import { Announcement } from "../../types/common.types";

type Props = {
  id: string;
  data: Announcement;
};

export const EditAnnouncementForm = ({ id, data }: Props) => {
  const [isPending, startTransition] = useTransition();

  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = async (e: FormData) => {
    try {
      const request = await editAnnouncementById(id, e);
      console.log(request);
    } catch (error) {}
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
          defaultValue={data?.title}
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
            defaultValue={data?.startDate}
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
            defaultValue={data?.endDate}
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
          defaultValue={data?.body}
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
          "Edit"
        )}
      </Button>
    </Form>
  );
};
