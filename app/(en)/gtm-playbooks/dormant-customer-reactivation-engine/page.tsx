import "../../../inner.css";
import "../../../pb.css";
import "../../../pb-dr.css";
import PlaybookDormantReactivation from "@/components/PlaybookDormantReactivation";
import { pbDrMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return pbDrMetadata("en");
}

export default function Page() {
  return <PlaybookDormantReactivation lang="en" />;
}
