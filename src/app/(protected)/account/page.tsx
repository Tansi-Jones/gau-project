import { Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Announcement } from "../../../../types/common.types";
import {
  getAllAnnouncements,
  getAnnouncementsByAnnouncers,
} from "@/actions/announcements";
import { BellIcon } from "@heroicons/react/24/outline";
import { auth } from "@/auth";
import { FilterAnnoucement } from "@/components/FilterAnnoucement";

export default async function Announcer() {
  const session = await auth();
  const announcementsByAnnouncer: Announcement[] =
    await getAnnouncementsByAnnouncers();
  const announcements: Announcement[] = await getAllAnnouncements();

  const announcement =
    session?.user?.role === "Admin" ? announcements : announcementsByAnnouncer;

  return (
    <main className="mx-auto w-full flex lg:w-5/6 xl:w-2/3 gap-8 mt-5 mb-28 p-5">
      <section className="hidden min-w-48 w-48 h-52 lg:flex flex-col items-center gap-2 rounded-xl bg-white p-5">
        <Image
          src="/assets/avatar.svg"
          alt="avatar"
          width={80}
          height={80}
          className="object-cover"
        />
        <div className="w-[4.5rem] flex items-center justify-center rounded-full py-0.5 px-1 bg-teal-100">
          <p className="text-teal-500 uppercase font-medium text-[0.6rem] text-center">
            {session?.user?.role}
          </p>
        </div>
        <p className="text-sm text-primary"> {session?.user?.name}</p>
        <p className="text-xs text-primary/40"> {session?.user?.email}</p>
      </section>

      <section className="space-y-5 w-full">
        <div className="flex items-center justify-end">
          <Link href="/account/announcement/create">
            <Button className="bg-primary text-sm flex items-center gap-1 text-white px-2 py-1.5 rounded-md">
              <BellIcon className="size-5 text-white" />
              <span>Create announcement</span>
            </Button>
          </Link>
        </div>
        <FilterAnnoucement announcementsByAnnouncer={announcement} />
      </section>
    </main>
  );
}
