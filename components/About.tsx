import type { Lang } from "@/lib/i18n";
import { getAbout } from "@/lib/content";
import Header from "./Header";
import StructuredData from "./StructuredData";
import Footer from "./Footer";
import PageInteractions from "./PageInteractions";
import { ArrowDown, ArrowRight, ArrowUpRight } from "./Icons";

const PATHS = { en: "/about", fr: "/fr/about" };
const VISIT = {
  an: "https://www.facebook.com/AtelierNleb",
  wm: "https://www.wminded.com/",
  pl: "https://www.protolabs.com/",
};

/* Exploded view: four isometric layers, bottom to top. Assembled positions are set here so the
   visual is complete without JavaScript; the page script animates it from there. */
const CX = 280, A = 140, B = 80, T = 16;
const YS = [343, 293, 243, 193];
const TOP = `M${CX - A} 0 L${CX} ${-B} L${CX + A} 0 L${CX} ${B} Z`;
const INS = `M${CX - A * 0.62} 0 L${CX} ${-B * 0.62} L${CX + A * 0.62} 0 L${CX} ${B * 0.62} Z`;
const SL = `M${CX - A} 0 L${CX} ${B} L${CX} ${B + T} L${CX - A} ${T} Z`;
const SR = `M${CX} ${B} L${CX + A} 0 L${CX + A} ${T} L${CX} ${B + T} Z`;

function Plate({ i, href, name, detail, left }: { i: number; href: string; name: string; detail: string; left: boolean }) {
  const x0 = left ? CX - A : CX + A;
  const lx = left ? x0 - 30 : x0 + 30;
  return (
    <g className="pl" transform={`translate(0 ${YS[i]})`}>
      <a href={href} tabIndex={-1}>
      <path className="sl" d={SL} />
      <path className="sr" d={SR} />
      <path className="top" d={TOP} fill={`rgba(73,114,135,${(0.1 + i * 0.09).toFixed(2)})`} />
      <path className="ins" d={INS} />
      <line className="ld" x1={x0} y1={0} x2={left ? x0 - 22 : x0 + 22} y2={0} />
      <circle className="cd" cx={x0} cy={0} r={3} />
      <text className="ln" x={lx} y={-2} textAnchor={left ? "end" : undefined}>{name}</text>
      <text className="ls" x={lx} y={17} textAnchor={left ? "end" : undefined}>{detail}</text>
      </a>
    </g>
  );
}

function Visit({ href, label }: { href: string; label: string }) {
  return (
    <div className="links">
      <a className="link-arrow" href={href} target="_blank" rel="noopener"><span>{label}</span><ArrowUpRight size={16} /></a>
    </div>
  );
}

function Photo({ src, w, h, alt, name, cap }: { src: string; w: number; h: number; alt: string; name: string; cap: string }) {
  return (
    <figure className="photo">
      <div className="ph"><img src={src} width={w} height={h} alt={alt} loading="lazy" decoding="async" /></div>
      <figcaption><b>{name}</b><span>{cap}</span></figcaption>
    </figure>
  );
}

export default async function About({ lang }: { lang: Lang }) {
  const { base, a, images } = await getAbout(lang);
  const { t, links } = base;

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <Header t={t} lang={lang} links={links} current={links.about} paths={PATHS} />
      <StructuredData t={t} lang={lang} en={PATHS.en} />

      <main id="main">
        <svg className="thread" id="thread" aria-hidden="true" />

        {/* Top of page */}
        <section className="mh" id="top" aria-labelledby="a-title">
          <div className="wrap mh-grid">
            <div className="mh-main">
              <p className="kicker" data-anchor>{a.eyebrow}</p>
              <h1 id="a-title">
                <span className="tl">{a.h1a}</span>
                <span className="tl">{a.h1b}</span>
                {a.h1c ? <span className="tl">{a.h1c}</span> : null}
              </h1>
              {a.sub ? <p className="subtitle">{a.sub}</p> : null}
              <p className="mh-lead">{a.lead}</p>
              <div className="cta-row">
                <a className="btn" href={links.linkedin}><span>{t.cta_connect}</span><ArrowUpRight /></a>
                <a className="link-arrow" href={links.experience}><span>{a.cta_exp}</span><ArrowRight /></a>
              </div>
            </div>
            <figure className="mh-vis" aria-hidden="true">
              <svg className="xv" id="xv" viewBox="0 50 560 440">
                <Plate i={0} href="#start" name={a.x1n} detail={a.x1s} left />
                <Plate i={1} href="#clear" name={a.x2n} detail={a.x2s} left={false} />
                <Plate i={2} href="#europe" name={a.x3n} detail={a.x3s} left />
                <Plate i={3} href="#scale" name={a.x4n} detail={a.x4s} left={false} />
              </svg>
            </figure>
            <nav className="mh-index four" aria-label={a.a_idx}>
              <a href="#start"><strong>{a.i1}</strong><ArrowDown /><span className="sub">{a.i1s}</span></a>
              <a href="#clear"><strong>{a.i2}</strong><ArrowDown /><span className="sub">{a.i2s}</span></a>
              <a href="#europe"><strong>{a.i3}</strong><ArrowDown /><span className="sub">{a.i3s}</span></a>
              <a href="#scale"><strong>{a.i4}</strong><ArrowDown /><span className="sub">{a.i4s}</span></a>
            </nav>
          </div>
        </section>

        {/* From engineering to business */}
        <section className="sec" id="start" aria-labelledby="c1-title">
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker" data-anchor>{a.c1k}</p>
                <h2 className="display" id="c1-title"><span className="tl">{a.c1a}</span><span className="tl">{a.c1b}</span></h2>
                {a.c1sub ? <p className="subtitle">{a.c1sub}</p> : null}
              </div>
            </div>
            <div className="role">
              <div className="copy" data-reveal>
                <p className="lead">{a.c1p1}</p>
                <p>{a.c1p2}</p>
                {a.c1p3 ? <p>{a.c1p3}</p> : null}
                <p className="strong">{a.c1key}</p>
              </div>
              <div className="vis" data-reveal>
                <figure className="portrait">
                  <div className="ph"><img src={images.event} width={1100} height={1100} alt={a.p_alt} loading="lazy" decoding="async" /></div>
                  <figcaption><b>Agentforce World Tour</b><span>{a.p_cap}</span></figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Atelier N (light) */}
        <section className="sec think chap" id="clear" aria-labelledby="c2-title">
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker">Atelier N · {a.c2k}</p>
                <h2 className="display" id="c2-title"><span className="tl">{a.c2a}</span><span className="tl">{a.c2b}</span></h2>
                {a.c2sub ? <p className="subtitle">{a.c2sub}</p> : null}
              </div>
            </div>
            <div className="role flip">
              <div className="copy" data-reveal>
                <p className="lead">{a.c2p1}</p>
                <p className="strong">{a.c2key}</p>
                <Visit href={VISIT.an} label={a.an_visit} />
              </div>
              <div className="vis" data-reveal>
                <Photo src={images.atelier} w={600} h={400} alt={a.c2_alt} name="Atelier N" cap={a.c2cap} />
              </div>
            </div>
          </div>
        </section>

        {/* Wminded */}
        <section className="sec" id="europe" aria-labelledby="c3-title">
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker" data-anchor>Wminded · {a.c3k}</p>
                <h2 className="display" id="c3-title"><span className="tl">{a.c3a}</span><span className="tl">{a.c3b}</span></h2>
                {a.c3sub ? <p className="subtitle">{a.c3sub}</p> : null}
              </div>
            </div>
            <div className="role">
              <div className="copy" data-reveal>
                <p className="lead">{a.c3p1}</p>
                <p>{a.c3p2}</p>
                <Visit href={VISIT.wm} label={a.wm_visit} />
              </div>
              <div className="vis" data-reveal>
                <figure className="photo">
                  <div className="ph trio">
                    {images.wm.map((im) => (
                      <img key={im.src} src={im.src} width={420} height={420} alt={im.alt} loading="lazy" decoding="async" />
                    ))}
                  </div>
                  <figcaption><b>Wminded</b><span>{a.c3cap}</span></figcaption>
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* Protolabs */}
        <section className="sec" id="scale" aria-labelledby="c4-title">
          <div className="wrap">
            <div className="sec-head ch" data-reveal>
              <div className="lead-l">
                <p className="kicker" data-anchor>Protolabs · {a.c4k}</p>
                <h2 className="display" id="c4-title"><span className="tl">{a.c4a}</span><span className="tl">{a.c4b}</span></h2>
                {a.c4sub ? <p className="subtitle">{a.c4sub}</p> : null}
              </div>
            </div>
            <div className="role flip">
              <div className="copy" data-reveal>
                <p className="lead">{a.c4p1}</p>
                <p className="strong">{a.c4key}</p>
                <Visit href={VISIT.pl} label={a.pl_visit} />
              </div>
              <div className="vis" data-reveal>
                <Photo src={images.protolabs} w={555} h={420} alt={a.c4_alt} name="Protolabs" cap={a.c4cap} />
              </div>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="connect" id="connect" aria-labelledby="c-title">
          <div className="wrap connect-in" data-reveal>
            <span className="end" id="thread-end" aria-hidden="true" />
            <h2 className="display" id="c-title"><span className="tl">{a.c_t1}</span> <span className="tl">{a.c_t2}</span></h2>
            <p className="sub"><span>{a.c_q1}</span> <em>{a.c_q2}</em></p>
            <div className="cta-row">
              <a className="btn" href={links.linkedin}><span>{a.c_btn}</span><ArrowUpRight /></a>
              <a className="link-arrow" href={links.methodology}><span>{a.c_why}</span><ArrowRight /></a>
            </div>
          </div>
        </section>
      </main>

      <Footer t={t} links={links} />
      <PageInteractions lang={lang} />
    </>
  );
}
