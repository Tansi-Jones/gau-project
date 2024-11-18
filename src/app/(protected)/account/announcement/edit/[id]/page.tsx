import { EditAnnouncementForm } from "@/components/EditAnnouncement";
import { Announcement } from "../../../../../../../types/common.types";
import { getAnnouncementById } from "@/actions/announcements";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function Edit({ params }: PageProps) {
  const id = (await params).id;
  const user: Announcement = await getAnnouncementById(id);

  return <EditAnnouncementForm id={id} data={user} />;
}
