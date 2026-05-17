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
  "dark": false
}/*EDITMODE-END*/;

// Each palette maps signal-1..4 to specific accent colors so different parts of
// the site can re-skin without restructuring.
const PALETTES = {
  "blue-moss-ochre": {
    label: "Blue · Moss · Ochre",
    s1: "#1B3A8A", s2: "#4A6E3A", s3: "#B98C2A", s4: "#B14A2C",
  },
  "moss-blue-ochre": {
    label: "Moss · Blue · Ochre",
    s1: "#4A6E3A", s2: "#1B3A8A", s3: "#B98C2A", s4: "#B14A2C",
  },
  "rust-blue-moss": {
    label: "Rust · Blue · Moss",
    s1: "#B14A2C", s2: "#1B3A8A", s3: "#4A6E3A", s4: "#B98C2A",
  },
  "ochre-rust-blue": {
    label: "Ochre · Rust · Blue",
    s1: "#B98C2A", s2: "#B14A2C", s3: "#1B3A8A", s4: "#4A6E3A",
  },
  "mono": {
    label: "Mono · ink only",
    s1: "#0D0D0C", s2: "#2E2E2A", s3: "#4A4944", s4: "#6F6E66",
  },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [page, setPage] = React.useState(() => {
    const hash = window.location.hash.replace("#", "");
    return ["home", "research", "cv"].includes(hash) ? hash : "home";
  });

  // sync page <-> url hash
  React.useEffect(() => {
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash.replace("#", "");
      if (["home", "research", "cv"].includes(h)) setPage(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const data = window.SITE_DATA;
  const palette = PALETTES[t.palette] || PALETTES["blue-moss-ochre"];

  // Apply tweak-driven CSS variables to body
  const bodyStyle = {
    "--signal-1": palette.s1,
    "--signal-2": palette.s2,
    "--signal-3": palette.s3,
    "--signal-4": palette.s4,
  };

  React.useEffect(() => {
    const root = document.body;
    Object.entries(bodyStyle).forEach(([k, v]) => root.style.setProperty(k, v));
    root.setAttribute("data-intensity", t.intensity);
    root.setAttribute("data-density", t.density);
    root.setAttribute("data-width", t.pageWidth);
    root.setAttribute("data-theme", t.dark ? "dark" : "light");
    root.style.setProperty("--hero-weight", String(t.displayWeight));
  }, [t.palette, t.intensity, t.density, t.pageWidth, t.displayWeight, t.dark]);

  // Style overrides for italic-accent and serif-display toggles
  const dynamicStyles = `
    .hero-name { font-weight: ${t.displayWeight} !important; ${t.useSerifDisplay ? "font-family: var(--font-serif) !important;" : ""} }
    .hero-name .accent { ${t.italicAccent ? "" : "font-style: normal !important; font-family: inherit !important;"} }
    ${!t.showPulse ? `.pulse, .timeline-when.live .dot { animation: none !important; }` : ""}
  `;

  const tweaks = { photoShape: t.photoShape };

  let pageEl = null;
  if (page === "home")     pageEl = <HomePage     data={data} tweaks={tweaks} setPage={setPage} />;
  if (page === "research") pageEl = <ResearchPage data={data} tweaks={tweaks} />;
  if (page === "cv")       pageEl = <CVPage       data={data} tweaks={tweaks} />;

  return (
    <>
      <style>{dynamicStyles}</style>
      <Nav page={page} setPage={setPage} alias={data.name.alias} />
      <main>{pageEl}</main>
      <Footer data={data} setPage={setPage} />

      <TweaksPanel>
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
