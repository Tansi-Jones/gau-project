"use client";

import { UserCircleIcon } from "@heroicons/react/24/solid";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  EllipsisHorizontalIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { DeleteDialog } from "./DeleteDialog";
import { Announcement } from "../../types/common.types";
import { usePathname } from "next/navigation";

export const Annoucement = ({
  title,
  body,
  endDate,
  startDate,
  image,
  announcer,
  isUrgent,
  id,
}: Announcement) => {
  const path = usePathname();

  return (
    <article className="flex gap-2.5 md:gap-4 bg-white rounded-xl h-36 md:h-40 p-2">
      <div className="h-full w-56 relative">
        <Image
          src={image || "/assets/placeholder.png"}
          fill
          className="object-cover overflow-auto rounded-lg"
          alt="img"
        />
      </div>

      <div className="w-full pr-2 py-1 space-y-1">
        <div className="flex items-center justify-end sm:justify-between">
          <div className="hidden sm:flex items-center gap-1">
            <UserCircleIcon className="size-5 text-primary/30" />
            <p className="text-xs text-primary/60">{announcer}</p>
          </div>

          <div className="flex items-center justify-end w-full sm:w-auto gap-5">
            {!!isUrgent && (
              <div className="flex items-center rounded-full py-0.5 px-2 bg-rose-200">
                <p className="text-rose-500 font-medium text-[0.6rem]">
                  URGENT
                </p>
              </div>
            )}

            {path.indexOf("/account") !== -1 && (
              <Menu>
                <MenuButton className="bg-gray-100 transition-all hover:bg-gray-300 p-1 rounded-lg flex items-center justify-between">
                  <EllipsisHorizontalIcon className="inline size-4 text-primary/70" />
                </MenuButton>

                <MenuItems
                  anchor="bottom end"
                  className="bg-white px-1 py-2 space-y-1 rounded-lg w-36 border shadow"
                >
                  <MenuItem>
                    <Link href={`/account/announcement/edit/${id}`}>
                      <div className="flex items-center gap-2 hover:bg-primary/5 cursor-pointer rounded-lg p-2">
                        <PencilIcon className="size-4 text-primary/70" />
                        <p className="text-sm text-primary/70">Edit</p>
                      </div>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <DeleteDialog idValue={id as string} route="announcement" />
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Link href={`/annoucements/${id}`} className="block hover:underline">
            <h1 className="text-primary text-lg md:text-xl font-semibold">
              {title}
            </h1>
          </Link>
          <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
            <div className="flex items-center gap-1">
              <CalendarIcon className="size-5 text-primary/30" />
              <p className="text-xs text-primary/50">{startDate}</p>
            </div>
            <p className="text-gray-400 hidden md:block"> - </p>
            <div className="hidden sm:flex items-center gap-1">
              <p className="text-xs text-primary/50">Expires on {endDate}</p>
            </div>
          </div>

          <p className="text-primary/50 text-sm hidden md:block">
            {body?.slice(0, 70)}...
          </p>
        </div>
      </div>
    </article>
  );
};
