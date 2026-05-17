// components.jsx — shared building blocks

const { useState, useEffect, useRef, useMemo } = React;

// ─── small icons (lucide-style hairline) ──────────────────────
function Icon({ name, size = 16, stroke = 1.5 }) {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24",
    fill: "none", stroke: "currentColor",
    strokeWidth: stroke, strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "arrow-up-right":
      return <svg {...props}><path d="M7 17L17 7M9 7h8v8" /></svg>;
    case "mail":
      return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="1" /><path d="m3 7 9 6 9-6" /></svg>;
    case "scholar":
      return <svg {...props}><path d="M12 3 2 9l10 6 10-6-10-6Z" /><path d="M6 11v5a6 6 0 0 0 12 0v-5" /></svg>;
    case "linkedin":
      return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="1" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M16 17v-4" /></svg>;
    case "github":
      return <svg {...props}><path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.5 3 5.5 3a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.8 5.6 5.5 6-.6.5-.6 1.2-.5 2V21" /></svg>;
    case "user":
      return <svg {...props}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></svg>;
    case "image":
      return <svg {...props}><rect x="3" y="3" width="18" height="18" rx="1" /><circle cx="9" cy="9" r="2" /><path d="m21 15-5-5L5 21" /></svg>;
    default: return null;
  }
}

// ─── nav ─────────────────────────────────────────────────────
const PAGES = [
  { id: "home",     label: "Home",     num: "01" },
  { id: "research", label: "Research", num: "02" },
  { id: "cv",       label: "CV",       num: "03" },
];

function Nav({ page, setPage, alias }) {
  return (
    <header className="nav">
      <div className="page nav-inner">
        <a className="nav-brand" onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
          <span className="dot" />
          <span>{alias}</span>
          <span className="meta">/ Research scientist applications</span>
        </a>
        <nav className="nav-links">
          {PAGES.map(p => (
            <a
              key={p.id}
              className={"nav-link" + (page === p.id ? " active" : "")}
              onClick={() => setPage(p.id)}
            >
              <span className="num">{p.num}</span>{p.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ─── eyebrow ─────────────────────────────────────────────────
function Eyebrow({ children, noRule }) {
  return <span className={"eyebrow" + (noRule ? " no-rule" : "")}>{children}</span>;
}

// ─── block header ────────────────────────────────────────────
function BlockHeader({ num, title, kicker }) {
  return (
    <div className="block-header">
      <h2><span className="num">{num}</span>{title}</h2>
      {kicker && <div className="kicker">{kicker}</div>}
    </div>
  );
}

// ─── tag ─────────────────────────────────────────────────────
function Tag({ label, tone }) {
  return <span className={"tag" + (tone ? " tag-" + tone : "")}>{label}</span>;
}

// ─── footer ──────────────────────────────────────────────────
function Footer({ data, setPage }) {
  return (
    <footer className="footer">
      <div className="page">
        <div className="footer-grid">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h4 style={{ marginTop: 16 }}>Available for <em>research</em> positions in the US.</h4>
            <a href={"mailto:" + data.links.email} className="footer-email">{data.links.email}</a>
          </div>
          <div className="footer-col">
            <h5>Site</h5>
            <ul>
              {PAGES.map(p => (
                <li key={p.id}><a onClick={() => setPage(p.id)} style={{ cursor: "pointer" }}>{p.label}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Elsewhere</h5>
            <ul>
              <li><a href={data.links.scholar} target="_blank" rel="noopener">Google Scholar ↗</a></li>
              <li><a href={data.links.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a></li>
              <li><a href={data.links.github} target="_blank" rel="noopener">GitHub ↗</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-fine">
          <span>© {new Date().getFullYear()} {data.name.first} {data.name.last}</span>
          <span>Atlanta, GA</span>
        </div>
      </div>
    </footer>
  );
}

// ─── publication / project item row ──────────────────────────
function ItemRow({ date, month, title, sub, tags, action = "Read", href, status }) {
  const dateLabel = month ? `${month} ${date}` : date;
  const handleClick = () => { if (href) window.open(href, "_blank"); };
  return (
    <div className="item" onClick={handleClick}>
      <div className="item-date">{dateLabel}</div>
      <div>
        <h4 className="item-title">{title}</h4>
        <p className="item-sub">{sub}</p>
        {tags && tags.length > 0 && (
          <div className="item-tags">
            {tags.map((t, i) => <Tag key={i} label={t.label} tone={t.tone} />)}
          </div>
        )}
      </div>
      <div className="item-action">{status || action} <span aria-hidden>↗</span></div>
    </div>
  );
}

// ─── timeline ────────────────────────────────────────────────
function TimelineItem({ role, org, group, when, live, body, tags }) {
  return (
    <div className="timeline-item">
      <div className={"timeline-when" + (live ? " live" : "")}>
        <span className="dot" />{when}
      </div>
      <div>
        <h3 className="timeline-role">{role}</h3>
        <p className="timeline-org">{org}<span className="sep">·</span>{group}</p>
        <p className="timeline-body">{body}</p>
        {tags && tags.length > 0 && (
          <div className="timeline-tags">
            {tags.map((t, i) => <Tag key={i} label={t.label} tone={t.tone} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── hero photo placeholder ──────────────────────────────────
function HeroPhoto({ shape }) {
  return (
    <div className={"hero-photo shape-" + shape}>
      <div className="hero-photo-placeholder">
        <Icon name="user" size={36} />
        <span>Photo · drop in later</span>
      </div>
      <div className="hero-photo-caption">Yong Li Neo · Atlanta, GA</div>
    </div>
  );
}

// expose to other babel scripts
Object.assign(window, {
  Icon, Nav, PAGES, Eyebrow, BlockHeader, Tag, Footer, ItemRow, TimelineItem, HeroPhoto,
});
