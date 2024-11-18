import {
  EllipsisHorizontalIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";
import { PencilIcon } from "@heroicons/react/24/outline";
import { DeleteDialog } from "./DeleteDialog";
import { User as UserProp } from "../../types/common.types";

export const User = ({ name, id }: UserProp) => {
  return (
    <article className="flex items-center justify-between bg-white rounded-md w-full p-2">
      <div className="flex items-center gap-1">
        <UserCircleIcon className="size-5 text-primary/30" />
        <p className="text-xs text-primary/60">{name}</p>
      </div>

      <Menu>
        <MenuButton className="bg-gray-100 transition-all hover:bg-gray-300 p-1 rounded-lg flex items-center justify-between">
          <EllipsisHorizontalIcon className="inline size-4 text-primary/70" />
        </MenuButton>

        <MenuItems
          anchor="bottom end"
          className="bg-white px-1 py-2 space-y-1 rounded-lg w-36 border shadow"
        >
          <MenuItem>
            <Link href={`/users/edit/${id}`}>
              <div className="flex items-center gap-2 hover:bg-primary/5 cursor-pointer rounded-lg p-2">
                <PencilIcon className="size-4 text-primary/70" />
                <p className="text-sm text-primary/70">Edit</p>
              </div>
            </Link>
          </MenuItem>
          <MenuItem>
            <DeleteDialog />
          </MenuItem>
        </MenuItems>
      </Menu>
    </article>
  );
};
