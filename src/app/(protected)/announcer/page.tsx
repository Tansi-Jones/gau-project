import { Annoucement } from "@/components/Annoucement";
import { annoucements } from "@/constant";
import { Button } from "@headlessui/react";
import Image from "next/image";

export default function Announcer() {
  return (
    <main className="mx-auto w-full flex justify-between lg:w-5/6 xl:w-2/3 gap-8 mt-5 mb-28 p-5">
      <section className="hidden w-48 h-52 sm:flex flex-col items-center gap-2 rounded-xl bg-white p-5">
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

      <section className="space-y-5">
        <div className="flex items-center justify-end">
          <Button className="bg-primary text-sm text-white px-2 py-1.5 rounded-md">
            Create announcement
          </Button>
        </div>
        <div className="space-y-5">
          {annoucements?.map((annoucement, index) => (
            <Annoucement
              key={index}
              title={annoucement?.title}
              description={annoucement?.description}
              startDate={annoucement?.startDate}
              endDate={annoucement?.endDate}
              hasPriority={annoucement?.hasPriority}
              annoucer={annoucement?.annoucer}
              image={annoucement?.image}
              link={annoucement?.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
