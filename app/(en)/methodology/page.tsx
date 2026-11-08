import "../../methodology.css";
import Methodology from "@/components/Methodology";
import { methodMetadata } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return methodMetadata("en");
}

export default function Page() {
  return <Methodology lang="en" />;
}
