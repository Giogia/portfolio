// Cursor + Topbar + Side nav
const { useState, useEffect, useRef, useMemo } = React;

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    let rx = 0, ry = 0, dx = 0, dy = 0;
    const onMove = (e) => {
      dx = e.clientX; dy = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
      // detect dark section under cursor
      const el = document.elementFromPoint(dx, dy);
      if (el) {
        const onDark = el.closest('.dark, .hero');
        setDark(!!onDark);
        const interactive = el.closest('a, button, .work-row, .track, [data-cursor="hover"]');
        setHover(!!interactive);
      }
    };
    const tick = () => {
      rx += (dx - rx) * 0.18;
      ry += (dy - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(tick);
    };
    window.addEventListener('mousemove', onMove);
    const id = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(id); };
  }, []);

  return (
    <React.Fragment>
      <div ref={dotRef} className="cursor-dot" style={{ background: dark ? 'var(--paper)' : 'var(--ink)' }} />
      <div ref={ringRef} className={`cursor-ring${hover ? ' hover' : ''}${dark ? ' dark' : ''}`} />
    </React.Fragment>
  );
}

function Topbar() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      const opts = { timeZone: 'Europe/Rome', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
      setTime(new Intl.DateTimeFormat('en-GB', opts).format(d));
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <header className="topbar">
      <div className="left">
        <a href="#top" className="mark">Giovanni Tommasi<span style={{opacity:0.5,marginLeft:8}}>©'26</span></a>
      </div>
      <div className="clock">
        <span className="hideSm">Milan, IT — 45.46°N / 9.19°E</span>
        <span>{time} CET</span>
      </div>
    </header>
  );
}

function SideNav({ sections, active, onJump, dark }) {
  return (
    <nav className={`sidenav${dark ? ' on-dark' : ''}`}>
      {sections.map((s, i) => (
        <button key={s.id} className={active === s.id ? 'active' : ''} onClick={() => onJump(s.id)} data-cursor="hover">
          <span className="bar" />
          <span>{String(i).padStart(2, '0')} / {s.label}</span>
        </button>
      ))}
    </nav>
  );
}

window.Cursor = Cursor;
window.Topbar = Topbar;
window.SideNav = SideNav;
