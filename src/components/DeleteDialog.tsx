"use client";

import { deleteAnnouncementById } from "@/actions/announcements";
import {
  Button,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import Image from "next/image";
import { useState, useTransition } from "react";
import { toast } from "sonner";

type Props = {
  idValue: string;
  route: string;
};

export const DeleteDialog = ({ idValue, route }: Props) => {
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteAnnouncement = async () => {
    await deleteAnnouncementById(idValue)
      .then((data) => {
        if (data?.type === "error") return toast.error(data.message);
        toast.success(data.message);
        return setIsOpen(!isOpen);
      })
      .catch(() => toast.error("Something went wrong!"));
  };

  const handleDeleteUser = async () => {
    await deleteAnnouncementById(idValue)
      .then((data) => {
        if (data?.type === "error") return toast.error(data?.message);
        toast.success(data?.message);
        return setIsOpen(!isOpen);
      })
      .catch(() => toast.error("Something went wrong!"));
  };

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
        <DialogBackdrop className="fixed inset-0 bg-black/80" />
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-base/7 capitalize font-medium text-primary"
              >
                <span>Delete</span> <span>{route}!</span>
              </DialogTitle>
              <p className="mt-2 text-sm/6 text-primary/50">
                {route === "user"
                  ? " Are you sure you want to delete this user? All announcements will be archived & this action cannot be undone."
                  : "Are you sure you want to delete this annoucement? This action cannot be undone."}
              </p>
              <div className="mt-4">
                <Form
                  action={() =>
                    startTransition(() => {
                      if (route === "user") return handleDeleteUser();
                      return handleDeleteAnnouncement();
                    })
                  }
                >
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="inline-flex text-white items-center justify-center gap-2 rounded-md bg-rose-600 py-1.5 px-3 w-36 text-sm/6 font-medium shadow-inner shadow-rose/10 focus:outline-none data-[hover]:bg-rose-700  data-[open]:bg-rose-700"
                  >
                    {isPending ? (
                      <Image
                        src="/assets/loader.svg"
                        alt="loader"
                        width={23}
                        height={23}
                        sizes="100vh"
                        className="animate-spin"
                      />
                    ) : (
                      "Confirm & Delete"
                    )}
                  </Button>
                </Form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};
