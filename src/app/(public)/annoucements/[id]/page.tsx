import { CalendarIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { Announcement } from "../../../../../types/common.types";
import { getAnnouncementById } from "@/actions/announcements";
import { ImagePreview } from "@/components/ImagePreview";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Annoucements({ params }: PageProps) {
  const id = (await params).id;
  const announcement: Announcement = await getAnnouncementById(id);

  return (
    <main className="mx-auto w-full md:w-3/4 xl:w-2/5 space-y-3 rounded-xl mt-8 bg-white mb-28 p-5">
      {!!announcement?.isUrgent && (
        <section className="flex items-center justify-end">
          <div className="flex items-center rounded-full py-0.5 px-2 bg-rose-200">
            <p className="text-rose-500 font-medium text-[0.6rem]">URGENT</p>
          </div>
        </section>
      )}

      <section className="space-y-5">
        <h1 className="text-primary text-xl font-semibold">
          {announcement?.title}
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <CalendarIcon className="size-5 text-primary/30" />
              <p className="text-xs text-primary/50">
                {announcement?.startDate}
              </p>
            </div>
            <p className="text-gray-400"> - </p>
            <div className="flex items-center gap-1">
              <p className="text-xs text-primary/50">
                Expires on {announcement?.endDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <UserCircleIcon className="size-5 text-primary/30" />
            <p className="text-xs text-primary/60">{announcement?.announcer}</p>
          </div>
        </div>

        <p className="text-primary/50 text-sm">{announcement?.body}</p>

        {announcement?.image && <ImagePreview image={announcement?.image} />}
      </section>
    </main>
  );
}
