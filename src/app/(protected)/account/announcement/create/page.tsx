import { Button, Field, Input, Label, Textarea } from "@headlessui/react";
import Form from "next/form";

export default function Create() {
  const getCurrentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  return (
    <Form
      action=""
      className="mx-auto lg:w-5/6 xl:w-2/4 space-y-5 px-3 lg:px-0 my-10"
    >
      <Field className="flex flex-col">
        <Label htmlFor="title" className="text-primary font-medium">
          Title
        </Label>
        <Input
          type="text"
          id="title"
          required
          className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
        />
      </Field>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Field className="flex flex-col">
          <Label htmlFor="startDate" className="text-primary font-medium">
            Start date
          </Label>
          <Input
            type="date"
            id="startDate"
            required
            defaultValue={getCurrentDate()}
            min={getCurrentDate()}
            className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
          />
        </Field>
        <Field className="flex flex-col">
          <Label htmlFor="endDate" className="text-primary font-medium">
            End date
          </Label>
          <Input
            type="date"
            id="endDate"
            required
            min={getCurrentDate()}
            className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
          />
        </Field>
      </div>
      <Field className="flex flex-col">
        <Label htmlFor="description" className="text-primary font-medium">
          Body
        </Label>
        <Textarea
          id="description"
          required
          rows={4}
          className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2 resize-none"
        />
      </Field>

      <Field className="flex flex-col">
        <Label htmlFor="image" className="text-primary font-medium">
          Image
        </Label>
        <Input
          type="file"
          id="image"
          className="bg-white focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-primary/50 text-primary border rounded-lg p-2"
          accept="image/*"
        />
      </Field>
      <Button
        type="submit"
        className="bg-primary text-white w-full rounded-lg p-2"
      >
        Create
      </Button>
    </Form>
  );
}
