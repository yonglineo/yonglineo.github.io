// app.jsx — main app, routing, Tweaks panel

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "blue-moss-ochre",
  "intensity": "balanced",
  "density": "regular",
  "pageWidth": "standard",
  "photoShape": "portrait",
  "displayWeight": 400,
  "italicAccent": true,
  "useSerifDisplay": false,
  "showPulse": true,
  "heroVariant": "editorial",
  "particles": true,
  "cursorTrail": true,
  "seasonCursor": true,
  "seasonAccent": true,
  "dark": true
}/*EDITMODE-END*/;

// Each palette maps signal-1..4 to specific accent colors so different parts of
// the site can re-skin without restructuring.
// Each palette carries a light-mode set (tuned for the cream paper bg) and a
// dark set (pre-brightened so accents hold contrast on the near-black bg —
// these can't just be re-derived from --ink at runtime since they're applied
// as an inline style, which beats the dark-mode stylesheet override).
const PALETTES = {
  "blue-moss-ochre": {
    label: "Blue · Moss · Ochre",
    s1: "#1B3A8A", s2: "#4A6E3A", s3: "#B98C2A", s4: "#B14A2C",
    dark: { s1: "#6E94E8", s2: "#9CC07A", s3: "#E5B85A", s4: "#E08566" },
  },
  "moss-blue-ochre": {
    label: "Moss · Blue · Ochre",
    s1: "#4A6E3A", s2: "#1B3A8A", s3: "#B98C2A", s4: "#B14A2C",
    dark: { s1: "#9CC07A", s2: "#6E94E8", s3: "#E5B85A", s4: "#E08566" },
  },
  "rust-blue-moss": {
    label: "Rust · Blue · Moss",
    s1: "#B14A2C", s2: "#1B3A8A", s3: "#4A6E3A", s4: "#B98C2A",
    dark: { s1: "#E08566", s2: "#6E94E8", s3: "#9CC07A", s4: "#E5B85A" },
  },
  "ochre-rust-blue": {
    label: "Ochre · Rust · Blue",
    s1: "#B98C2A", s2: "#B14A2C", s3: "#1B3A8A", s4: "#4A6E3A",
    dark: { s1: "#E5B85A", s2: "#E08566", s3: "#6E94E8", s4: "#9CC07A" },
  },
  "mono": {
    label: "Mono · ink only",
    s1: "#0D0D0C", s2: "#2E2E2A", s3: "#4A4944", s4: "#6F6E66",
    dark: { s1: "#F2EFE6", s2: "#C9C5B8", s3: "#9C978A", s4: "#6F6E66" },
  },
};

const ROUTES = ["home", "research", "projects", "cv", "blog", "travel"];

// Routes are "page" or "page/sub" (e.g. projects/moviesstore). Both the hash
// form (#projects/moviesstore) and a real path (/projects/moviesstore, when the
// host rewrites unknown paths to index.html) resolve to the same view, so a
// deep link to a project page stays valid wherever the site is hosted.
function readRoute() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  const fromPath = window.location.pathname.replace(/^\/+|\/+$/g, "").split("/");
  const raw = hash || (ROUTES.includes(fromPath[fromPath.length - 2]) ? fromPath.slice(-2).join("/") : (ROUTES.includes(fromPath[fromPath.length - 1]) ? fromPath[fromPath.length - 1] : ""));
  const [page, sub] = raw.split("/");
  return ROUTES.includes(page) ? { page, sub: sub || null } : { page: "home", sub: null };
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const region = useRegionSeason();
  const seasonAuto = region.season;
  const season = seasonAuto;
  const [route, setRoute] = React.useState(readRoute);
  const { page, sub } = route;
  const setPage = React.useCallback((p) => setRoute({ page: p, sub: null }), []);
  const setSub = React.useCallback((s) => setRoute((r) => ({ page: r.page, sub: s })), []);

  // sync route <-> url hash
  React.useEffect(() => {
    const target = "#" + page + (sub ? "/" + sub : "");
    if (window.location.hash !== target) window.location.hash = target;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page, sub]);

  React.useEffect(() => {
    const onHash = () => setRoute(readRoute());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const data = window.SITE_DATA;
  const palette = PALETTES[t.palette] || PALETTES["blue-moss-ochre"];

  // Apply tweak-driven CSS variables to body (dark set when theme is dark —
  // these are inline styles, so they'd otherwise beat the dark-mode CSS override)
  const paletteSet = t.dark ? palette.dark : palette;
  const S = SEASONS[season];
  const bodyStyle = {
    "--signal-1": t.seasonAccent ? S.accent : paletteSet.s1,
    "--season": S.accent,
    "--signal-2": paletteSet.s2,
    "--signal-3": paletteSet.s3,
    "--signal-4": paletteSet.s4,
  };

  React.useEffect(() => {
    const root = document.body;
    Object.entries(bodyStyle).forEach(([k, v]) => root.style.setProperty(k, v));
    root.setAttribute("data-intensity", t.intensity);
    root.setAttribute("data-density", t.density);
    root.setAttribute("data-width", t.pageWidth);
    root.setAttribute("data-theme", t.dark ? "dark" : "light");
    root.style.setProperty("--hero-weight", String(t.displayWeight));
    root.setAttribute("data-season", season);
  }, [t.palette, t.intensity, t.density, t.pageWidth, t.displayWeight, t.dark, season, t.seasonAccent]);

  // Style overrides for italic-accent and serif-display toggles
  const dynamicStyles = `
    .hero-name { font-weight: ${t.displayWeight} !important; ${t.useSerifDisplay ? "font-family: var(--font-serif) !important;" : ""} }
    .hero-name .accent { ${t.italicAccent ? "" : "font-style: normal !important; font-family: inherit !important;"} }
    ${!t.showPulse ? `.pulse, .timeline-when.live .dot { animation: none !important; }` : ""}
  `;

  const tweaks = { photoShape: t.photoShape };

  let pageEl = null;
  if (page === "home")     pageEl = <HomePage     data={data} tweaks={tweaks} setPage={setPage} season={season} seasonAuto={seasonAuto} region={region} />;
  if (page === "research") pageEl = <ResearchPage data={data} tweaks={tweaks} />;
  if (page === "projects") pageEl = <ProjectsPage data={data} tweaks={tweaks} slug={sub} setSlug={setSub} />;
  if (page === "cv")       pageEl = <CVPage       data={data} tweaks={tweaks} />;
  if (page === "blog")     pageEl = <BlogPage     data={data} tweaks={tweaks} />;
  if (page === "travel")   pageEl = <TravelPage   data={data} tweaks={tweaks} />;

  return (
    <>
      <style>{dynamicStyles}</style>
      <ScrollProgress />
      <SeasonFX season={season} enabled={true} trail={true} intensity={["projects", "cv", "research"].includes(page) ? 0.7 : 1} />
      <SeasonCursor season={season} enabled={true} />
      <Nav page={page} setPage={setPage} alias={data.name.alias} season={season} place={region.place} />
      <main className="site-main">{pageEl}</main>
      <Footer data={data} setPage={setPage} />

      <TweaksPanel>
        <TweakSection label="Seasons" />
        <TweakToggle label="Season sets accent" value={t.seasonAccent} onChange={(v) => setTweak("seasonAccent", v)} />

        <TweakSection label="Theme" />
        <TweakToggle
          label="Dark mode" value={t.dark}
          onChange={(v) => setTweak("dark", v)}
        />

        <TweakSection label="Palette" />
        <TweakSelect
          label="Accent palette" value={t.palette}
          options={Object.entries(PALETTES).map(([k, v]) => ({ value: k, label: v.label }))}
          onChange={(v) => setTweak("palette", v)}
        />
        <TweakRadio
          label="Intensity" value={t.intensity}
          options={["quiet", "balanced", "bold"]}
          onChange={(v) => setTweak("intensity", v)}
        />

        <TweakSection label="Layout" />
        <TweakRadio
          label="Width" value={t.pageWidth}
          options={["narrow", "standard", "wide"]}
          onChange={(v) => setTweak("pageWidth", v)}
        />
        <TweakRadio
          label="Density" value={t.density}
          options={["compact", "regular", "comfy"]}
          onChange={(v) => setTweak("density", v)}
        />

        <TweakSection label="Hero" />
        <TweakRadio
          label="Photo shape" value={t.photoShape}
          options={["portrait", "square", "tall", "circle"]}
          onChange={(v) => setTweak("photoShape", v)}
        />
        <TweakSlider
          label="Display weight" value={t.displayWeight}
          min={200} max={700} step={100}
          onChange={(v) => setTweak("displayWeight", v)}
        />
        <TweakToggle
          label="Italic-serif accent" value={t.italicAccent}
          onChange={(v) => setTweak("italicAccent", v)}
        />
        <TweakToggle
          label="Serif display font" value={t.useSerifDisplay}
          onChange={(v) => setTweak("useSerifDisplay", v)}
        />

        <TweakSection label="Motion" />
        <TweakToggle
          label="Status pulse" value={t.showPulse}
          onChange={(v) => setTweak("showPulse", v)}
        />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
