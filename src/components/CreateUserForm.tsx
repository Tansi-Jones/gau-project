"use client";

import { Button, Field, Input, Label } from "@headlessui/react";
import Form from "next/form";
import { useTransition } from "react";
import Image from "next/image";
import { createUser } from "@/actions/users";
import { toast } from "sonner";

export default function CreateUserForm() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: FormData) => {
    await createUser(e)
      .then((data) => {
        if (data?.type === "error") return toast.error(data.message);
        toast.success(data.message);
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  return (
    <Form
      action={(e) => startTransition(() => handleSubmit(e))}
      className="mx-auto lg:w-5/6 xl:w-2/4 space-y-5 px-3 lg:px-0 my-10"
    >
      <Field className="flex flex-col">
        <Label htmlFor="name" className="text-primary font-medium">
          Name
        </Label>
        <Input
          type="text"
          id="name"
          name="name"
          required
          className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
        />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="email" className="text-primary font-medium">
          Email
        </Label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
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
