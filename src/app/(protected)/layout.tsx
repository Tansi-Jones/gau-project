import { Button } from "@headlessui/react";
import Image from "next/image";

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="bg-white flex items-center justify-between w-full px-3 md:px-5 lg:px-16 py-1">
        <Image
          src="/logo/logo-blue.png"
          alt="gau logo"
          width={100}
          height={100}
          className="object-cover"
        />
        <div className="flex items-center gap-5">
          <Button className="text-rose-500 hover:bg-rose-100 transition-all du text-sm rounded-md py-1 px-3">
            Logout
          </Button>
          <Image
            src="/assets/avatar.svg"
            alt="avatar"
            width={30}
            height={30}
            className="object-cover"
          />
        </div>
      </nav>

      <header className="relative w-full h-32">
        <div className="w-full h-full bg-primary/50">
          <Image
            src="/assets/background.jpg"
            alt="background"
            fill
            className="object-cover -z-10"
          />
        </div>

        <div className="z-10 absolute top-10 w-full">
          <h1 className="uppercase text-center text-2xl font-bold text-white">
            Good afternoon 👋
          </h1>
        </div>
      </header>
      {children}
    </>
  );
}
