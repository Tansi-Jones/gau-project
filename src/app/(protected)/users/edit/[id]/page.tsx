import { getUserById } from "@/actions/users";
import { EditUserForm } from "@/components/EditUserForm";
import { User } from "../../../../../../types/common.types";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Edit({ params }: PageProps) {
  const session = await auth();
  const id = (await params).id;
  const user: User = await getUserById(id);

  if (session?.user?.role !== "Admin") redirect("/account");

  return <EditUserForm id={id} data={user} />;
}
