import React from "react";
import { Announcement } from "../../types/common.types";
import { BellSlashIcon } from "@heroicons/react/24/outline";
import { Annoucement } from "./Annoucement";

export const SearchAnnoucements = ({
  announcements,
  query,
}: {
  query: string;
  announcements: Announcement[];
}) => {
  const searchedAnnouncements = query
    ? announcements?.filter(
        (annoucement) =>
          annoucement.title?.toLowerCase()?.includes(query?.toLowerCase()) ||
          annoucement.announcer?.toLowerCase()?.includes(query?.toLowerCase())
      )
    : announcements;

  return (
    <section className="space-y-5">
      {searchedAnnouncements?.length > 0 ? (
        searchedAnnouncements?.map((annoucement: Announcement, index) => (
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
        ))
      ) : (
        <div className="flex items-center justify-center flex-col py-5">
          <BellSlashIcon className="size-24 md:size-32 text-primary/20" />
          <p className="text-primary/60">No Announcements Yet!</p>
        </div>
      )}
    </section>
  );
};
