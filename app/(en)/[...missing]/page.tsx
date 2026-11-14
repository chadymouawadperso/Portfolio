import { notFound } from "next/navigation";

/** Any address with no page of its own shows the branded "page not found" screen (with a 404 status). */
export default function Missing() {
  notFound();
}
