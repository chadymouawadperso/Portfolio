import "../../../../inner.css";
import "../../../../pb.css";
import "../../../../pb-ct.css";
import PlaybookCompetitorTakeout from "@/components/PlaybookCompetitorTakeout";
import { pbCtMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return pbCtMetadata("fr");
}

export default function Page() {
  return <PlaybookCompetitorTakeout lang="fr" />;
}
