"use client";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export const DeleteDialog = () => {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center w-full gap-2 hover:bg-rose-100 cursor-pointer rounded-lg p-2"
      >
        <TrashIcon className="size-4 text-rose-500" />
        <p className="text-sm text-rose-500">Delete</p>
      </Button>

      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpen(false)}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-primary/5 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 font-medium text-primary"
              >
                Delete Announcement!
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-primary/50">
                Are you sure to want to delete this annoucement? This action
                cannot be undone.
              </p>
              <div className="mt-4">
                <Button className="inline-flex text-white items-center gap-2 rounded-md bg-rose-600 py-1.5 px-3 text-sm/6 font-medium shadow-inner shadow-rose/10 focus:outline-none data-[hover]:bg-rose-700  data-[open]:bg-rose-700">
                  Confirm & Delete
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
