import { UserCircleIcon } from "@heroicons/react/24/solid";
import { CalendarIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  description: string;
  image: string;
  startDate: string;
  endDate: string;
  annoucer: string;
  hasPriority: boolean;
  link: string;
};

export const Annoucement = ({
  title,
  description,
  endDate,
  startDate,
  image,
  annoucer,
  hasPriority,
  link,
}: Props) => {
  return (
    <Link href={`/${link}`} className="block">
      <article className="flex gap-4 bg-white rounded-xl h-40 p-2">
        <div className="h-full w-56 relative">
          <Image
            src={image || "/assets/placeholder.png"}
            fill
            className="object-cover overflow-auto rounded-lg"
            alt="img"
          />
        </div>

        <div className="w-full pr-2 py-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <UserCircleIcon className="size-5 text-primary/30" />
              <p className="text-xs text-primary/60">{annoucer}</p>
            </div>

            {hasPriority && (
              <div className="flex items-center rounded-full py-0.5 px-2 bg-rose-200">
                <p className="text-rose-500 font-medium text-[0.6rem]">
                  IMPORTANT
                </p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="text-primary text-xl font-semibold">{title}</h1>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-5 text-primary/30" />
                <p className="text-xs text-primary/50">{startDate}</p>
              </div>
              <p className="text-gray-400"> - </p>
              <div className="flex items-center gap-1">
                <p className="text-xs text-primary/50">Expires on {endDate}</p>
              </div>
            </div>

            <p className="text-primary/50 text-sm">
              {description.slice(0, 100)}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};
