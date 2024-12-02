"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    if (form) form.reset();
  };

  return (
    <button type="reset" onClick={reset}>
      <Link href="/" className="search-btn text-primary">
        <XMarkIcon className="size-5 text-primary" />
      </Link>
    </button>
  );
};
