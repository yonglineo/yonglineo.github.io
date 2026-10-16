// pages-travel.jsx — 05 · Travel & photography

function tvSrc(rel) {
  const key = rel.replace(/^.*\//, "").replace(/\.jpg$/, "");
  return (window.ASSETS_INLINE && window.ASSETS_INLINE.travel && window.ASSETS_INLINE.travel[key]) || rel;
}

// Every plate: file slug, aspect ratio (drives the justified row), caption.
const TV_HERO = {
  src: "assets/travel/jinan-tower-night.jpg", ar: 0.75,
  title: "Lake Tower at Night",
};

const TV_SERIES = [
  {
    name: "austin", cn: "Texas · USA",
    side: "A trip to Austin that was mostly an excuse to eat: brisket, ice cream in waffle bowls, a bakery lunch, and more than one coffee at Cielito Lindo. In between, a bookstore with a magazine wall I could have stayed in all day, the Capitol, and every friendly dog on the waterfront patios.",
    rows: [
      [{ src: "assets/travel/austin-bbq.jpg", ar: 1.262, cap: "Brisket tray" }, { src: "assets/travel/austin-icecream.jpg", ar: 1.365, cap: "Ice cream, waffle bowls" }, { src: "assets/travel/austin-bakery.jpg", ar: 1.323, cap: "Bakery lunch" }],
      [{ src: "assets/travel/austin-cielito-drinks.jpg", ar: 0.815, cap: "Cielito Lindo drinks" }, { src: "assets/travel/austin-cielito-counter.jpg", ar: 1.333, cap: "Cielito Lindo counter" }, { src: "assets/travel/austin-bookstore.jpg", ar: 0.734, cap: "Bookstore corner" }],
      [{ src: "assets/travel/austin-magazines.jpg", ar: 1.333, cap: "The magazine wall" }, { src: "assets/travel/austin-samoyed.jpg", ar: 0.736, cap: "Fluffiest dog on the patio" }, { src: "assets/travel/austin-aussie.jpg", ar: 0.724, cap: "Very good listener" }],
      [{ src: "assets/travel/austin-capitol.jpg", ar: 0.75, cap: "Texas Capitol" }, { src: "assets/travel/austin-rotunda.jpg", ar: 0.73, cap: "Looking up the rotunda" }, { src: "assets/travel/austin-chamber.jpg", ar: 0.75, cap: "House chamber" }, { src: "assets/travel/austin-corridor.jpg", ar: 0.75, cap: "Capitol corridor" }],
      [{ src: "assets/travel/austin-congress-ave.jpg", ar: 0.75, cap: "Congress Ave from the gate" }, { src: "assets/travel/austin-statue.jpg", ar: 0.701, cap: "Statue on the grounds" }, { src: "assets/travel/austin-monument.jpg", ar: 0.693, cap: "Monument on the grounds" }, { src: "assets/travel/austin-window-seat.jpg", ar: 0.75, cap: "Window seat" }],
    ],
  },
  {
    name: "Jinan", cn: "Shandong, China",
    side: "They call it the spring city, and it's not an exaggeration. Water runs under bridges, along lanes, even through people's back walls. I spent one afternoon just following it around.",
    rows: [
      [
        { src: "assets/travel/jinan-tower-night.jpg", ar: 0.75, cap: "Lake tower at night" },
        { src: "assets/travel/jinan-spring-pond.jpg", ar: 1.333, cap: "Spring Pond" },
        { src: "assets/travel/jinan-canal-willows.jpg", ar: 1.333, cap: "Canal & Willows" },
      ],
      [
        { src: "assets/travel/jinan-boat.jpg", ar: 0.75, cap: "Boatman on the Channel" },
        { src: "assets/travel/jinan-covered-bridge.jpg", ar: 1.333, cap: "Covered Bridge — Pic 1" },
        { src: "assets/travel/jinan-stone-stream.jpg", ar: 0.678, cap: "Carved Wall & Stream" },
      ],
      [
        { src: "assets/travel/jinan-pavilion-reflection.jpg", ar: 1.333, cap: "Pavilion Reflection" },
        { src: "assets/travel/jinan-bridge-boat.jpg", ar: 1.409, cap: "Covered Bridge — Pic 2" },
      ],
      [
        { src: "assets/travel/jinan-courtyard-gate.jpg", ar: 0.75, cap: "Moon Gate" },
        { src: "assets/travel/jinan-waterfall-lane.jpg", ar: 1.333, cap: "Waterfall Lane" },
        { src: "assets/travel/jinan-cat.jpg", ar: 0.75, cap: "Local Cat" },
      ],
      [
        { src: "assets/travel/jinan-lattice-windows.jpg", ar: 1.333, cap: "Lattice Windows" },
        { src: "assets/travel/jinan-park-night-lanterns.jpg", ar: 1.333, cap: "Night Carousel" },
      ],
    ],
  },
  {
    name: "Mount Tai", cn: "Shandong, China",
    side: "The big one of China's five sacred mountains. Pine trees growing out of bare rock, old carvings everywhere, and a summit packed with everyone else who also thought climbing it was a good idea. My legs still remember.",
    rows: [
      [
        { src: "assets/travel/taishan-summit-temple.jpg", ar: 0.75, cap: "Summit Temple" },
        { src: "assets/travel/taishan-rock-inscription.jpg", ar: 0.75, cap: "Rock Inscription" },
        { src: "assets/travel/taishan-overlook-crowd.jpg", ar: 0.847, cap: "Summit Overlook" },
      ],
    ],
  },
  {
    name: "Beijing", cn: "Beijing, China",
    side: "Totally different from Jinan. No water, no willows, just gold tiles and red wood on a scale that doesn't fit in one photo. So I mostly shot the details: an eave, a plaque, a doorway.",
    rows: [
      [
        { src: "assets/travel/beijing-gate-view.jpg", ar: 0.937, cap: "Gate View" },
        { src: "assets/travel/beijing-taihe-hall.jpg", ar: 1.294, cap: "Hall of Supreme Harmony" },
      ],
      [
        { src: "assets/travel/beijing-red-gate.jpg", ar: 0.75, cap: "Red Gate" },
        { src: "assets/travel/beijing-eaves.jpg", ar: 1.329, cap: "Crossing Eaves" },
        { src: "assets/travel/beijing-gate-pines.jpg", ar: 1.415, cap: "Gate Roof & Pines" },
      ],
      [
        { src: "assets/travel/beijing-hall-of-prayer.jpg", ar: 0.75, cap: "Hall of Prayer for Good Harvests — Pic 1" },
        { src: "assets/travel/beijing-imperial-vault.jpg", ar: 0.865, cap: "Imperial Vault of Heaven — Pic 1" },
        { src: "assets/travel/beijing-imperial-vault-detail.jpg", ar: 0.75, cap: "Imperial Vault of Heaven — Pic 2" },
      ],
      [
        { src: "assets/travel/beijing-hall-of-prayer-wall.jpg", ar: 0.75, cap: "Hall of Prayer for Good Harvests — Pic 2" },
        { src: "assets/travel/lantern-woman-portrait.jpg", ar: 0.75, cap: "Lantern Sculpture" },
      ],
    ],
  },
];

const TV_INTERLUDES = [
  { src: "assets/travel/transit-wing-seoul.jpg", ar: 0.75, cap: "Over Seoul" },
  { src: "assets/travel/backlot-street.jpg", ar: 1.333, cap: "Back-lot Street" },
  { src: "assets/travel/transit-kitten.jpg", ar: 1.333, cap: "Rest-stop Kitten" },
];

// Flat, numbered list — used for figure numbers and lightbox navigation.
const TV_FLAT = TV_SERIES.flatMap(s => s.rows.flat()).concat(TV_INTERLUDES).map((p, i) => ({ ...p, n: String(i + 1).padStart(2, "0") }));

function tvIndexOf(src) { return TV_FLAT.findIndex(p => p.src === src); }

// ─── plate ────────────────────────────────────────────────────
function TravelPlate({ plate, onOpen }) {
  const i = tvIndexOf(plate.src);
  const item = TV_FLAT[i];
  return (
    <button className="tv-plate" style={{ "--ar": plate.ar }} onClick={() => onOpen(i)}>
      <div className="tv-frame">
        <img src={tvSrc(plate.src)} alt={plate.cap} loading="lazy" />
      </div>
      <div className="tv-cap">
        <span className="t">{plate.cap}</span>
      </div>
    </button>
  );
}

// ─── lightbox ─────────────────────────────────────────────────
function TravelLightbox({ index, setIndex }) {
  const p = TV_FLAT[index];
  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") setIndex((index + 1) % TV_FLAT.length);
      if (e.key === "ArrowLeft") setIndex((index - 1 + TV_FLAT.length) % TV_FLAT.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, setIndex]);
  React.useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);
  if (!p) return null;
  // Portalled to <body>: .page-view carries an animation transform, which would
  // otherwise become the containing block for this position:fixed overlay.
  return ReactDOM.createPortal(
    <div className="tv-lightbox" onClick={() => setIndex(null)}>
      <div className="tv-lb-bar" onClick={(e) => e.stopPropagation()}>
        <span>{p.n} / {String(TV_FLAT.length).padStart(2, "0")}</span>
        <span className="tv-lb-nav">
          <button onClick={() => setIndex((index - 1 + TV_FLAT.length) % TV_FLAT.length)}>← Prev</button>
          <button onClick={() => setIndex((index + 1) % TV_FLAT.length)}>Next →</button>
          <button onClick={() => setIndex(null)}>Close ✕</button>
        </span>
      </div>
      <div className="tv-lb-stage" onClick={() => setIndex(null)}>
        <img src={tvSrc(p.src)} alt={p.cap || p.title} />
      </div>
      <div className="tv-lb-cap" onClick={(e) => e.stopPropagation()}>
        <span className="t">{p.cap}</span>
      </div>
    </div>,
    document.body
  );
}

function TravelInterludes({ onOpen }) {
  return (
    <section className="page c-block">
      <Reveal kind="rise" className="c-head"><h2>along the way</h2></Reveal>
      <Reveal kind="rise" className="c-lede tv-side">Planes, back streets and one very small kitten at a rest stop.</Reveal>
      <Reveal kind="rise" className="tv-row">
        {TV_INTERLUDES.map((p, i) => <TravelPlate key={i} plate={p} onOpen={onOpen} />)}
      </Reveal>
    </section>
  );
}

// ─── page ─────────────────────────────────────────────────────
function TravelPage({ data }) {
  const [open, setOpen] = React.useState(null);

  return (
    <div className="page-view" key="travel">
      <section className="page r-head">
        <Reveal kind="rise">
          <Eyebrow>travel</Eyebrow>
          <h1 className="r-title">Travel photos</h1>
          <p className="c-lede">I love taking photos, especially when I'm somewhere new. Walking around with my phone out, catching light on water, old rooftops or a quiet street, is one of my favorite ways to remember a place.</p>
        </Reveal>
      </section>

      {TV_SERIES.map((s, si) => (
        <section className="page c-block" key={si} style={si === 0 ? { paddingTop: 0 } : null}>
          <Reveal kind="rise" className="c-head"><h2>{s.name}</h2><span className="tv-cn">{s.cn}</span></Reveal>
          <Reveal kind="rise" className="c-lede tv-side">{s.side}</Reveal>
          <div className="tv-series">
            {s.rows.map((row, ri) => (
              <Reveal kind="rise" key={ri} className="tv-row">
                {row.map((p, pi) => <TravelPlate key={pi} plate={p} onOpen={setOpen} />)}
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      <TravelInterludes onOpen={setOpen} />

      <section className="page c-outro">
        <div className="c-quote">
          <p className="c-lede">I like walking around new places with no plan and my phone out. If you want a full-res copy of anything, <a href={"mailto:" + data.links.email + "?subject=photography"}>just ask</a>.</p>
        </div>
      </section>

      {open !== null && <TravelLightbox index={open} setIndex={setOpen} />}
    </div>
  );
}

Object.assign(window, { TravelPage });
