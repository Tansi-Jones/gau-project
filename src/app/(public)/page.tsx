import { getCurrentAnnouncements } from "@/actions/announcements";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  CalendarDateRangeIcon,
  ChevronDownIcon,
  FunnelIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { Announcement } from "../../../types/common.types";
import { SearchAnnoucements } from "@/components/SearchAnnoucements";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const announcements: Announcement[] = await getCurrentAnnouncements();

  return (
    <main className="mx-auto w-full md:w-3/4 xl:w-2/5 px-5 md:px-0 mb-28">
      <section className="py-8 flex items-center justify-between">
        <h3 className="text-primary text-lg md:text-xl font-semibold">
          {query
            ? `Search results for "${query}"`
            : `${announcements?.length} Annoucements`}
        </h3>

        <Menu>
          <MenuButton className="bg-white p-2 gap-8 rounded-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FunnelIcon className="size-5 text-primary/70" />
              <span className="hidden md:inline text-sm text-primary/70">
                Sort by
              </span>
            </span>
            <ChevronDownIcon className="hidden md:inline size-4 text-primary/70" />
          </MenuButton>

          <MenuItems
            anchor="bottom end"
            className="bg-white px-1 py-2 space-y-1 rounded-lg w-36 border shadow"
          >
            <MenuItem>
              <div className="flex items-center gap-2 hover:bg-primary/5 cursor-pointer rounded-lg p-2">
                <CalendarDateRangeIcon className="size-5 text-primary/70" />
                <p className="text-sm text-primary/70">Date</p>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex items-center gap-2 hover:bg-primary/5 cursor-pointer rounded-lg p-2">
                <UserIcon className="size-5 text-primary/70" />
                <p className="text-sm text-primary/70">Announcer</p>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </section>

      <SearchAnnoucements
        announcements={announcements}
        query={query as string}
      />
    </main>
  );
}
