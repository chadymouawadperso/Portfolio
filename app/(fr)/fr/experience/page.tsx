import "../../../inner.css";
import "../../../experience.css";
import Experience from "@/components/Experience";
import { expMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return expMetadata("fr");
}

export default function Page() {
  return <Experience lang="fr" />;
}
