"use client";

import { useEffect, useState } from "react";
import type { Dict, Lang } from "@/lib/i18n";
import type { Links } from "@/lib/content";
import { Monogram } from "./Icons";

type Props = { t: Dict; lang: Lang; links: Links; current?: string; paths?: { en: string; fr: string } };

export default function Header({ t, lang, links: LINKS, current, paths = { en: "/", fr: "/fr" } }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth > 960 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const nav = [
    [t.nav_method, LINKS.methodology],
    [t.nav_exp, LINKS.experience],
    [t.nav_pb, LINKS.playbooks],
    [t.nav_about, LINKS.about],
  ];

  return (
    <>
      <header className={"site-header" + (scrolled ? " scrolled" : "")}>
        <div className="wrap header-in">
          <a className="brand" href={current ? (lang === "fr" ? "/fr" : "/") : "#top"} aria-label={t.a_top}>
            <Monogram />
            <span>Chady Mouawad</span>
          </a>
          <nav className="nav" aria-label={t.a_main}>
            {nav.map(([label, href]) => (
              <a key={href} href={href} aria-current={href === current ? "page" : undefined}>{label}</a>
            ))}
          </nav>
          <div className="header-tools">
            <div className="lang" role="group" aria-label={t.a_lang}>
              <a href={paths.en} hrefLang="en" lang="en" aria-current={lang === "en" ? "true" : undefined} className={lang === "en" ? "on" : ""}>EN</a>
              <a href={paths.fr} hrefLang="fr" lang="fr" aria-current={lang === "fr" ? "true" : undefined} className={lang === "fr" ? "on" : ""}>FR</a>
            </div>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? t.menu_close : t.menu_open}
              onClick={() => setOpen((o) => !o)}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                <path d={open ? "M6 6 L18 18 M18 6 L6 18" : "M4 9 H20 M4 15 H20"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <nav className={"mobile-nav" + (open ? " open" : "")} id="mobile-nav" aria-label={t.a_mobile}>
        {nav.map(([label, href]) => (
          <a key={href} href={href} aria-current={href === current ? "page" : undefined}>{label}</a>
        ))}
        <a className="btn" href={LINKS.linkedin}><span>{t.cta_connect}</span></a>
      </nav>
    </>
  );
}
