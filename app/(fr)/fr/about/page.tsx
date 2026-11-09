import "../../../inner.css";
import "../../../about.css";
import About from "@/components/About";
import { aboutMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return aboutMetadata("fr");
}

export default function Page() {
  return <About lang="fr" />;
}
