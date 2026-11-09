import type { Lang } from "@/lib/i18n";
import { getExperience, type ExpImage } from "@/lib/content";
import Header from "./Header";
import Footer from "./Footer";
import PageInteractions from "./PageInteractions";
import { ArrowDown, ArrowRight, ArrowUpRight } from "./Icons";

const PATHS = { en: "/experience", fr: "/fr/experience" };
const VISIT = {
  pl: "https://www.protolabs.com/",
  wm: "https://www.wminded.com/",
  an: "https://www.facebook.com/AtelierNleb",
};

function Shots({ images }: { images: ExpImage[] }) {
  return (
    <div className="shots">
      {images.map((im) => (
        <figure className="shot" key={im.src}>
          <img src={im.src} width={420} height={420} alt={im.alt} loading="lazy" decoding="async" />
        </figure>
      ))}
    </div>
  );
}

function Strip({ images, caption, visit, href }: { images: ExpImage[]; caption: string; visit: string; href: string }) {
  return (
    <div className="strip" data-reveal>
      <Shots images={images} />
      <div className="strip-cap">
        <p>{caption}</p>
        <a className="link-arrow" href={href} rel="noopener"><span>{visit}</span><ArrowUpRight size={16} /></a>
      </div>
    </div>
  );
}

function Who({ logo, alt, role, kind, an }: { logo: string; alt: string; role: string; kind: string; an?: boolean }) {
  return (
    <div className="who">
      <span className="tile"><img className={an ? "an" : undefined} src={logo} width={56} height={56} alt={alt} /></span>
      <div><b>{role}</b><span>{kind}</span></div>
    </div>
  );
}

export default async function Experience({ lang }: { lang: Lang }) {
  const { base, x, images } = await getExperience(lang);
  const { t, links, experiences } = base;
  const logo = (company: string, fallback: string) => experiences.find((e) => e.company === company)?.logo || fallback;

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <Header t={t} lang={lang} links={links} current={links.experience} paths={PATHS} />

      <main id="main">
        <svg className="thread" id="thread" aria-hidden="true" />

        {/* Top of page */}
        <section className="mh" id="top" aria-labelledby="x-title">
          <div className="wrap mh-grid">
            <div className="mh-main">
              <p className="kicker" data-anchor>{x.eyebrow}</p>
              <h1 id="x-title">
                <span className="tl">{x.h1a}</span>
                <span className="tl">{x.h1b}</span>
                {x.h1c ? <span className="tl">{x.h1c}</span> : null}
              </h1>
              {x.sub ? <p className="subtitle">{x.sub}</p> : null}
              <p className="mh-lead">{x.lead}</p>
              <div className="cta-row">
                <a className="btn" href={links.linkedin}><span>{t.cta_connect}</span><ArrowUpRight /></a>
                <a className="link-arrow" href={links.methodology}><span>{x.cta_think}</span><ArrowRight /></a>
              </div>
            </div>
            <figure className="mh-vis deck" id="deck" aria-hidden="true">
              <div className="deck-in" id="deck-in">
                <a className="card k1" href="#ateliern" tabIndex={-1}><img className="ph" src={images.an[0]?.src} width={520} height={520} alt="" decoding="async" /><span className="cbar"><span className="tile"><img className="an" src={logo("Atelier N", "/assets/logo-ateliern.webp")} width={38} height={38} alt="" /></span><span className="t"><b>Atelier N</b><i>{x.r3}</i></span></span></a>
                <a className="card k2" href="#wminded" tabIndex={-1}><img className="ph" src={images.wm[1]?.src} width={520} height={520} alt="" decoding="async" /><span className="cbar"><span className="tile"><img src={logo("Wminded", "/assets/logo-wminded.webp")} width={38} height={38} alt="" /></span><span className="t"><b>Wminded</b><i>{x.r2}</i></span></span></a>
                <a className="card k3" href="#protolabs" tabIndex={-1}><img className="ph" src={images.pl[1]?.src} width={520} height={520} alt="" decoding="async" /><span className="cbar"><span className="tile"><img src={logo("Protolabs", "/assets/logo-protolabs.webp")} width={38} height={38} alt="" /></span><span className="t"><b>Protolabs</b><i>{x.r1}</i></span></span></a>
              </div>
            </figure>
            <nav className="mh-index" aria-label="Protolabs, Wminded, Atelier N">
              <a href="#protolabs"><strong>Protolabs</strong><ArrowDown /><span className="sub"><b>{x.r1}</b> · {x.r1p}</span></a>
              <a href="#wminded"><strong>Wminded</strong><ArrowDown /><span className="sub"><b>{x.r2}</b> · {x.r2p}</span></a>
              <a href="#ateliern"><strong>Atelier N</strong><ArrowDown /><span className="sub"><b>{x.r3}</b> · {x.r3p}</span></a>
            </nav>
          </div>
        </section>

        {/* Different environments, same problem */}
        <section className="sec think" aria-labelledby="e-title">
          <div className="wrap">
            <h2 className="display think-title" id="e-title" data-reveal>
              <span className="tl">{x.e_a}</span><em className="tl">{x.e_b}</em>
            </h2>
            {x.e_1a ? <p className="subtitle" data-reveal>{x.e_1a}</p> : null}
            <p className="think-sub" data-reveal>{x.e_1b}</p>
            <div className="envs" id="envs" data-reveal>
              <div className="env-row">
                <div className="env"><span className="k">{x.v1k}</span><strong>Protolabs</strong><span>{x.v1}</span></div>
                <div className="env"><span className="k">{x.v2k}</span><strong>Wminded</strong><span>{x.v2}</span></div>
                <div className="env"><span className="k">{x.v3k}</span><strong>Atelier N</strong><span>{x.v3}</span></div>
              </div>
              <svg className="env-links" viewBox="0 0 1000 84" preserveAspectRatio="none" aria-hidden="true">
                <path pathLength={1} d="M60 0 V30 Q60 60 120 60 H470 Q500 60 500 84" vectorEffect="non-scaling-stroke" />
                <path pathLength={1} d="M500 0 V84" vectorEffect="non-scaling-stroke" />
                <path pathLength={1} d="M940 0 V30 Q940 60 880 60 H530 Q500 60 500 84" vectorEffect="non-scaling-stroke" />
              </svg>
              <div className="env-pill"><span>{x.pill}</span></div>
            </div>
          </div>
        </section>

        {/* Protolabs */}
        <section className="sec" id="protolabs" aria-labelledby="pl-title">
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker" data-anchor>Protolabs · {x.r1p}</p>
                <h2 className="display" id="pl-title"><span className="tl">{x.pl_a}</span><span className="tl">{x.pl_b}</span></h2>
              </div>
            </div>
            <div className="role">
              <div className="copy" data-reveal>
                <Who logo={logo("Protolabs", "/assets/logo-protolabs.webp")} alt={x.pl_logo} role={x.r1} kind={x.pl_kind} />
                <p className="cdesc">{x.pl_co}</p>
                <p className="lead">{x.pl_p1}</p>
                <p className="strong">{x.pl_key}</p>
              </div>
              <div className="vis" data-reveal>
                <div className="stat-card">
                  <div className="big"><strong>{x.pl_big}</strong><span>{x.pl_stat}</span></div>
                  <ul className="pillars">
                    <li><b>{x.pl_s2k}</b><span>{x.pl_s2}</span></li>
                    <li><b>{x.pl_s3k}</b><span>{x.pl_s3}</span></li>
                  </ul>
                </div>
              </div>
            </div>
            <Strip images={images.pl} caption={x.pl_cap} visit={x.pl_visit} href={VISIT.pl} />
          </div>
        </section>

        {/* Wminded */}
        <section className="sec" id="wminded" aria-labelledby="wm-title" data-tight>
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker" data-anchor>Wminded · {x.r2p}</p>
                <h2 className="display" id="wm-title"><span className="tl">{x.wm_a}</span><span className="tl">{x.wm_b}</span></h2>
              </div>
            </div>
            <div className="role flip">
              <div className="copy" data-reveal>
                <Who logo={logo("Wminded", "/assets/logo-wminded.webp")} alt={x.wm_logo} role={x.r2} kind={x.wm_kind} />
                <p className="cdesc">{x.wm_co}</p>
                <p className="lead">{x.wm_p1}</p>
                <p className="strong">{x.wm_key}</p>
              </div>
              <div className="vis" data-reveal>
                <div className="funnel" id="funnel">
                  <div className="fbar"><b>{x.wm_s1k}</b><span>{x.wm_s1}</span></div>
                  <div className="fbar"><b>{x.wm_s2k}</b><span>{x.wm_s2}</span></div>
                  <div className="fbar"><b>{x.wm_s3k}</b><span>{x.wm_s3}</span></div>
                  <p className="floop">
                    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 12 A8 8 0 1 1 12 4 M12 4 L16 1 M12 4 L16 7" fill="none" stroke="#8DB0C4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <span>{x.wm_loop}</span>
                  </p>
                </div>
              </div>
            </div>
            <Strip images={images.wm} caption={x.wm_cap} visit={x.wm_visit} href={VISIT.wm} />
          </div>
        </section>

        {/* Atelier N */}
        <section className="sec" id="ateliern" aria-labelledby="an-title" data-tight>
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker" data-anchor>Atelier N · {x.r3p}</p>
                <h2 className="display" id="an-title"><span className="tl">{x.an_a}</span><span className="tl">{x.an_b}</span></h2>
              </div>
            </div>
            <div className="role">
              <div className="copy" data-reveal>
                <Who logo={logo("Atelier N", "/assets/logo-ateliern.webp")} alt={x.an_logo} role={x.r3} kind={x.an_kind} an />
                <p className="cdesc">{x.an_co}</p>
                <p className="lead">{x.an_p1}</p>
                <p className="strong">{x.an_key}</p>
              </div>
              <div className="vis" data-reveal>
                <div className="build" id="build">
                  <div className="bstep"><b>{x.an_s0k}</b><span>{x.an_s0}</span></div>
                  <div className="bstep"><b>{x.an_s1k}</b><span>{x.an_s1}</span></div>
                  <div className="bstep"><b>{x.an_s2k}</b><span>{x.an_s2}</span></div>
                  <div className="bstep"><b>{x.an_s3k}</b><span>{x.an_s3}</span></div>
                </div>
              </div>
            </div>
            <Strip images={images.an} caption={x.an_cap} visit={x.an_visit} href={VISIT.an} />
          </div>
        </section>

        {/* Closing */}
        <section className="connect" id="connect" aria-labelledby="c-title">
          <div className="wrap connect-in" data-reveal>
            <span className="end" id="thread-end" aria-hidden="true" />
            <h2 className="display" id="c-title"><span className="tl">{x.c_t1}</span> <span className="tl">{x.c_t2}</span></h2>
            <p className="sub"><span>{x.c_q1}</span> <em>{x.c_q2}</em></p>
            <div className="cta-row">
              <a className="btn" href={links.linkedin}><span>{x.c_btn}</span><ArrowUpRight /></a>
              <a className="link-arrow" href={links.methodology}><span>{x.c_why}</span><ArrowRight /></a>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} links={links} />
      <PageInteractions lang={lang} />
    </>
  );
}
