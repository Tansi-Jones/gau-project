"use client";

import { logIn } from "@/actions/auth";
import { Button, Field, Input, Label } from "@headlessui/react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";

export default function Create() {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: FormData) => {
    const data = await logIn(e);
    if (data?.error) toast.error(data?.error);
    if (data?.success) toast.success(data?.success);
  };

  return (
    <main>
      <nav className="bg-white flex items-center justify-between w-full px-3 md:px-5 lg:px-16 py-1">
        <Link href="/">
          <Image
            src="/logo/logo-blue.png"
            alt="gau logo"
            width={100}
            height={100}
            className="object-cover"
          />
        </Link>
      </nav>

      <Form
        action={(e) => startTransition(() => handleSubmit(e))}
        className="mx-auto sm:w-2/4 lg:w-2/6 space-y-5 px-3 lg:px-0 my-10"
      >
        <div className="text-center">
          <h1 className="text-2xl text-primary font-semibold">Welcome back!</h1>
          <h1 className="text-primary">Login to continue</h1>
        </div>

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
        {/* <Field className="flex flex-col">
          <Label htmlFor="password" className="text-primary font-medium">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            name="password"
            required
            className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
          />
        </Field> */}

        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary flex items-center justify-center text-white w-full rounded-lg p-2"
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
            "Login"
          )}
        </Button>
      </Form>
    </main>
  );
}
