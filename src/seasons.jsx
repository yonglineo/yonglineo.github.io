// seasons.jsx — date-based season detection, ambient particles, cursor trail, themed cursors

const SEASONS = {
  spring: { label: "spring", accent: "#EBA3B8", line: "so the cherry blossoms are out", fx: "petals" },
  summer: { label: "summer", accent: "#E5C85A", line: "so the fireflies are out", fx: "fireflies" },
  fall:   { label: "fall",   accent: "#E08566", line: "so the leaves are coming down", fx: "leaves" },
  winter: { label: "winter", accent: "#9DBDE6", line: "so it's snowing (in here, at least)", fx: "snow" },
};
const SEASON_ORDER = ["spring", "summer", "fall", "winter"];

// Astronomical seasons (equinox/solstice dates), flipped for the southern
// hemisphere; near the equator there's no real four-season cycle → summer.
const SOUTH_TZ = /^(Australia|Antarctica)\/|^Pacific\/(Auckland|Chatham|Fiji|Tongatapu|Apia|Noumea|Efate|Norfolk|Rarotonga|Tahiti)|^America\/(Argentina|Santiago|Sao_Paulo|Montevideo|Asuncion|Punta_Arenas)|^Africa\/(Johannesburg|Maputo|Windhoek|Harare|Lusaka|Gaborone|Maseru|Mbabane)|^Indian\/(Mauritius|Reunion|Antananarivo)|^(Brazil\/East|Chile\/|NZ)/;
const TROPIC_TZ = /^Asia\/(Kuala_Lumpur|Kuching|Singapore|Jakarta|Makassar|Jayapura|Pontianak|Bangkok|Ho_Chi_Minh|Saigon|Manila|Phnom_Penh|Vientiane|Yangon|Rangoon|Colombo|Brunei|Dili)|^America\/(Bogota|Caracas|Lima|Guayaquil|Panama|Costa_Rica|Managua|Tegucigalpa|El_Salvador|Guatemala|Belize|Manaus|Belem|Fortaleza|Recife|Bahia|Maceio|Port_of_Spain|Barbados|Santo_Domingo|Puerto_Rico|Jamaica|Martinique|Cayenne|Paramaribo|Guyana|La_Paz)|^Africa\/(Lagos|Accra|Abidjan|Nairobi|Kampala|Dar_es_Salaam|Kinshasa|Addis_Ababa|Dakar|Douala|Luanda|Kigali|Mogadishu)|^Pacific\/(Honolulu|Guam|Port_Moresby|Majuro|Tarawa|Palau)|^Indian\/(Maldives|Mahe|Chagos)|^(Singapore|Pacific\/Saipan)$/;

function seasonFor(date, { south = false, tropical = false } = {}) {
  if (tropical) return "summer";
  const md = (date.getMonth() + 1) * 100 + date.getDate();
  const n = md >= 320 && md < 621 ? "spring" : md >= 621 && md < 922 ? "summer" : md >= 922 && md < 1221 ? "fall" : "winter";
  return south ? { spring: "fall", summer: "winter", fall: "spring", winter: "summer" }[n] : n;
}
function regionFromTimezone() {
  let tz = "";
  try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
  const place = tz.split("/").pop().replace(/_/g, " ");
  return { south: SOUTH_TZ.test(tz), tropical: TROPIC_TZ.test(tz), place, source: "timezone" };
}
function detectSeason(d = new Date()) { return seasonFor(d, regionFromTimezone()); }

// Timezone guess first (instant), then refine with an IP-based latitude lookup.
function useRegionSeason() {
  const [region, setRegion] = React.useState(() => {
    try { const c = JSON.parse(sessionStorage.getItem("neo-region")); if (c) return c; } catch (e) {}
    return regionFromTimezone();
  });
  React.useEffect(() => {
    if (region.source === "ip") return;
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 6000);
    // several free, keyless IP-geo services — first one that answers wins
    const sources = [
      ["https://ipapi.co/json/", (j) => [j.latitude, j.city, j.country_code]],
      ["https://ipwho.is/", (j) => [j.latitude, j.city, j.country_code]],
      ["https://get.geojs.io/v1/ip/geo.json", (j) => [parseFloat(j.latitude), j.city, j.country_code]],
    ];
    (async () => {
      for (const [url, pick] of sources) {
        try {
          const j = await (await fetch(url, { signal: ctl.signal })).json();
          const [lat, city, cc] = pick(j);
          if (typeof lat !== "number" || isNaN(lat)) continue;
          const r = { south: lat < 0, tropical: Math.abs(lat) < 23.44, place: [city, cc].filter(Boolean).join(", "), lat, source: "ip" };
          setRegion(r);
          try { sessionStorage.setItem("neo-region", JSON.stringify(r)); } catch (e) {}
          return;
        } catch (e) { if (ctl.signal.aborted) return; }
      }
    })().finally(() => clearTimeout(to));
    return () => { clearTimeout(to); ctl.abort(); };
  }, []);
  return { ...region, season: seasonFor(new Date(), region) };
}

// ─── cursors (32×32 SVG, hotspot at centre) ───────────────────
const CURSOR_SVG = {
  spring: (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 32 32"><g transform="translate(16 16)" stroke="#2a1218" stroke-width="1.2">${[0,72,144,216,288].map(a=>`<ellipse cx="0" cy="-7.5" rx="4.6" ry="7" fill="#F4B6C7" transform="rotate(${a})"/>`).join("")}<circle r="3.6" fill="#F2CF5B"/></g></svg>`,
  summer: (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 32 32"><g transform="translate(16 16)" stroke-linecap="round">${[0,45,90,135,180,225,270,315].map(a=>`<line x1="0" y1="-9.5" x2="0" y2="-14" stroke="#2a2208" stroke-width="3.4" transform="rotate(${a})"/><line x1="0" y1="-9.5" x2="0" y2="-14" stroke="#F2CF5B" stroke-width="1.8" transform="rotate(${a})"/>`).join("")}<circle r="6.6" fill="#F2CF5B" stroke="#2a2208" stroke-width="1.2"/></g></svg>`,
  fall: (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 32 32"><g transform="rotate(-28 16 16)" stroke="#2a140c" stroke-width="1.2" stroke-linejoin="round"><path d="M16 2 18.6 8.4 23.6 6.2 22.4 12 28 12.6 23.4 17 25.8 20.4 19 20 16 25 13 20 6.2 20.4 8.6 17 4 12.6 9.6 12 8.4 6.2 13.4 8.4Z" fill="#E08566"/><path d="M16 9v21" fill="none"/></g></svg>`,
  winter: (s) => `<svg xmlns="http://www.w3.org/2000/svg" width="${s}" height="${s}" viewBox="0 0 32 32"><g transform="translate(16 16)" stroke-linecap="round" fill="none">${[0,60,120].map(a=>`<g transform="rotate(${a})"><path d="M0-13V13M-3.5-9.5 0-6.5 3.5-9.5M-3.5 9.5 0 6.5 3.5 9.5" stroke="#0b1420" stroke-width="3.6"/><path d="M0-13V13M-3.5-9.5 0-6.5 3.5-9.5M-3.5 9.5 0 6.5 3.5 9.5" stroke="#EAF3FF" stroke-width="1.6"/></g>`).join("")}</g></svg>`,
};
function cursorUrl(season, size) {
  return `url("data:image/svg+xml,${encodeURIComponent(CURSOR_SVG[season](size))}") ${size / 2} ${size / 2}`;
}
// ─── live cursor: follows pointer, tilts with velocity, animates per season ─
const CURSOR_HOT = 'a, button, [role="button"], .item, .post-card, summary, label, .journey-card, .c-row';
function CursorGlyph({ season }) {
  if (season === "spring") return (
    <svg viewBox="-20 -20 40 40"><g className="g-spin">{[0, 72, 144, 216, 288].map((a) => (
      <g key={a} transform={`rotate(${a})`}><ellipse className="g-petal" cx="0" cy="-8" rx="5" ry="7.6" fill="#F4B6C7" stroke="#2a1218" strokeWidth="1.2" /></g>))}
      <circle r="4" fill="#F2CF5B" stroke="#2a1218" strokeWidth="1.2" className="g-pulse" /></g></svg>);
  if (season === "summer") return (
    <svg viewBox="-20 -20 40 40"><g className="g-spin">{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
      <g key={a} transform={`rotate(${a})`}><line className="g-ray" x1="0" y1="-10.5" x2="0" y2="-16" stroke="#2a2208" strokeWidth="3.6" strokeLinecap="round" /><line className="g-ray" x1="0" y1="-10.5" x2="0" y2="-16" stroke="#F2CF5B" strokeWidth="1.8" strokeLinecap="round" /></g>))}</g>
      <circle r="7.2" fill="#F2CF5B" stroke="#2a2208" strokeWidth="1.2" className="g-pulse" /></svg>);
  if (season === "fall") return (
    <svg viewBox="-20 -20 40 40"><g className="g-sway"><g transform="translate(-16 -16)" stroke="#2a140c" strokeWidth="1.2" strokeLinejoin="round">
      <path d="M16 2 18.6 8.4 23.6 6.2 22.4 12 28 12.6 23.4 17 25.8 20.4 19 20 16 25 13 20 6.2 20.4 8.6 17 4 12.6 9.6 12 8.4 6.2 13.4 8.4Z" fill="#E08566" />
      <path d="M16 9V31" fill="none" /><path d="M16 15 11 11M16 15 21 11" fill="none" strokeWidth="0.8" opacity="0.6" /></g></g></svg>);
  return (
    <svg viewBox="-20 -20 40 40"><g className="g-spin">{[0, 60, 120].map((a) => (
      <g key={a} transform={`rotate(${a})`} fill="none" strokeLinecap="round">
        <path d="M0-14V14M-3.8-10.2 0-6.8 3.8-10.2M-3.8 10.2 0 6.8 3.8 10.2" stroke="#0b1420" strokeWidth="3.8" />
        <path d="M0-14V14M-3.8-10.2 0-6.8 3.8-10.2M-3.8 10.2 0 6.8 3.8 10.2" stroke="#EAF3FF" strokeWidth="1.7" /></g>))}
      <circle r="2.2" fill="#EAF3FF" className="g-pulse" /></g></svg>);
}

function SeasonCursor({ season, enabled }) {
  const ref = React.useRef(null);
  const [fine] = React.useState(() => window.matchMedia("(pointer: fine)").matches);
  const on = enabled !== false && fine;
  React.useEffect(() => {
    const el = ref.current;
    if (!on || !el) return;
    document.documentElement.classList.add("has-scur");
    let x = -100, y = -100, px = x, py = y, tilt = 0, stretch = 1, raf = 0, shown = false;
    const tick = () => {
      const vx = x - px, vy = y - py; px = x; py = y;
      const speed = Math.min(40, Math.hypot(vx, vy));
      tilt += (Math.max(-40, Math.min(40, vx * 2.2)) - tilt) * 0.18;
      stretch += (1 + speed / 120 - stretch) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      el.firstChild.style.transform = `rotate(${tilt}deg) scale(${stretch}, ${2 - stretch})`;
      raf = requestAnimationFrame(tick);
    };
    const move = (e) => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; px = x; py = y; }
      el.classList.add("show");
      const tg = e.target && e.target.closest ? e.target : null;
      el.classList.toggle("hot", !!(tg && tg.closest(CURSOR_HOT)));
    };
    const down = () => el.classList.add("down");
    const up = () => el.classList.remove("down");
    const leave = (e) => { if (!e.relatedTarget && (e.clientX <= 0 || e.clientY <= 0 || e.clientX >= window.innerWidth - 1 || e.clientY >= window.innerHeight - 1)) { shown = false; el.classList.remove("show"); } };
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("pointerover", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    window.addEventListener("pointercancel", up);
    window.addEventListener("blur", up);
    document.addEventListener("mouseout", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("has-scur");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("pointerover", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      window.removeEventListener("pointercancel", up);
      window.removeEventListener("blur", up);
      document.removeEventListener("mouseout", leave);
    };
  }, [on]);
  if (!on) return null;
  return (
    <div ref={ref} className="scur" aria-hidden="true">
      <div className={"scur-tilt scur-" + season}><div className="scur-glyph" key={season}><CursorGlyph season={season} /></div></div>
    </div>
  );
}

// ─── particle drawing ─────────────────────────────────────────
const LEAF_COLORS = ["#E08566", "#E5B85A", "#C2522F", "#C77D5C", "#A8662B"];
const PETAL_COLORS = ["#F4B6C7", "#EBA3B8", "#F7D3DC", "#F0C2CE"];

function drawLeaf(ctx, p) {
  const s = p.size;
  ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(0.3 + 0.7 * Math.abs(Math.cos(p.flip)), 1);
  ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha;
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.bezierCurveTo(s * 0.8, -s * 0.5, s * 0.7, s * 0.5, 0, s);
  ctx.bezierCurveTo(-s * 0.7, s * 0.5, -s * 0.8, -s * 0.5, 0, -s);
  ctx.fill();
  ctx.strokeStyle = "rgba(20,10,5,0.35)"; ctx.lineWidth = 0.8;
  ctx.beginPath(); ctx.moveTo(0, -s * 0.8); ctx.lineTo(0, s * 1.3); ctx.stroke();
  ctx.restore();
}
function drawPetal(ctx, p) {
  const s = p.size;
  ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.scale(Math.max(0.15, Math.abs(Math.cos(p.flip))), 1);
  ctx.fillStyle = p.color; ctx.globalAlpha = p.alpha;
  ctx.beginPath();
  ctx.moveTo(0, s);
  ctx.bezierCurveTo(s, s * 0.4, s * 0.8, -s * 0.8, s * 0.2, -s);
  ctx.lineTo(0, -s * 0.7); ctx.lineTo(-s * 0.2, -s);
  ctx.bezierCurveTo(-s * 0.8, -s * 0.8, -s, s * 0.4, 0, s);
  ctx.fill();
  ctx.restore();
}
function drawSnow(ctx, p) {
  ctx.globalAlpha = p.alpha; ctx.fillStyle = "#F4F8FF";
  ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
  ctx.globalAlpha = 1;
}
function drawFirefly(ctx, p) {
  const a = p.alpha * (0.45 + 0.55 * Math.max(0, Math.sin(p.phase)));
  const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 5);
  g.addColorStop(0, `rgba(240,232,140,${a})`);
  g.addColorStop(0.25, `rgba(229,214,90,${a * 0.5})`);
  g.addColorStop(1, "rgba(229,214,90,0)");
  ctx.fillStyle = g;
  ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 5, 0, Math.PI * 2); ctx.fill();
}
const DRAW = { leaves: drawLeaf, petals: drawPetal, snow: drawSnow, fireflies: drawFirefly };

function makeParticle(kind, w, h, opts = {}) {
  const r = Math.random;
  const base = { x: opts.x ?? r() * w, y: opts.y ?? (opts.fresh ? -20 - r() * 40 : r() * h), phase: r() * Math.PI * 2, rot: r() * Math.PI * 2, flip: r() * Math.PI * 2, life: opts.life ?? Infinity, age: 0 };
  const trail = !!opts.trail;
  if (kind === "snow") return { ...base, size: trail ? 1 + r() * 1.6 : 1 + r() * 2.4, vx: trail ? (r() - 0.5) * 1.2 : 0, vy: trail ? 0.4 + r() * 0.8 : 0.35 + r() * 0.9, sway: 0.3 + r() * 0.5, alpha: 0.45 + r() * 0.5 };
  if (kind === "leaves") return { ...base, size: trail ? 4 + r() * 3 : 7 + r() * 7, vx: trail ? (r() - 0.5) * 1.6 : 0, vy: trail ? 0.6 + r() * 0.8 : 0.5 + r() * 0.8, sway: 0.8 + r() * 1.2, spin: (r() - 0.5) * 0.04, flipV: 0.02 + r() * 0.04, color: LEAF_COLORS[(r() * LEAF_COLORS.length) | 0], alpha: 0.7 + r() * 0.25 };
  if (kind === "petals") return { ...base, size: trail ? 3 + r() * 2 : 4 + r() * 4, vx: trail ? (r() - 0.5) * 1.4 : 0.25 + r() * 0.5, vy: trail ? 0.3 + r() * 0.6 : 0.4 + r() * 0.6, sway: 0.6 + r() * 0.8, spin: (r() - 0.5) * 0.05, flipV: 0.03 + r() * 0.05, color: PETAL_COLORS[(r() * PETAL_COLORS.length) | 0], alpha: 0.7 + r() * 0.25 };
  return { ...base, size: trail ? 0.9 + r() * 0.8 : 1.2 + r() * 1.4, vx: (r() - 0.5) * (trail ? 1.4 : 0.5), vy: (r() - 0.5) * (trail ? 1.4 : 0.5), alpha: 0.6 + r() * 0.4, pulse: 0.02 + r() * 0.04 };
}

function stepParticle(p, kind, w, h, t) {
  p.age++;
  if (kind === "fireflies") {
    p.vx += (Math.random() - 0.5) * 0.06; p.vy += (Math.random() - 0.5) * 0.06;
    p.vx *= 0.98; p.vy *= 0.98;
    p.x += p.vx; p.y += p.vy; p.phase += p.pulse;
    if (p.life === Infinity) { if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20; if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20; }
    return;
  }
  p.phase += 0.015;
  p.x += p.vx + Math.sin(p.phase) * p.sway * 0.5;
  p.y += p.vy;
  if (p.spin) p.rot += p.spin;
  if (p.flipV) p.flip += p.flipV;
  if (p.life !== Infinity) { p.vx *= 0.98; }
}

// ─── canvas layer ─────────────────────────────────────────────
function SeasonFX({ season, enabled, trail = true, intensity = 1 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !enabled) return;
    const ctx = canvas.getContext("2d");
    const kind = SEASONS[season].fx;
    const reduce = false; // effects always on
    let w = 0, h = 0, dpr = 1, raf = 0, ambient = [], sparks = [], last = 0, t = 0;
    const density = { snow: 14000, leaves: 42000, petals: 34000, fireflies: 38000 }[kind];
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = reduce ? 0 : Math.round(Math.min(kind === "snow" ? 110 : 40, Math.round((w * h) / density)) * intensity);
      while (ambient.length < target) ambient.push(makeParticle(kind, w, h));
      ambient.length = target;
    };
    resize();
    const onMove = (e) => {
      if (!trail || reduce) return;
      const now = performance.now();
      if (now - last < (kind === "snow" ? 28 : 55) / intensity) return;
      last = now;
      sparks.push(makeParticle(kind, w, h, { x: e.clientX + (Math.random() - 0.5) * 8, y: e.clientY + 6, trail: true, life: 70 + Math.random() * 40 }));
      if (sparks.length > 80) sparks.shift();
    };
    const onClick = (e) => {
      if (reduce) return;
      for (let i = 0; i < Math.round(12 * intensity); i++) {
        const p = makeParticle(kind, w, h, { x: e.clientX, y: e.clientY, trail: true, life: 80 + Math.random() * 50 });
        const a = Math.random() * Math.PI * 2, sp = 1 + Math.random() * 2.4;
        p.vx = Math.cos(a) * sp; p.vy = Math.sin(a) * sp - 1;
        sparks.push(p);
      }
    };
    const tick = () => {
      t++;
      ctx.clearRect(0, 0, w, h);
      const draw = DRAW[kind];
      for (const p of ambient) {
        stepParticle(p, kind, w, h, t);
        if (kind !== "fireflies" && (p.y > h + 30 || p.x > w + 40 || p.x < -40)) Object.assign(p, makeParticle(kind, w, h, { fresh: true }));
        draw(ctx, p);
      }
      sparks = sparks.filter((p) => p.age < p.life);
      for (const p of sparks) {
        stepParticle(p, kind, w, h, t);
        if (kind !== "fireflies") p.vy += 0.015;
        const a0 = p.alpha; p.alpha = a0 * (1 - p.age / p.life);
        draw(ctx, p); p.alpha = a0;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onClick, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onClick);
      ctx.clearRect(0, 0, w, h);
    };
  }, [season, enabled, trail, intensity]);
  return <canvas ref={ref} className="season-canvas" aria-hidden="true" style={{ display: enabled ? "block" : "none" }} />;
}

// Small control, bottom-right. Closed it shows the current season; open it
// lists the four so a visitor can override the location-based one.
function SeasonDock({ season, auto, setSeason }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const pick = (s) => { setSeason(s === auto ? null : s); setOpen(false); };
  return (
    <div className={"season-dock" + (open ? " open" : "")} ref={ref}>
      {open && (
        <div className="season-dock-menu" role="menu" aria-label="Season">
          {SEASON_ORDER.map((s) => (
            <button key={s} type="button" role="menuitemradio" aria-checked={s === season} className={"season-dock-opt" + (s === season ? " on" : "")} style={{ "--chip": SEASONS[s].accent }} onClick={() => pick(s)}>
              <i /><span>{s}</span>{s === auto ? <span className="now">here</span> : null}
            </button>
          ))}
        </div>
      )}
      <button type="button" className="season-dock-btn" aria-expanded={open} aria-label={"Season, " + season + ". Change season"} onClick={() => setOpen((v) => !v)}>
        <i />{season}
      </button>
    </div>
  );
}

// ─── visitor-facing season switcher ───────────────────────────
function SeasonSwitch({ season, auto, setSeason, effects, setEffects }) {
  return (
    <div className="season-switch">
      {SEASON_ORDER.map((s) => (
        <button key={s} className={"season-chip" + (s === season ? " on" : "")} style={{ "--chip": SEASONS[s].accent }} onClick={() => setSeason(s === auto ? null : s)}>
          <span className="sw" />{s}{s === auto ? <span className="now">now</span> : null}
        </button>
      ))}
      <button className={"season-chip ghost" + (effects ? "" : " on")} onClick={() => setEffects(!effects)}>{effects ? "calm it down" : "effects off"}</button>
    </div>
  );
}

Object.assign(window, { SEASONS, SEASON_ORDER, detectSeason, useRegionSeason, SeasonFX, SeasonCursor, SeasonSwitch, SeasonDock });
