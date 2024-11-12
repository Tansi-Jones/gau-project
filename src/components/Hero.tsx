import { Button, Input } from "@headlessui/react";
import Image from "next/image";
import Form from "next/form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const Hero = () => {
  return (
    <header className="relative w-full h-60">
      <div className="w-full h-full bg-primary/50">
        <Image
          src="/assets/background.jpg"
          alt="background"
          fill
          className="object-cover -z-10"
        />
      </div>

      <nav className="px-3 md:px-20 py-1 z-10 absolute top-0 w-full space-y-8">
        <div className="flex items-center justify-between w-full">
          <Image
            src="/logo/logo-white.png"
            alt="gau logo"
            width={100}
            height={100}
            className="object-cover -z-10"
          />
          <Button className="bg-white text-sm rounded-md py-1 px-3">
            Login
          </Button>
        </div>

        <div className="space-y-8">
          <h1 className="uppercase text-center text-xl md:text-2xl font-bold text-white">
            annoucements
          </h1>

          <Form
            action=""
            className="bg-white py-1 pl-4 pr-1 rounded-full flex items-center justify-between mx-auto w-72 md:w-96 gap-2"
          >
            <Input
              placeholder="Search..."
              type="search"
              className="bg-transparent outline-none w-52 md:w-80 text-primary text-base"
            />
            <Button className="bg-primary rounded-full p-1 w-8 h-8 flex items-center justify-center">
              <MagnifyingGlassIcon className="size-4 text-white" />
            </Button>
          </Form>
        </div>
      </nav>
    </header>
  );
};
