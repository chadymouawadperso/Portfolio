import "../../../inner.css";
import "../../../legal.css";
import Legal from "@/components/Legal";
import { legalMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return legalMetadata("fr");
}

export default function Page() {
  return <Legal lang="fr" />;
}
