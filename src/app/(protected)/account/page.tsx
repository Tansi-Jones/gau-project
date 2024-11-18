import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Annoucement } from "@/components/Annoucement";
import { Button } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { Announcement } from "../../../../types/common.types";
import { getAnnouncements } from "@/actions/announcements";
import { BellIcon, BellSlashIcon } from "@heroicons/react/24/outline";

export default async function Announcer() {
  const announcements: Announcement[] = await getAnnouncements();

  const tabMenu = [
    {
      name: "Current",
    },
    {
      name: "Expired",
    },
    {
      name: "Archived",
    },
  ];

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
        <div className="w-[4.5rem] flex items-center rounded-full py-0.5 px-1 bg-teal-100">
          <p className="text-teal-500 font-medium text-[0.6rem] text-center">
            ANNOUNCER
          </p>
        </div>
        <p className="text-sm text-primary">Ibrahim Ersan</p>
        <p className="text-xs text-primary/40">ibrahimersan@gau.edu.tr</p>
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
              {announcements?.length === 0 ? (
                <div className="flex items-center justify-center flex-col py-5">
                  <BellSlashIcon className="size-24 md:size-32 text-primary/20" />
                  <p className="text-primary/60">No Announcements</p>
                </div>
              ) : (
                <div className="space-y-5 rounded-xl bg-primary/5 p-3">
                  {announcements?.map((annoucement, index) => (
                    <Annoucement
                      key={index}
                      title={annoucement?.title}
                      body={annoucement?.body}
                      startDate={annoucement?.startDate}
                      endDate={annoucement?.endDate}
                      isUrgent={annoucement?.isUrgent}
                      announcer={annoucement?.announcer}
                      image={annoucement?.image}
                      link={annoucement?.id as string}
                    />
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {announcements?.length === 0 ? (
                <div className="flex items-center justify-center flex-col py-5">
                  <BellSlashIcon className="size-24 md:size-32 text-primary/20" />
                  <p className="text-primary/60">No Announcements</p>
                </div>
              ) : (
                <div className="space-y-5 rounded-xl bg-primary/5 p-3">
                  {announcements?.map((annoucement, index) => (
                    <Annoucement
                      key={index}
                      title={annoucement?.title}
                      body={annoucement?.body}
                      startDate={annoucement?.startDate}
                      endDate={annoucement?.endDate}
                      isUrgent={annoucement?.isUrgent}
                      announcer={annoucement?.announcer}
                      image={annoucement?.image}
                      link={annoucement?.id as string}
                    />
                  ))}
                </div>
              )}
            </TabPanel>
            <TabPanel>
              {announcements?.length === 0 ? (
                <div className="flex items-center justify-center flex-col py-5">
                  <BellSlashIcon className="size-24 md:size-32 text-primary/20" />
                  <p className="text-primary/60">No Announcements</p>
                </div>
              ) : (
                <div className="space-y-5 rounded-xl bg-primary/5 p-3">
                  {announcements?.map((annoucement, index) => (
                    <Annoucement
                      key={index}
                      title={annoucement?.title}
                      body={annoucement?.body}
                      startDate={annoucement?.startDate}
                      endDate={annoucement?.endDate}
                      isUrgent={annoucement?.isUrgent}
                      announcer={annoucement?.announcer}
                      image={annoucement?.image}
                      link={annoucement?.id as string}
                    />
                  ))}
                </div>
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </section>
    </main>
  );
}
