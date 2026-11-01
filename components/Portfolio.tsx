import { existsSync } from "node:fs";
import { join } from "node:path";
import { getCopy, type Key, type Lang } from "@/lib/content";
import { ChartBg } from "./ChartBg";
import { ContactForm } from "./ContactForm";
import { CopyButton } from "./CopyButton";
import { LangToggle } from "./LangToggle";
import { ThemeToggle } from "./ThemeToggle";

const EMAIL = "cc79336@eid.utexas.edu";
const LINKEDIN = "https://www.linkedin.com/in/momochen0517";

const RESUMES = { en: "/resume/Momo-Chen-Resume-EN.pdf", zh: "/resume/Momo-Chen-Resume-ZH.pdf" };

// Checked at build time: a button only becomes a download once its PDF is in public/resume/.
function resumeReady(href: string) {
  return existsSync(join(process.cwd(), "public", href));
}

const docIcon = (
  <svg className="picto" viewBox="0 0 40 40" aria-hidden="true"><path d="M10 4h14l8 8v24H10z" /><path d="M24 4v8h8" /><path d="M15 19h12M15 24h12M15 29h8" /></svg>
);

export function Portfolio({ lang }: { lang: Lang }) {
  const t = getCopy(lang);
  // Copy may contain inline markup (<strong>, <span class="fig">, links), so it is rendered as HTML.
  const h = (k: Key) => ({ dangerouslySetInnerHTML: { __html: t[k] } });
  const resumeButton = (which: keyof typeof RESUMES) =>
    resumeReady(RESUMES[which])
      ? <a className="btn" href={RESUMES[which]} download {...h("r.dl")} />
      : <a className="btn" aria-disabled="true">{t["ui.soon"]}</a>;

  return (
    <>
      <div className="masthead" id="masthead" data-pattern="chart">
        <ChartBg />
        <div className="page head-inner">
          <header className="top" id="top">
            <div>
              <a className="sig" href="#top">Momo Chen</a>
              <p className="tagline" {...h("tagline")} />
            </div>
            <nav aria-label="Primary">
              <ul>
                <li><a href="#work" {...h("nav.work")} /></li>
                <li><a href="#experience" {...h("nav.exp")} /></li>
                <li><a href="#writing" {...h("nav.writing")} /></li>
                <li><a href="#resume" {...h("nav.resume")} /></li>
                <li><a href="#contact" {...h("nav.contact")} /></li>
                <li><ThemeToggle darkLabel={t["ui.dark"]} lightLabel={t["ui.light"]} /></li>
                <li><LangToggle lang={lang} /></li>
              </ul>
            </nav>
          </header>
        </div>
      </div>

      <div className="page">
        <main>
          <section className="intro" id="about">
            <h1 {...h("about.h")} />
            <div className="intro-grid">
              <div>
                <p {...h("about.p1")} />
                <p {...h("about.p2")} />
                <p {...h("about.p3")} />
                <p className="facts num" {...h("about.facts")} />
              </div>
              <figure>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="photo" id="photo" src="/headshot.jpg" width={480} height={600} alt={t["photo.alt"]} />
                <figcaption>Cheng-Mou (Momo) Chen <span lang="zh-Hant">陳政謀</span></figcaption>
              </figure>
            </div>
          </section>

          <hr />

          <section id="work">
            <h2 {...h("work.h")} />

            <article className="item">
              <svg className="picto" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 6v28h28" /><path d="M10 27l6-7 5 4 6-9 5 4" /><circle cx="16" cy="20" r="1.2" /><circle cx="27" cy="15" r="1.2" /><path d="M10 31h4M18 31h4M26 31h4" opacity=".5" /></svg>
              <div>
                <p className="kicker" {...h("w1.k")} />
                <h3 {...h("w1.t")} />
                <p {...h("w1.lead")} />
                <ul>
                  <li {...h("w1.b1")} />
                  <li {...h("w1.b2")} />
                </ul>
                <p className="tools" {...h("w1.tools")} />
                <p className="links"><a href="#" {...h("l.code")} /><a href="#" {...h("l.report")} /></p>
              </div>
            </article>

            <article className="item">
              <svg className="picto" viewBox="0 0 40 40" aria-hidden="true"><path d="M6 32c6 0 6-8 12-8s6-8 12-8" /><circle cx="6" cy="32" r="2" /><circle cx="18" cy="24" r="2" /><circle cx="30" cy="16" r="2" /><path d="M30 16V6l5 2.5-5 2.5" /></svg>
              <div>
                <p className="kicker" {...h("w2.k")} />
                <h3 {...h("w2.t")} />
                <p {...h("w2.lead")} />
                <ul>
                  <li {...h("w2.b1")} />
                  <li {...h("w2.b2")} />
                </ul>
                <p className="tools" {...h("w2.tools")} />
                <p className="links"><a href="#" {...h("l.live")} /><a href="#" {...h("l.code")} /></p>
              </div>
            </article>

            <article className="item">
              <svg className="picto" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="5" /><circle cx="7" cy="9" r="3" /><circle cx="33" cy="9" r="3" /><circle cx="7" cy="31" r="3" /><circle cx="33" cy="31" r="3" /><path d="M9.3 11l6.8 5.6M30.7 11l-6.8 5.6M9.3 29l6.8-5.6M30.7 29l-6.8-5.6" /></svg>
              <div>
                <p className="kicker" {...h("w3.k")} />
                <h3 {...h("w3.t")} />
                <p {...h("w3.lead")} />
                <ul>
                  <li {...h("w3.b1")} />
                  <li {...h("w3.b2")} />
                </ul>
                <p className="tools" {...h("w3.tools")} />
                <p className="links"><a href="#" {...h("l.case")} /></p>
              </div>
            </article>

            <article className="item">
              <svg className="picto" viewBox="0 0 40 40" aria-hidden="true"><rect x="5" y="6" width="24" height="28" rx="1" /><path d="M10 13h14M10 18h10M10 23h8" /><circle cx="27" cy="25" r="6" /><path d="M31.5 29.5L36 34" /></svg>
              <div>
                <p className="kicker" {...h("w4.k")} />
                <h3 {...h("w4.t")} />
                <p {...h("w4.lead")} />
                <p className="tools" {...h("w4.tools")} />
                <p className="links"><a href="#" {...h("l.deck")} /></p>
              </div>
            </article>
          </section>

          <hr />

          <section id="experience">
            <h2 {...h("exp.h")} />
            <ol className="entries">
              <li><div className="when" {...h("e1.w")} /><div><h3 {...h("e1.t")} /><p className="org" {...h("e1.o")} /><p {...h("e1.d")} /></div></li>
              <li><div className="when" {...h("e2.w")} /><div><h3 {...h("e2.t")} /><p className="org" {...h("e2.o")} /><p {...h("e2.d")} /></div></li>
              <li><div className="when" {...h("e3.w")} /><div><h3 {...h("e3.t")} /><p className="org" {...h("e3.o")} /><p {...h("e3.d")} /></div></li>
              <li><div className="when" {...h("e4.w")} /><div><h3 {...h("e4.t")} /><p className="org" {...h("e4.o")} /><p {...h("e4.d")} /></div></li>
            </ol>
          </section>

          <hr />

          <section id="writing">
            <h2 {...h("wr.h")} />
            <ol className="entries">
              <li><div className="when">TULJ</div><div><h3><a href="#" {...h("wr1.t")} /></h3><p className="org" {...h("wr1.o")} /><p {...h("wr1.d")} /></div></li>
              <li><div className="when">2026</div><div><h3><a href="#" {...h("wr2.t")} /></h3><p className="org" {...h("wr2.o")} /><p {...h("wr2.d")} /></div></li>
              <li><div className="when">2026</div><div><h3><a href="#" {...h("wr3.t")} /></h3><p className="org" {...h("wr3.o")} /><p {...h("wr3.d")} /></div></li>
            </ol>
          </section>

          <hr />

          <section id="skills">
            <h2 {...h("sk.h")} />
            <dl className="skills">
              <dt {...h("sk.fin")} /><dd {...h("sk.fin.v")} />
              <dt {...h("sk.code")} /><dd {...h("sk.code.v")} />
              <dt {...h("sk.tools")} /><dd {...h("sk.tools.v")} />
              <dt {...h("sk.lang")} /><dd {...h("sk.lang.v")} />
              <dt {...h("sk.hon")} /><dd className="num" {...h("sk.hon.v")} />
            </dl>
          </section>

          <hr />

          <section id="resume">
            <h2 {...h("r.h")} />
            <p {...h("r.p")} />
            <div className="resumes">
              <div className="resume-opt">
                {docIcon}
                <div>
                  <h3 lang="en">English Resume</h3>
                  <p className="meta" {...h("r.en.m")} />
                  {resumeButton("en")}
                </div>
              </div>
              <div className="resume-opt">
                {docIcon}
                <div>
                  <h3 lang="zh-Hant">中文履歷</h3>
                  <p className="meta" {...h("r.zh.m")} />
                  {resumeButton("zh")}
                </div>
              </div>
            </div>
          </section>

          <hr />

          <section id="contact">
            <h2 {...h("c.h")} />
            <p><strong {...h("c.status")} /></p>
            <ul className="channels">
              <li><span className="k" {...h("c.email")} /><span className="v">{EMAIL}</span><CopyButton text={EMAIL} label={t["c.copy"]} copied={t["ui.copied"]} selected={t["ui.selected"]} /></li>
              <li><span className="k">LinkedIn</span><a className="v" href={LINKEDIN} target="_blank" rel="noopener">linkedin.com/in/momochen0517</a></li>
            </ul>
            <ContactForm t={t} />
          </section>

          <hr />
        </main>

        <footer>
          <p {...h("ft.ps")} />
          <p>© 2026 Cheng-Mou (Momo) Chen <span lang="zh-Hant">陳政謀</span> · <a href={LINKEDIN} target="_blank" rel="noopener">LinkedIn</a></p>
        </footer>
      </div>
    </>
  );
}
