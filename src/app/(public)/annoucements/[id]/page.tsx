import { annoucements } from "@/constant";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Annoucements({ params }: PageProps) {
  const id = (await params).id;
  const annoucement = annoucements?.find(
    (annoucement) => annoucement?.id === id
  );

  return (
    <main className="mx-auto w-full md:w-3/4 xl:w-2/5 space-y-3 rounded-xl mt-8 bg-white mb-28 p-5">
      {annoucement?.hasPriority && (
        <section className="flex items-center justify-end">
          <div className="flex items-center rounded-full py-0.5 px-2 bg-rose-200">
            <p className="text-rose-500 font-medium text-[0.6rem]">IMPORTANT</p>
          </div>
        </section>
      )}

      <section className="space-y-5">
        <h1 className="text-primary text-xl font-semibold">
          {annoucement?.title}
        </h1>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <CalendarIcon className="size-5 text-primary/30" />
              <p className="text-xs text-primary/50">
                {annoucement?.startDate}
              </p>
            </div>
            <p className="text-gray-400"> - </p>
            <div className="flex items-center gap-1">
              <p className="text-xs text-primary/50">
                Expires on {annoucement?.endDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <UserCircleIcon className="size-5 text-primary/30" />
            <p className="text-xs text-primary/60">{annoucement?.annoucer}</p>
          </div>
        </div>

        <p className="text-primary/50 text-sm">{annoucement?.description}</p>

        {annoucement?.image && (
          <div className="h-72 w-full relative">
            <Image
              src={annoucement?.image}
              fill
              className="object-cover overflow-auto rounded-lg"
              alt="img"
            />
          </div>
        )}
      </section>
    </main>
  );
}
