"use client";

import { useEffect, useState } from "react";
import type { Dict, Lang } from "@/lib/i18n";
import type { Links } from "@/lib/content";
import { Monogram } from "./Icons";

// The five playbook pages, in the order of the GTM Playbooks page. Titles stay in English in both languages.
const PLAYBOOKS: [string, string][] = [
  ["The High-Intent Website Visitor Engine", "high-intent-website-visitor-engine"],
  ["The Competitor Takeout Engine", "competitor-takeout-engine"],
  ["The Event & Webinar-to-Pipeline Engine", "event-webinar-to-pipeline-engine"],
  ["The Account Manager Expansion Engine", "account-manager-expansion-engine"],
  ["The Dormant Customer Reactivation Engine", "dormant-customer-reactivation-engine"],
];

function Chevron() {
  return (
    <svg viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
      <path d="M2.5 4.5 L6 8 L9.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Props = { t: Dict; lang: Lang; links: Links; current?: string; paths?: { en: string; fr: string } };

export default function Header({ t, lang, links: LINKS, current, paths = { en: "/", fr: "/fr" } }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dd, setDd] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Playbooks dropdown: opens on hover (CSS) or with the arrow button; Escape or a click outside closes it.
  useEffect(() => {
    if (!dd) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDd(false);
    const onDown = (e: MouseEvent) => !(e.target as Element).closest(".nav-dd") && setDd(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [dd]);

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

  const pbPath = (slug: string) => `${LINKS.playbooks}/${slug}`;
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
            {nav.map(([label, href]) =>
              href === LINKS.playbooks ? (
                <div key={href} className={"nav-dd" + (dd ? " open" : "")}>
                  <a href={href} aria-current={href === current ? "page" : undefined}>{label}</a>
                  <button type="button" className="nav-dd-b" aria-expanded={dd} aria-controls="nav-pb" aria-label={t.nav_pb_menu} onClick={() => setDd((o) => !o)}>
                    <Chevron />
                  </button>
                  <ul className="nav-dd-m" id="nav-pb">
                    {PLAYBOOKS.map(([title, slug]) => (
                      <li key={slug}><a href={pbPath(slug)}>{title}</a></li>
                    ))}
                  </ul>
                </div>
              ) : (
                <a key={href} href={href} aria-current={href === current ? "page" : undefined}>{label}</a>
              )
            )}
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
          <div key={href} className="mobile-item">
            <a href={href} aria-current={href === current ? "page" : undefined}>{label}</a>
            {href === LINKS.playbooks ? (
              <ul className="mobile-sub">
                {PLAYBOOKS.map(([title, slug]) => <li key={slug}><a href={pbPath(slug)}>{title}</a></li>)}
              </ul>
            ) : null}
          </div>
        ))}
        <a className="btn" href={LINKS.linkedin}><span>{t.cta_connect}</span></a>
      </nav>
    </>
  );
}
