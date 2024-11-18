import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CreateUserForm from "@/components/CreateUserForm";

export default async function Create() {
  const session = await auth();
  if (session?.user?.role !== "Admin") redirect("/account");

  return <CreateUserForm />;
}
