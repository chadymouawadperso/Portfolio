import "../../../inner.css";
import "../../../playbooks.css";
import Playbooks from "@/components/Playbooks";
import { playbooksMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return playbooksMetadata("fr");
}

export default function Page() {
  return <Playbooks lang="fr" />;
}
