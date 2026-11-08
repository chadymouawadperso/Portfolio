import "../globals.css";
import { pageMetadata } from "@/lib/meta";
export { viewport } from "@/lib/meta";

export const revalidate = 60;
export async function generateMetadata() {
  return pageMetadata("en");
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/assets/archivo.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
