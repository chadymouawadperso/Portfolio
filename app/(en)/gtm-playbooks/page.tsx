import "../../inner.css";
import "../../playbooks.css";
import Playbooks from "@/components/Playbooks";
import { playbooksMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return playbooksMetadata("en");
}

export default function Page() {
  return <Playbooks lang="en" />;
}
