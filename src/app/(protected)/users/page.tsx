import { Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { getUsers } from "@/actions/users";
import { User as UserProp } from "../../../../types/common.types";
import { User } from "@/components/User";
import { UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Users() {
  const session = await auth();
  const users: UserProp[] = await getUsers();

  if (session?.user?.role !== "Admin") redirect("/account");

  return (
    <main className="mx-auto w-full flex lg:w-5/6 xl:w-2/3 gap-8 mt-5 mb-28 p-5">
      <section className="hidden w-48 h-52 lg:flex flex-col items-center gap-2 rounded-xl bg-white p-5">
        <Image
          src="/assets/avatar.svg"
          alt="avatar"
          width={80}
          height={80}
          className="object-cover"
        />
        <div className="w-[4.5rem] flex justify-center items-center rounded-full py-0.5 px-1 bg-teal-100">
          <p className="text-teal-500 uppercase font-medium text-[0.6rem] text-center">
            {session?.user?.role}
          </p>
        </div>
        <p className="text-sm text-primary"> {session?.user?.name}</p>
        <p className="text-xs text-primary/40"> {session?.user?.email}</p>
      </section>

      <section className="space-y-5 flex-grow">
        <div className="flex items-center justify-end">
          <Link href="/users/create">
            <Button className="bg-primary text-sm flex items-center gap-1 text-white px-2 py-1.5 rounded-md">
              <UserIcon className="size-5 text-white" />
              <span>Add user</span>
            </Button>
          </Link>
        </div>

        <div className="space-y-3">
          {users?.length === 0 ? (
            <div className="flex items-center justify-center flex-col">
              <UserGroupIcon className="size-24 md:size-32 text-primary/20" />
              <p className="text-primary/60">No users</p>
            </div>
          ) : (
            users?.map((user, index) => (
              <User key={index} name={user?.name} id={user?.id} />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
