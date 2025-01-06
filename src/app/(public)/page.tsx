import { getCurrentAnnouncements } from "@/actions/announcements";
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
      </section>

      <SearchAnnoucements
        announcements={announcements}
        query={query as string}
      />
    </main>
  );
}
