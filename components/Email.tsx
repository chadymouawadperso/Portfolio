"use client";

import { useEffect, useState } from "react";

// The address is assembled in the browser, so it never appears whole in the page source for spam bots.
// Before that (or without JavaScript) it reads "user [at] domain".
export default function Email({ user, domain }: { user: string; domain: string }) {
  const [addr, setAddr] = useState<string | null>(null);
  useEffect(() => setAddr(`${user}@${domain}`), [user, domain]);
  if (!addr) return <span>{user} [at] {domain}</span>;
  return <a href={`mailto:${addr}`}>{addr}</a>;
}
