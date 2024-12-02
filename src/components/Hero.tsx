import { Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";
import { LogoutButton } from "./LogoutButton";
import { SearchForm } from "./SearchForm";

export const Hero = async () => {
  const session = await auth();

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
          <Link href="/">
            <Image
              src="/logo/logo-white.png"
              alt="gau logo"
              width={100}
              height={100}
              className="object-cover -z-10"
            />
          </Link>
          {session?.user?.id ? (
            <div className="flex items-center gap-3">
              <LogoutButton />
              <Button className="bg-white text-sm rounded-md py-1 px-3">
                <Link href="/account">Account</Link>
              </Button>
            </div>
          ) : (
            <Button className="bg-white text-sm rounded-md py-1 px-3">
              <Link href="/auth/login">Login</Link>
            </Button>
          )}
        </div>

        <div className="space-y-8">
          <h1 className="uppercase text-center text-xl md:text-2xl font-bold text-white">
            annoucements
          </h1>

          <SearchForm />
        </div>
      </nav>
    </header>
  );
};
