// Hero + About + Services
const HeroSection = () => {
  const bgRef = React.useRef(null);
  React.useEffect(() => {
    if (!bgRef.current || !window.initFaultyTerminal) return;
    const cleanup = window.initFaultyTerminal(bgRef.current, {
      scale: 2,
      digitSize: 1.2,
      scanlineIntensity: 0.5,
      glitchAmount: 1.5,
      flickerAmount: 1.1,
      noiseAmp: 1,
      dither: 0.15,
      curvature: 0.12,
      tint: '#A7EF9E',
      mouseStrength: 0.15,
      brightness: 0.5,
      pageLoadAnimation: true,
    });
    return cleanup;
  }, []);
  return (
    <section id="top" className="hero" data-cursor="dark">
      <div className="hero-bg" ref={bgRef} aria-hidden="true"></div>
      <div className="hero-veil" aria-hidden="true"></div>
      <div style={{ marginTop: 60 }}>
        <div className="muted mono" style={{ marginBottom: 24, color: '#F1F6D6' }}>
          ●&nbsp;&nbsp;Available · Q3 2026
        </div>
      </div>

      <div>
        <div className="marquee-row">
          <div className="marquee-track">
            <span className="name">Giovanni Tommasi</span>
            <span className="star">●</span>
            <span className="name">Coding & Media</span>
            <span className="star">●</span>
            <span className="name">Giovanni Tommasi</span>
            <span className="star">●</span>
            <span className="name">Coding & Media</span>
            <span className="star">●</span>
          </div>
        </div>

        <div className="hero-meta" style={{ marginTop: 60 }}>
          <div className="col">
            <strong>Full-Stack Engineer</strong>
            Based in Milan, IT
          </div>
          <div className="col">
            <strong>(01) Discipline</strong>
            AI · Web · Graphics
          </div>
          <div className="col tagline">
            “Coding & media — turning hard problems into things you can enjoy.”
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <span className="line" />
        <span>(01) About</span>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="section-head">
        <span className="ix">(01) — About</span>
        <span className="ix">/01</span>
      </div>
      <div className="about-grid">
        <div className="about-text">
          <p>
            I'm a <em>Computer Science Engineer</em> working across full-stack web applications, artificial intelligence, and computer graphics.
          </p>
          <p>
            Researched at <span className="accent">Shanghai Jiao Tong University</span> and graduated at <span className="accent">Politecnico di Milano</span>.
          </p>
          <p style={{ fontSize: '16px', fontFamily: 'var(--f-body)', color: 'var(--muted)', maxWidth: '52ch', marginTop: 32 }}>
            Currently shipping product code in TypeScript and React. On the side, I make 3d renderings and explore image / video synthesis. The portfolio below is a near-exhaustive log — research projects, university work, side experiments and current work.
          </p>
          <div className="about-tags">
            <span className="tag" data-cursor="hover">#ai</span>
            <span className="tag" data-cursor="hover">#web</span>
            <span className="tag" data-cursor="hover">#graphics</span>
          </div>
          <div className="about-cv">
            <a
              className="cv-btn primary"
              href="cv/Giovanni-Tommasi-CV.pdf"
              download="Giovanni-Tommasi-CV.pdf"
              data-cursor="hover"
            >
              <span className="cv-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v12" />
                  <path d="m7 11 5 5 5-5" />
                  <path d="M5 20h14" />
                </svg>
              </span>
              Download CV
            </a>
            <a
              className="cv-btn ghost"
              href="cv/Giovanni-Tommasi-CV.html"
              target="_blank"
              rel="noreferrer"
              data-cursor="hover"
            >
              View in browser
              <span className="cv-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7" />
                  <path d="M8 7h9v9" />
                </svg>
              </span>
            </a>
          </div>
        </div>
        <div className="about-portrait">
          <div className="frame">
            <img src="assets/portrait.jpg" alt="Giovanni Tommasi" />
          </div>
          <div className="corners" />
          <div className="caption">
            <span>Giovanni Tommasi · 2026</span>
            <span>MI / IT</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExperienceBlock = () => {
  const data = window.CV_INFO;
  const [active, setActive] = React.useState(-1);
  return (
    <div className="exp-block" onMouseLeave={() => setActive(-1)}>
      <div className="exp-cards">
        {data.map((r, i) => (
          <div
            className={`exp-card${active === i ? ' active' : ''}`}
            key={r.company}
            onMouseEnter={() => setActive(i)}
            data-cursor="hover"
          >
            <span className="exp-period">{r.period}</span>
            <span className="exp-logo">
              {r.logo
                ? <img src={`assets/logos/${r.logo}`} alt={r.company} loading="lazy" />
                : <span className="exp-mono">{r.mono}</span>}
            </span>
            <span className="exp-card-foot">
              <span className="exp-company">{r.company}</span>
              <span className="exp-role">{r.role}</span>
            </span>
          </div>
        ))}
      </div>
      <div className={`exp-detail${active >= 0 ? ' open' : ''}`}>
        {active >= 0 && (
          <React.Fragment>
            <div className="exp-detail-head">
              <span>{data[active].company}</span>
              <span className="muted">{data[active].period}</span>
            </div>
            <ul className={`exp-points${data[active].points.length <= 2 ? ' one-col' : ''}`}>
              {data[active].points.map((p, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ))}
            </ul>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const ServicesSection = () => {
  return (
    <section id="services" className="section">
      <div className="section-head">
        <span className="ix">(02) — What I Do</span>
        <span className="ix">/02</span>
      </div>
      <h2 className="display">From idea<br/>to interface.</h2>
      <div className="services-list">
        {window.SERVICES.map((s, i) => (
          <div className="service-row" key={s.name} data-cursor="hover">
            <span className="ix">/0{i+1}</span>
            <span className="name">{s.name}</span>
            <span className="desc">{s.desc}</span>
            <span className="arrow">→</span>
          </div>
        ))}
      </div>

      <div className="stack">
        <div className="stack-head">
          <span>Experience</span>
          <span className="muted">Roles &amp; responsibilities</span>
        </div>
        <ExperienceBlock />

        <div className="stack-head" style={{ marginTop: 72 }}>
          <span>Stack &amp; Tools</span>
          <span className="muted">Things I work with</span>
        </div>
        <div className="stack-groups">
          {window.TOOL_GROUPS.map((g) => (
            <div className="stack-group" key={g.label}>
              <div className="stack-label">{g.label}</div>
              <div className="stack-items">
                {g.items.map((t) => (
                  <a className="tool" key={t.name} href={t.url} target="_blank" rel="noreferrer" data-cursor="hover">
                    <span className="tool-logo"><img src={`assets/tools/${t.file}`} alt={t.name} loading="lazy" /></span>
                    <span className="tool-name">{t.name}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="stack-head" style={{ marginTop: 72 }}>
          <span>Archive</span>
          <span className="muted">Papers &amp; results</span>
        </div>
        <div className="docs-list">
          {window.DOCS.map((d) => (
            <a
              className="doc-row"
              key={d.title}
              href={d.file || d.href}
              target="_blank"
              rel="noreferrer"
              download={d.file ? "" : undefined}
              data-cursor="hover"
            >
              <span className="doc-icon" aria-hidden="true">
                {d.file ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2.75h7L18 7.75V20.5a.75.75 0 0 1-.75.75H6.75A.75.75 0 0 1 6 20.5V3.5A.75.75 0 0 1 6.75 2.75Z" />
                    <path d="M13 2.75V8h5" />
                    <path d="M9 12.5h6M9 15.5h6M9 18.5h3.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7" />
                    <path d="M8 7h9v9" />
                  </svg>
                )}
              </span>
              <span className="doc-main">
                <span className="doc-title">{d.title}</span>
                <span className="doc-desc" dangerouslySetInnerHTML={{ __html: d.desc }}></span>
              </span>
              <span className="doc-meta">
                <span className="doc-kind">{d.kind}</span>
                <span className="doc-year">{d.year}</span>
              </span>
              <span className="doc-action">{d.action}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

window.HeroSection = HeroSection;
window.AboutSection = AboutSection;
window.ExperienceBlock = ExperienceBlock;
window.ServicesSection = ServicesSection;
