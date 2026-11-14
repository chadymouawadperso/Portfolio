import "../inner.css";
import NotFound from "@/components/NotFound";

export const metadata = { title: "Page not found · Chady Mouawad", alternates: {}, robots: { index: false, follow: true } };

export default function Page() {
  return <NotFound lang="en" />;
}
