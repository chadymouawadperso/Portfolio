import "../../../../inner.css";
import "../../../../pb.css";
import "../../../../pb-ev.css";
import PlaybookEventWebinar from "@/components/PlaybookEventWebinar";
import { pbEvMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return pbEvMetadata("fr");
}

export default function Page() {
  return <PlaybookEventWebinar lang="fr" />;
}
