import "../../../../inner.css";
import "../../../../pb-wv.css";
import PlaybookWebsiteVisitor from "@/components/PlaybookWebsiteVisitor";
import { pbWvMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return pbWvMetadata("fr");
}

export default function Page() {
  return <PlaybookWebsiteVisitor lang="fr" />;
}
