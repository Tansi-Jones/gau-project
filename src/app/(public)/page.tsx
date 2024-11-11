import { Annoucement } from "@/components/Annoucement";
import { annoucements } from "@/constant";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  BarsArrowDownIcon,
  BarsArrowUpIcon,
  ChevronDownIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <main className="mx-auto w-full md:w-3/4 xl:w-2/5 px-5 md:px-0 mb-28">
      <section className="py-8 flex items-center justify-between">
        <h3 className="text-primary text-xl font-semibold">20 Annoucements</h3>

        <Menu>
          <MenuButton className="bg-white p-2 gap-8 rounded-lg flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FunnelIcon className="size-5 text-primary/70" />
              <span className="text-sm text-primary/70">Filter by</span>
            </span>
            <ChevronDownIcon className="size-4 text-primary/70" />
          </MenuButton>

          <MenuItems
            anchor="bottom"
            className="bg-white px-1 py-2 space-y-1 rounded-lg w-36 border shadow"
          >
            <MenuItem>
              <div className="flex items-center gap-2 hover:bg-primary/5 cursor-pointer rounded-lg p-2">
                <BarsArrowUpIcon className="size-5 text-primary/70" />
                <p className="text-sm text-primary/70">Ascending</p>
              </div>
            </MenuItem>
            <MenuItem>
              <div className="flex items-center gap-2 hover:bg-primary/5 cursor-pointer rounded-lg p-2">
                <BarsArrowDownIcon className="size-5 text-primary/70" />
                <p className="text-sm text-primary/70">Descending</p>
              </div>
            </MenuItem>
          </MenuItems>
        </Menu>
      </section>

      <section className="space-y-5">
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
      </section>
    </main>
  );
}
