import { auth } from "@/auth";
import { Button } from "@headlessui/react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import Image from "next/image";

export const Navbar = async () => {
  const session = await auth();

  return (
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

      <div className="flex gap-5">
        <Button
          className={` text-sm text-primary/80 hover:text-primary/70 transition-all`}
        >
          <Link href="/account">Account</Link>
        </Button>

        {session?.user?.role === "Admin" && (
          <Button
            className={` text-sm text-primary/80 hover:text-primary/70 transition-all`}
          >
            <Link href="/users">Users</Link>
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        <LogoutButton />

        <Image
          src="/assets/avatar.svg"
          alt="avatar"
          width={30}
          height={30}
          className="object-cover"
        />
      </div>
    </nav>
  );
};
