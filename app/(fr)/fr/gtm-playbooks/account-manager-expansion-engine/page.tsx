import "../../../../inner.css";
import "../../../../pb.css";
import "../../../../pb-am.css";
import PlaybookAccountExpansion from "@/components/PlaybookAccountExpansion";
import { pbAmMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return pbAmMetadata("fr");
}

export default function Page() {
  return <PlaybookAccountExpansion lang="fr" />;
}
