import { auth } from "@/auth";
import { CreateAnnouncements } from "@/components/CreateAnnoucement";

export default async function page() {
  const session = await auth();

  return <CreateAnnouncements role={session?.user?.role as string} />;
}
