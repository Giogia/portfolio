// Selected Work + Music + Contact
const WorkSection = () => {
  const [filter, setFilter] = React.useState('all');
  const tags = [
    { id: 'all', label: 'All' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'ai', label: 'AI / ML' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'graphics', label: 'Graphics' },
    { id: 'research', label: 'Research' },
  ];
  const filtered = filter === 'all' ? window.PROJECTS : window.PROJECTS.filter(p => p.tag === filter);

  return (
    <section id="work" className="section dark">
      <div className="section-head">
        <span className="ix">(03) — Selected Work</span>
        <span className="ix">/03 · {filtered.length} of {window.PROJECTS.length}</span>
      </div>
      <h2 className="display">The complete<br/>build log.</h2>
      <div className="work-controls">
        <div className="work-filters">
          {tags.map(t => (
            <button
              key={t.id}
              className={`filter-pill${filter === t.id ? ' active' : ''}`}
              onClick={() => setFilter(t.id)}
              data-cursor="hover"
            >{t.label}</button>
          ))}
        </div>
        <div style={{ opacity: 0.6 }}>idx · title · meta · year</div>
      </div>

      <div className="work-table">
        {filtered.map((p, i) => (
          <a
            key={p.name}
            href={p.url || `https://github.com/Giogia/${p.name}`}
            target="_blank"
            rel="noreferrer"
            className="work-row"
            data-cursor="hover"
          >
            <span className="ix">{String(i+1).padStart(2,'0')}</span>
            <span className="title">{p.name}</span>
            <span className="desc">{p.desc}</span>
            <span className="meta">
              <span className="lang">{p.lang}</span>
              <span className="priv">{p.live && <span className="live-dot" />}{p.year} · {p.priv}</span>
            </span>
            <span className="arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7" />
                <path d="M8 7h9v9" />
              </svg>
            </span>
          </a>
        ))}
      </div>
      <div className="work-foot">
        <span>End of index</span>
        <a href="https://github.com/Giogia" target="_blank" rel="noreferrer" data-cursor="hover">View all on GitHub ↗</a>
      </div>
    </section>
  );
};

const fmt = (s) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2,'0')}`;
};

const Track = ({ track, ix, isPlaying, onToggle, progress, cover, dur }) => {
  return (
    <div className={`track${track.featured ? ' featured' : ''}${isPlaying ? ' playing' : ''}`}>
      <div className="head">
        <span className="ix">/0{ix+1} · {track.featured ? 'Featured' : 'Single'}</span>
        <a className="open" href={track.spotify} target="_blank" rel="noreferrer" data-cursor="hover">Spotify ↗</a>
      </div>

      <div className="visualizer">
        {Array.from({ length: 12 }).map((_, i) => <span key={i} className="bar" />)}
      </div>

      <div className="title-row">
        <a className="cover" href={track.spotify} target="_blank" rel="noreferrer" data-cursor="hover" aria-label={`${track.title} cover`}>
          {cover ? <img src={cover} alt="" /> : <span className="cover-ph">/0{ix+1}</span>}
        </a>
        <div>
          <div className="title">{track.title}</div>
          <div className="artist">{track.artist}</div>
        </div>
      </div>

      <div className="controls">
        <button className="play" onClick={onToggle} data-cursor="hover" aria-label="Play">
          {isPlaying ? (
            <svg viewBox="0 0 12 12"><rect x="2" y="1.5" width="3" height="9"/><rect x="7" y="1.5" width="3" height="9"/></svg>
          ) : (
            <svg viewBox="0 0 12 12"><polygon points="2,1 11,6 2,11"/></svg>
          )}
        </button>
        <div className="progress"><span className="fill" style={{ width: `${progress * 100}%` }} /></div>
        <div className="time">
          {fmt(progress * dur)} / {fmt(dur)}
        </div>
      </div>
    </div>
  );
};

const InstagramSection = () => {
  React.useEffect(() => {
    const HEADER = 54;   // top chrome to cut (avatar + @username row)
    const FOOTER = 158;  // bottom chrome to cut (action bar + "view on Instagram")

    const cropAll = () => {
      document.querySelectorAll('.ig-crop').forEach((crop) => {
        const frame = crop.querySelector('iframe');
        if (!frame) return;
        const fh = frame.offsetHeight;
        if (fh <= HEADER + FOOTER + 20) return;   // not resized yet
        // keep full photo width & height — just cut header off top, footer off bottom
        frame.style.transform = `translateY(-${HEADER}px)`;
        crop.style.height = (fh - HEADER - FOOTER) + 'px';
      });
    };

    const process = () => {
      if (window.instgrm && window.instgrm.Embeds) {
        window.instgrm.Embeds.process();
        return true;
      }
      return false;
    };

    // Observe every iframe for size changes; track which ones we've hooked up.
    const ro = new ResizeObserver(cropAll);
    const seen = new WeakSet();
    const hookIframes = () => {
      document.querySelectorAll('.ig-crop iframe').forEach((f) => {
        if (!seen.has(f)) { seen.add(f); ro.observe(f); }
      });
    };

    // Catch iframes as embed.js injects them (they appear at different times).
    const mo = new MutationObserver(() => { hookIframes(); cropAll(); });
    const embeds = document.querySelector('.ig-embeds');
    if (embeds) mo.observe(embeds, { childList: true, subtree: true });

    // Keep processing + re-cropping until all 8 iframes are transformed.
    let tries = 0;
    const id = setInterval(() => {
      process();
      hookIframes();
      cropAll();
      const frames = document.querySelectorAll('.ig-crop iframe');
      const done = frames.length >= window.IG_POSTS.length &&
        [...frames].every((f) => f.style.transform && f.style.transform !== 'none');
      if (done || ++tries > 120) clearInterval(id);
    }, 250);

    window.addEventListener('resize', cropAll);
    return () => {
      clearInterval(id); ro.disconnect(); mo.disconnect();
      window.removeEventListener('resize', cropAll);
    };
  }, []);

  return (
    <section id="photos" className="section">
      <div className="section-head">
        <span className="ix">(04) — Instagram</span>
        <span className="ix">/04 · @giogia.s</span>
      </div>
      <div className="ig-top">
        <h2 className="display" style={{ marginBottom: 0 }}>Through<br/>the lens.</h2>
        <a className="ig-follow" href="https://www.instagram.com/giogia.s/" target="_blank" rel="noreferrer" data-cursor="hover">
          <span className="handle">@giogia.s</span>
          <span className="go">Follow ↗</span>
        </a>
      </div>
      <div className="ig-embeds">
        {window.IG_POSTS.map((url) => (
          <div className="ig-crop" key={url}>
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={url}
              data-instgrm-version="14"
              style={{ background: '#fff', border: 0, margin: 0, padding: 0, width: '100%' }}
            >
              <a href={url} target="_blank" rel="noreferrer" className="ig-fallback">View post on Instagram ↗</a>
            </blockquote>
          </div>
        ))}
      </div>
      <div className="ig-foot">
        <span>* Live embeds — tap any card to open on Instagram.</span>
        <a href="https://www.instagram.com/giogia.s/" target="_blank" rel="noreferrer" data-cursor="hover">View full profile ↗</a>
      </div>
    </section>
  );
};

const VideoSection = () => {
  return (
    <section id="video" className="section dark">
      <div className="section-head">
        <span className="ix">(05) — Motion</span>
        <span className="ix">/05</span>
      </div>
      <h2 className="display">Moving<br/>images.</h2>
      <div className="video-grid">
        <div className="video-frame">
          <iframe
            src="https://www.youtube.com/embed/iJRMUPPkXow?si=_8C_3VEgiLsYnYGX"
            title="YouTube video player"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div className="video-side">
          <p className="lead">A trip to Thailand — video-making was my first craft, and where my passion for computers began.</p>
          <a className="yt-link" href="https://www.youtube.com/@giovannitommasi8798/videos" target="_blank" rel="noreferrer" data-cursor="hover">
            <span>Watch on YouTube</span>
            <span className="arrow">↗</span>
          </a>
          <span className="yt-meta">@giovannitommasi8798 · Full channel</span>
        </div>
      </div>
    </section>
  );
};

const MusicSection = () => {
  const [playingIx, setPlayingIx] = React.useState(-1);
  const [progresses, setProgresses] = React.useState(() => window.TRACKS.map(() => 0));
  const [covers, setCovers] = React.useState({});
  const [previews, setPreviews] = React.useState({});
  const audioRef = React.useRef(null);
  const timerRef = React.useRef(null);

  // Pull real cover art + 30s preview from the iTunes API (JSONP, no CORS).
  React.useEffect(() => {
    const lookup = (term) => new Promise((resolve) => {
      const cb = 'itc_' + Math.random().toString(36).slice(2);
      const s = document.createElement('script');
      const done = (r) => { resolve(r); try { delete window[cb]; } catch (e) {} s.remove(); };
      window[cb] = (data) => done((data && data.results && data.results[0]) || null);
      s.onerror = () => done(null);
      s.src = 'https://itunes.apple.com/search?term=' + encodeURIComponent(term) +
        '&entity=song&limit=1&callback=' + cb;
      document.body.appendChild(s);
      setTimeout(() => { if (window[cb]) done(null); }, 6000);
    });
    window.TRACKS.forEach((t, i) => {
      if (t.cover) setCovers((c) => ({ ...c, [i]: t.cover }));
      if (t.preview) setPreviews((p) => ({ ...p, [i]: t.preview }));
      if (t.cover && t.preview) return;
      lookup(t.itunes || `${t.artist} ${t.title}`).then((r) => {
        if (!r) return;
        if (!t.cover && r.artworkUrl100) setCovers((c) => ({ ...c, [i]: r.artworkUrl100.replace('100x100bb', '1200x1200bb') }));
        if (!t.preview && r.previewUrl) setPreviews((p) => ({ ...p, [i]: r.previewUrl }));
      });
    });
  }, []);

  const stopAudio = () => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.onended = null; audioRef.current.ontimeupdate = null; }
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  };

  const start = (i) => {
    stopAudio();
    setProgresses((p) => { const n = [...p]; n[i] = 0; return n; });
    const url = previews[i];
    if (url) {
      if (!audioRef.current) audioRef.current = new Audio();
      const a = audioRef.current;
      a.src = url; a.currentTime = 0;
      a.ontimeupdate = () => { if (a.duration) setProgresses((p) => { const n = [...p]; n[i] = a.currentTime / a.duration; return n; }); };
      a.onended = () => { setPlayingIx(-1); setProgresses((p) => { const n = [...p]; n[i] = 0; return n; }); };
      a.play().catch(() => {});
    } else {
      // no preview in catalog — animate the player silently
      timerRef.current = setInterval(() => {
        setProgresses((p) => {
          const n = [...p];
          n[i] = Math.min(1, n[i] + 1 / window.TRACKS[i].duration);
          if (n[i] >= 1) { clearInterval(timerRef.current); timerRef.current = null; setPlayingIx(-1); }
          return n;
        });
      }, 1000);
    }
    setPlayingIx(i);
  };

  const toggle = (i) => {
    if (playingIx === i) { stopAudio(); setPlayingIx(-1); }
    else { start(i); }
  };

  React.useEffect(() => () => stopAudio(), []);

  return (
    <section id="music" className="section">
      <div className="section-head">
        <span className="ix">(06) — Listening Room</span>
        <span className="ix">/06</span>
      </div>
      <h2 className="display">Five featured<br/>tracks. Off-duty.</h2>
      <div className="music-grid">
        {window.TRACKS.map((t, i) => (
          <Track
            key={t.title}
            track={t}
            ix={i}
            isPlaying={playingIx === i}
            onToggle={() => toggle(i)}
            progress={progresses[i]}
            cover={covers[i]}
            dur={previews[i] ? 30 : t.duration}
          />
        ))}
      </div>
      <div style={{ marginTop: 32, display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--f-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
        <span>* 30-second previews · tap a cover to open in Spotify.</span>
        <a href="https://open.spotify.com" target="_blank" rel="noreferrer" data-cursor="hover">Open Spotify ↗</a>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [sent, setSent] = React.useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    e.target.reset();
  };

  const links = [
    { label: 'LinkedIn', sub: 'in/giovanni-tommasi', href: 'https://www.linkedin.com/in/giovanni-tommasi/' },
    { label: 'GitHub', sub: '@Giogia', href: 'https://github.com/Giogia' },
    { label: 'Email', sub: 'giovannitommasi95@gmail.com', href: 'mailto:giovannitommasi95@gmail.com' },
  ];

  return (
    <section id="contact" className="section dark">
      <div className="section-head">
        <span className="ix">(07) — Contact</span>
        <span className="ix">/07</span>
      </div>
      <div className="contact-wrap">
        <div>
          <div className="mono" style={{ color: 'rgba(244,241,234,0.6)', marginBottom: 24 }}>Drop a line</div>
          <a className="huge-mail" href="mailto:giovannitommasi95@gmail.com" data-cursor="hover">
            giovannitommasi95<br/>@gmail.com
          </a>
          <div className="contact-links">
            {links.map((l, i) => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="contact-link" data-cursor="hover">
                <span className="label">
                  <span className="ix">/0{i+1}</span>
                  <span>{l.label}</span>
                </span>
                <span style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
                  <span style={{ opacity: 0.6 }}>{l.sub}</span>
                  <span className="arrow">↗</span>
                </span>
              </a>
            ))}
          </div>
        </div>
        <div className="contact-side">
          <div className="mono">/ Brief form</div>
          <h3>Have a project in mind?</h3>
          <form className="contact-form" onSubmit={onSubmit}>
            <input type="text" placeholder="Your name" required />
            <input type="email" placeholder="Email" required />
            <textarea rows="3" placeholder="What are you building?" required></textarea>
            <button type="submit" data-cursor="hover">Send →</button>
            <div className={`sent${sent ? ' show' : ''}`}>Thanks — I'll reply within 48h.</div>
          </form>
        </div>
      </div>
    </section>
  );
};

window.WorkSection = WorkSection;
window.InstagramSection = InstagramSection;
window.VideoSection = VideoSection;
window.MusicSection = MusicSection;
window.ContactSection = ContactSection;
