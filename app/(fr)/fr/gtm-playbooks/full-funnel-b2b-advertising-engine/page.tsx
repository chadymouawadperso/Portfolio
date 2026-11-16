import "../../../../inner.css";
import "../../../../pb.css";
import "../../../../pb-fa.css";
import PlaybookFullFunnelAds from "@/components/PlaybookFullFunnelAds";
import { pbFaMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return pbFaMetadata("fr");
}

export default function Page() {
  return <PlaybookFullFunnelAds lang="fr" />;
}
