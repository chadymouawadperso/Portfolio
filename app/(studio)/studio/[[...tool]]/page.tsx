import Studio from "./Studio";

export const dynamic = "force-static";
export { viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
