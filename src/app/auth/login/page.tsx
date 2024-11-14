import { Button, Field, Input, Label } from "@headlessui/react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";

export default function Create() {
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

      <Form action="" className="mx-auto md:w-2/6 space-y-5 px-3 lg:px-0 my-10">
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
            required
            className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
          />
        </Field>
        <Field className="flex flex-col">
          <Label htmlFor="password" className="text-primary font-medium">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            required
            className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
          />
        </Field>

        <Button
          type="submit"
          className="bg-primary text-white w-full rounded-lg p-2"
        >
          Login
        </Button>
      </Form>
    </main>
  );
}
