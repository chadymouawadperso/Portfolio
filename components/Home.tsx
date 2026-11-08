import type { Lang } from "@/lib/i18n";
import { getContent } from "@/lib/content";
import Header from "./Header";
import Monogram3D from "./Monogram3D";
import Steps from "./Steps";
import Interactions from "./Interactions";
import Footer from "./Footer";
import { ArrowDown, ArrowRight, ArrowUpRight } from "./Icons";

export default async function Home({ lang }: { lang: Lang }) {
  const { t, links: LINKS, portrait, experiences, featured, more } = await getContent(lang);
  const cvHref = LINKS.cv || "#cv";

  const CtaRow = ({ linkedinLabel }: { linkedinLabel: string }) => (
    <>
      <div className="cta-row">
        <a className="btn" href={LINKS.linkedin}>
          <span>{linkedinLabel}</span>
          <ArrowUpRight />
        </a>
        <a className="link-arrow cv-link" href={cvHref} data-cv download={LINKS.cv ? true : undefined}>
          <span>{t.cv}</span>
          <ArrowDown />
        </a>
      </div>
      <p className="cv-note" role="status" hidden>{t.cv_note}</p>
    </>
  );

  return (
    <>
      <a className="skip" href="#main">{t.skip}</a>
      <Header t={t} lang={lang} links={LINKS} />

      <main id="main">
        <svg className="thread" id="thread" aria-hidden="true" />

        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-glow" aria-hidden="true" />
          <Monogram3D />
          <div className="wrap">
            <div className="hero-copy">
              <h1 id="hero-title">
                <span className="ln"><span>Chady</span></span>
                <span className="ln"><span>Mouawad</span></span>
              </h1>
              <p className="hero-role"><i aria-hidden="true" /><span>GTM Engineer</span></p>
              <p className="hero-lead">{t.hero_lead}</p>
              <CtaRow linkedinLabel={t.cta_connect} />
            </div>
          </div>
        </section>

        <section className="sec" id="system" aria-labelledby="sys-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <h2 className="display" id="sys-title">{t.sys_title}</h2>
              <div className="sec-head-side">
                <p>{t.sys_intro}</p>
                <a className="link-arrow" href={LINKS.methodology}><span>{t.view_framework}</span><ArrowRight /></a>
              </div>
            </div>
            <div className="track" data-track>
              <span className="track-base" aria-hidden="true" />
              <Steps items={t.caps} />
            </div>
          </div>
        </section>

        <section className="sec think" id="think" aria-labelledby="think-title">
          <div className="wrap">
            <h2 className="display think-title" id="think-title" data-reveal>
              <span className="tl">{t.think_a}</span>
              <em className="tl">{t.think_b}</em>
            </h2>
            <div className="think-stage">
              <p className="think-p left" data-reveal>{t.think_p1}</p>
              <figure className="orb" id="orb" data-reveal>
                <svg className="orb-rings" viewBox="0 0 400 400" aria-hidden="true">
                  <defs>
                    <linearGradient id="arcg" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0" stopColor="#497287" stopOpacity="0" />
                      <stop offset=".55" stopColor="#497287" stopOpacity=".9" />
                      <stop offset="1" stopColor="#5A86A0" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <circle className="ring-hair" cx="200" cy="200" r="196" />
                  <g className="ring-ticks"><circle cx="200" cy="200" r="188" pathLength={360} /></g>
                  <g className="ring-arc">
                    <circle cx="200" cy="200" r="196" pathLength={100} stroke="url(#arcg)" />
                    <circle className="ring-node" cx="396" cy="200" r="4.5" />
                  </g>
                </svg>
                <div className="orb-disc">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={portrait} alt={t.a_portrait} width={900} height={900} loading="lazy" decoding="async" />
                  <span className="orb-sheen" aria-hidden="true" />
                </div>
                <figcaption><strong>Chady Mouawad</strong><span>GTM Engineer</span></figcaption>
              </figure>
              <p className="think-p right" data-reveal>{t.think_p2}</p>
            </div>
            <div className="think-cta">
              <a className="link-arrow" href={LINKS.about}><span>{t.think_link}</span><ArrowRight color="currentColor" /></a>
            </div>
          </div>
        </section>

        <section className="sec" id="experience" aria-labelledby="exp-title">
          <div className="wrap">
            <div className="sec-head" data-reveal>
              <h2 className="display" id="exp-title">{t.exp_title}</h2>
              <div className="sec-head-side">
                <div className="stat" style={{ marginTop: "-.38em" }}><strong>{t.pl_big}</strong><span>{t.pl_stat}</span></div>
                <a className="link-arrow" href={LINKS.experience}><span>{t.exp_link}</span><ArrowRight /></a>
              </div>
            </div>
            <div className="track" data-track>
              <span className="track-base" aria-hidden="true" />
              <ol className="stops">
                {experiences.map(({ company: name, logo, logoAlt: alt, title, description: desc }) => (
                  <li className="stop" key={name}>
                    <span className="dot" aria-hidden="true" />
                    <div className="co">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <span className="tile"><img src={logo} alt={alt} width={100} height={100} /></span>
                      <span>{name}</span>
                    </div>
                    <h3>{title}</h3>
                    <p>{desc}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        <section className="sec pb-band" id="playbooks" aria-labelledby="pb-title">
          <div className="wrap">
            <div className="feature" data-reveal>
              <div className="feature-copy">
                <p className="label">{t.pb_feat}</p>
                <h2 className="display" id="pb-title" style={{ fontSize: "var(--tf)", lineHeight: 0.98 }}>{featured.title}</h2>
                <p>{t.pb_sum}</p>
              </div>
              <div className="feature-side">
                <a className="btn" href={featured.url}><span>{t.pb_read}</span><ArrowUpRight /></a>
              </div>
            </div>
            <div className="pb-card" data-reveal>
              <p className="label">{t.pb_how}</p>
              <ol className="pb-flow">
                {t.pb.map((s) => <li key={s}><span className="tx">{s}</span></li>)}
              </ol>
            </div>
            <div className="more" data-reveal>
              <p className="label">{t.pb_more}</p>
              <ul className="pb-list">
                {more.map(([title, href]) => (
                  <li key={href}><a href={href}><span>{title}</span><span className="ar" aria-hidden="true">→</span></a></li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="connect" id="connect" aria-labelledby="connect-title">
          <div className="wrap connect-in" data-reveal>
            <span className="end" id="thread-end" aria-hidden="true" />
            <h2 className="display" id="connect-title">{t.c_title}</h2>
            <p>{t.c_body}</p>
            <CtaRow linkedinLabel={t.c_btn} />
          </div>
        </section>
      </main>

      <Footer t={t} links={LINKS} />

      <Interactions lang={lang} />
    </>
  );
}
