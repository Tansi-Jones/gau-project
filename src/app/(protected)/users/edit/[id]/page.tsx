import { getUserById } from "@/actions/users";
import { EditUserForm } from "@/components/EditUserForm";
import { User } from "../../../../../../types/common.types";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Edit({ params }: PageProps) {
  const id = (await params).id;
  const user: User = await getUserById(id);

  return <EditUserForm id={id} data={user} />;
}
