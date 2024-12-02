"use client";

import { Button, Input } from "@headlessui/react";
import Form from "next/form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { SearchFormReset } from "./SearchFormReset";
import { useSearchParams } from "next/navigation";

export const SearchForm = () => {
  const query = useSearchParams().get("query") as string;

  return (
    <Form
      action="/"
      className="search-form bg-white py-1 pl-4 pr-1 rounded-full flex items-center justify-between mx-auto w-72 md:w-96 gap-2"
      scroll={false}
    >
      <Input
        placeholder="Search..."
        type="text"
        name="query"
        defaultValue={query}
        className="bg-transparent outline-none w-44 md:w-80 text-primary text-base"
      />

      <div className="flex items-center gap-2">
        {query && <SearchFormReset />}
        <Button
          type="submit"
          className="bg-primary rounded-full p-1 w-8 h-8 flex items-center justify-center"
        >
          <MagnifyingGlassIcon className="size-4 text-white" />
        </Button>
      </div>
    </Form>
  );
};
