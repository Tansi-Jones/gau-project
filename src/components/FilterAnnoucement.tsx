"use client";

import { getCurrentDate } from "@/utils/format";
import { Announcement } from "../../types/common.types";
import {
  Input,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import { BellSlashIcon } from "@heroicons/react/24/outline";
import { Annoucement } from "./Annoucement";
import { useState } from "react";

const tabMenu = [
  {
    name: "Current",
  },
  {
    name: "Expired",
  },
];

export const FilterAnnoucement = ({
  announcementsByAnnouncer,
}: {
  announcementsByAnnouncer: Announcement[];
}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const currentAnnouncements = announcementsByAnnouncer?.filter(
    (announcement) => announcement.startDate >= getCurrentDate()
  );

  const expiredAnnouncements = announcementsByAnnouncer?.filter(
    (announcement) => announcement.endDate < getCurrentDate()
  );

  const filteredCurrentAnnouncements = currentAnnouncements
    ? currentAnnouncements?.filter((annoucement) =>
        annoucement.title?.toLowerCase()?.includes(searchKeyword?.toLowerCase())
      )
    : currentAnnouncements;

  const filteredExpiredAnnouncements = expiredAnnouncements
    ? expiredAnnouncements?.filter((annoucement) =>
        annoucement.title?.toLowerCase()?.includes(searchKeyword?.toLowerCase())
      )
    : expiredAnnouncements;

  return (
    <TabGroup>
      <TabList className="flex gap-4">
        {tabMenu.map(({ name }) => (
          <Tab
            key={name}
            className="rounded-full py-1 px-3 text-sm/6 font-semibold text-primary focus:outline-none data-[selected]:bg-primary/10 data-[hover]:bg-primary/5 data-[selected]:data-[hover]:bg-primary/10 data-[focus]:outline-1 data-[focus]:outline-primary"
          >
            {name}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="mt-3">
        <TabPanel>
          <div className="flex items-center justify-end my-5">
            <Input
              type="search"
              id="current"
              name="current"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search ..."
              className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border border-primary/30 rounded-lg py-1 px-2"
            />
          </div>

          {filteredCurrentAnnouncements?.length === 0 ? (
            <div className="flex items-center justify-center flex-col py-5">
              <BellSlashIcon className="size-24 md:size-32 text-primary/20" />
              <p className="text-primary/60">No Current Announcements</p>
            </div>
          ) : (
            <div className="space-y-5 rounded-xl bg-primary/5 p-3">
              {filteredCurrentAnnouncements?.map((annoucement, index) => (
                <Annoucement
                  key={index}
                  title={annoucement?.title}
                  body={annoucement?.body}
                  startDate={annoucement?.startDate}
                  endDate={annoucement?.endDate}
                  isUrgent={annoucement?.isUrgent}
                  announcer={annoucement?.announcer}
                  image={annoucement?.image}
                  id={annoucement?.id as string}
                />
              ))}
            </div>
          )}
        </TabPanel>
        <TabPanel>
          <div className="flex items-center justify-end my-5">
            <Input
              type="search"
              id="expired"
              name="expired"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search ..."
              className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border border-primary/30 rounded-lg py-1 px-2"
            />
          </div>
          {filteredExpiredAnnouncements?.length === 0 ? (
            <div className="flex items-center justify-center flex-col py-5">
              <BellSlashIcon className="size-24 md:size-32 text-primary/20" />
              <p className="text-primary/60">No Expired Announcements</p>
            </div>
          ) : (
            <div className="space-y-5 rounded-xl bg-primary/5 p-3">
              {filteredExpiredAnnouncements?.map((annoucement, index) => (
                <Annoucement
                  key={index}
                  title={annoucement?.title}
                  body={annoucement?.body}
                  startDate={annoucement?.startDate}
                  endDate={annoucement?.endDate}
                  isUrgent={annoucement?.isUrgent}
                  announcer={annoucement?.announcer}
                  image={annoucement?.image}
                  id={annoucement?.id as string}
                />
              ))}
            </div>
          )}
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};
