// pages.jsx — page-level components

// ─── HOME ─────────────────────────────────────────────────────
function HomePage({ data, setPage, season, seasonAuto, region = {} }) {
  const S = SEASONS[season];
  const year = new Date().getFullYear();
  const latest = data.posts.slice().sort((x, y) => new Date("1 " + y.date) - new Date("1 " + x.date)).slice(0, 3);
  const openPost = (slug) => { window.__openPost = slug; setPage("blog"); };
  const go = (p) => (e) => { e.preventDefault(); setPage(p); };
  return (
    <div className="page-view" key="home">
      <section className="page c-hero">
        <Reveal kind="rise" className="c-hero-text">
          <div className="c-kicker"><span className="c-dot" />Atlanta, GA · {year}</div>
          <h1 className="c-title">hey, I'm <em>Neo</em>.</h1>
          <p className="c-lede">I'm a CS major at Georgia Tech. I'm interested in geometric deep learning &amp; computational biology research, primarily focusing on algorithmic advancements. I'm currently in the Zhang Lab, under the supervision of <a className="person-link" href="https://xiuweizhang.wordpress.com/" target="_blank" rel="noopener">Prof. Xiuwei Zhang</a>.</p>
          <p className="c-lede" style={{ marginTop: 14 }}>Outside of research, I love taking photos and cooking food.</p>
          <div className="c-links">
            <a href={"mailto:" + data.links.email}>email</a>
            <a href={data.links.github} target="_blank" rel="noopener">github</a>
            <a href={data.links.linkedin} target="_blank" rel="noopener">linkedin</a>
            <a href={data.links.scholar} target="_blank" rel="noopener">scholar</a>
            <a href={data.links.resume} download="Yong_Li_Neo_Resume.pdf">resume ↓</a>
            <a href={data.links.cv} download="Yong_Li_Neo_CV.pdf">cv ↓</a>
          </div>
          <p className="c-season">
            {season === seasonAuto
              ? <>It's {S.label} where you are{region.place ? ` (${region.place})` : ""}{region.tropical ? " — which, near the equator, is basically always" : ""}, {S.line}.</>
              : <>It's {S.label} in here, {S.line}.</>}
            {" "}Wiggle your cursor or click around.
          </p>
        </Reveal>
        <Reveal kind="rise" delay={120} className="c-photo-wrap">
          <figure className="c-photo">
            <img src={(window.ASSETS_INLINE && window.ASSETS_INLINE.photoCasual) || "assets/photo-casual.jpg"} alt="Neo with a plush cat, doing a peace sign" />
            <figcaption>me + desk buddy</figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="page c-outro">
        <Reveal kind="blur" className="c-quote">
          <p className="c-lede" style={{ marginBottom: 28 }}>Pls feel free to visit other sections on this webpage!</p>
          <blockquote>“Walking down a path till I die — isn't that also, in its own way, a <em>dead end</em>?”</blockquote>
          <span>— me, overthinking</span>
        </Reveal>
      </section>
    </div>
  );
}

// ─── stat cell helper (count-up + accent rule) ────────────────
function StatCell({ accent, delay, to, dec, unit, suffix, label, sub }) {
  return (
    <Reveal kind="rise" delay={delay} className="stat-cell" style={{ "--accent": accent }}>
      <div className="stat-num">
        <CountUp to={to} decimals={dec || 0} suffix={suffix || ""} />
        {unit && <span className="unit">{unit}</span>}
      </div>
      <div className="stat-label">{label}</div>
      <p className="stat-sub">{sub}</p>
    </Reveal>
  );
}

// ─── RESEARCH ─────────────────────────────────────────────────
function ResearchPage({ data }) {
  return (
    <div className="page-view" key="research">
      <section className="page r-head">
        <Reveal kind="rise">
          <Eyebrow>research</Eyebrow>
          <h1 className="r-title">Research</h1>
          <p className="c-lede">I'm currently in the Zhang Lab at Georgia Tech, under the supervision of <a className="person-link" href="https://xiuweizhang.wordpress.com/" target="_blank" rel="noopener">Prof. Xiuwei Zhang</a>, where my work spans cell–cell communication, spatial domains, and lineage reconstruction. Before that, I spent three years on machine learning/deep learning for EEG signal classification.</p>
        </Reveal>
      </section>
      <section className="page c-block" style={{ paddingTop: 0 }}>
        <Reveal kind="rise" className="c-head"><h2>publications</h2></Reveal>
        <Reveal kind="rise" className="c-rows">
          {data.publications.map((pub, i) => (
            <a key={i} className="c-row r-pub" href={pub.href} target="_blank" rel="noopener">
              <span className="k">{pub.month} {pub.year}</span>
              <span className="v"><span className="t">{pub.title}</span><span className="m">{pub.author_note} · {pub.venue}</span></span>
              <span className="ar">↗</span>
            </a>
          ))}
        </Reveal>
      </section>
    </div>
  );
}

// ─── CV ───────────────────────────────────────────────────────
function CVPage({ data }) {
  const yearOf = (s) => { const m = (s || "").match(/(20\d{2})/); return m ? +m[1] : 0; };
  const journey = [...(data.education || []), ...(data.experience || [])].sort((a, b) => yearOf(b.when) - yearOf(a.when));
  return (
    <div className="page-view" key="cv">
      <section className="page r-head">
        <Reveal kind="rise">
          <Eyebrow>cv</Eyebrow>
          <h1 className="r-title">The resume-y <em>stuff</em>.</h1>
          <p className="c-lede">School, jobs, awards and skills. The full academic version is the CV; the one-page summary is the resume.</p>
          <div className="c-links">
            <a href={data.links.cv} download="Yong_Li_Neo_CV.pdf">cv ↓</a>
            <a href={data.links.resume} download="Yong_Li_Neo_Resume.pdf">resume ↓</a>
            <a href={data.links.scholar} target="_blank" rel="noopener">scholar</a>
            <a href={data.links.linkedin} target="_blank" rel="noopener">linkedin</a>
          </div>
        </Reveal>
      </section>
      <section className="page c-block" style={{ paddingTop: 0 }}>
        <Reveal kind="rise" className="c-head"><h2>experience &amp; education</h2></Reveal>
        <Reveal kind="rise" className="c-rows">
          {journey.map((j, i) => (
            <div key={i} className="c-row r-pub r-static">
              <span className="k">{j.when}</span>
              <span className="v"><span className="t">{j.role}</span><span className="m">{j.org}{j.group ? <> · {linkProfZhang(j.group)}</> : null}</span><span className="d">{j.body}</span></span>
              <span className="ar">{j.live ? <i className="r-live" /> : null}</span>
            </div>
          ))}
        </Reveal>
      </section>
      <section className="page c-block">
        <Reveal kind="rise" className="c-head"><h2>other projects</h2></Reveal>
        <Reveal kind="rise" className="c-rows">
          {data.otherProjects.map((o, i) => (
            <div key={i} className="c-row r-pub r-static"><span className="k">{o.when}</span><span className="v"><span className="t">{o.title}</span><span className="m">{o.sub}</span><span className="d">{o.body}</span></span><span className="ar" /></div>
          ))}
        </Reveal>
      </section>
      <section className="page c-block">
        <Reveal kind="rise" className="c-head"><h2>skills</h2></Reveal>
        <Reveal kind="rise" className="c-rows">
          {data.skills.map((s, i) => (
            <div key={i} className="c-row r-static"><span className="k">{s.group}</span><span className="v">{s.items.join(", ")}</span><span className="ar" /></div>
          ))}
        </Reveal>
      </section>
      <section className="page c-block">
        <Reveal kind="rise" className="c-head"><h2>awards</h2></Reveal>
        <Reveal kind="rise" className="c-rows">
          {data.awards.map((a, i) => (
            <div key={i} className="c-row r-pub r-static"><span className="k">{a.year}</span><span className="v"><span className="t">{a.title}</span><span className="m">{a.org} · {a.note}</span></span><span className="ar" /></div>
          ))}
        </Reveal>
      </section>
      <section className="page c-block" style={{ paddingBottom: "clamp(40px,5vw,72px)" }}>
        <Reveal kind="rise" className="c-head"><h2>publications</h2></Reveal>
        <Reveal kind="rise" className="c-rows">
          {data.publications.map((pub, i) => (
            <a key={i} className="c-row r-pub" href={pub.href} target="_blank" rel="noopener">
              <span className="k">{pub.month} {pub.year}</span>
              <span className="v"><span className="t">{pub.title}</span><span className="m">{pub.author_note} · {pub.venue}</span></span>
              <span className="ar">↗</span>
            </a>
          ))}
        </Reveal>
      </section>
    </div>
  );
}

// ─── CV helpers ───────────────────────────────────────────────
function CVKpi({ accent, to, dec, suffix, unit, label, sub }) {
  // No own reveal — parent `.reveal-stagger` handles the entrance.
  // We still need `is-visible` on the cell itself so the accent bar animates,
  // so use the reveal observer just for that side-effect.
  return (
    <div className="cv-kpi" ref={useReveal()} style={{ "--accent": accent }}>
      <div className="kpi-num">
        <CountUp to={to} decimals={dec || 0} suffix={suffix || ""} />
        {unit && <span className="unit">{unit}</span>}
      </div>
      <div className="kpi-label">{label}</div>
      <p className="kpi-sub">{sub}</p>
    </div>
  );
}

function JourneyCard({ entry, open, onToggle, accent }) {
  const yearLabel = (() => {
    const w = entry.when || "";
    if (entry.live) return "Now";
    const m = w.match(/(20\d{2})/);
    return m ? m[1] : "";
  })();
  return (
    <div className="journey-item">
      <div className="journey-tick" style={{ "--accent": accent }}>
        <span className="year">{yearLabel}</span>
        <span className={"status" + (entry.live ? " live" : "")}>{entry.live ? "Present" : (entry.kind === "edu" ? "Education" : "Role")}</span>
      </div>
      <div
        className={"journey-card" + (open ? " open" : "")}
        style={{ "--accent": accent }}
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); } }}
      >
        <div className="journey-head">
          <div>
            <h3 className="journey-role">{entry.role}</h3>
            <p className="journey-org">{entry.org}<span className="sep">·</span>{entry.group}</p>
          </div>
          <span className="journey-toggle">
            {open ? "Close" : "Details"}<span className="chev" />
          </span>
        </div>
        <div className="journey-body">
          <p>{entry.body}</p>
          {entry.tags && entry.tags.length > 0 && (
            <div className="journey-tags">
              {entry.tags.map((t, i) => <Tag key={i} label={t.label} tone={t.tone} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Skill cell with proficiency bars. Levels per item are heuristic
// based on order within the group (first = deepest).
function SkillCell({ group, items, accent }) {
  return (
    <div className="skill-cell" ref={useReveal()} style={{ "--accent": accent }}>
      <Eyebrow noRule>{group}</Eyebrow>
      <ul>
        {items.map((it, j) => <li key={j}>{it}</li>)}
      </ul>
    </div>
  );
}

// ─── BLOG ─────────────────────────────────────────────────────
function BlogPage({ data }) {
  const [openSlug, setOpenSlug] = React.useState(() => { const s = window.__openPost || null; window.__openPost = null; return s; });
  const post = data.posts.find(p => p.slug === openSlug);

  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [openSlug]);

  if (post) {
    const Body = window[post.bodyComponent];
    return (
      <div className="page-view" key="blog-post">
        <section className="page" style={{ padding: "clamp(48px,7vw,100px) 0 24px" }}>
          <button className="post-back" onClick={() => setOpenSlug(null)}>← Back to blog</button>
          <Eyebrow>blog</Eyebrow>
          <h1 style={{
            fontFamily: "var(--font-serif)", fontWeight: 300,
            fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.02em",
            margin: "20px 0 16px",
          }}>
            {post.title}
          </h1>
          <div className="post-detail-meta">
            <span className={"post-status " + post.status}>{post.byline || post.status}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.55 }}>{post.date}</span>
          </div>
          <div className="post-tags" style={{ marginTop: 14 }}>
            {post.tags.map((t, j) => <Tag key={j} label={t.label} tone={t.tone} />)}
          </div>
        </section>
        <section className="page block" style={{ paddingTop: 0 }}>
          {post.toc && window[post.toc] ? (
            <div className="post-with-toc">
              <aside className="post-toc">
                <div className="post-toc-label">Contents</div>
                <nav>{window[post.toc].map((item) => (
                  <a key={item.id} href={"#" + item.id} onClick={(e) => {
                    // Hash routing owns location.hash; a bare #section id is read as a page
                    // and falls through to home. Scroll in place and leave the route alone.
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}>{item.label}</a>
                ))}</nav>
              </aside>
              <div className="post-toc-body">{Body ? <Body /> : <p>Content coming soon.</p>}</div>
            </div>
          ) : (
            Body ? <Body /> : <p>Content coming soon.</p>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="page-view" key="blog">
      <section className="page r-head">
        <Reveal kind="rise">
          <Eyebrow>blog</Eyebrow>
          <h1 className="r-title">Stuff I <em>wrote</em>.</h1>
          <p className="c-lede">Course notes, competitive programming write-ups, and the occasional ML rabbit hole.</p>
        </Reveal>
      </section>
      <section className="page c-block" style={{ paddingTop: 0, paddingBottom: "clamp(40px,5vw,72px)" }}>
        <Reveal kind="rise" className="c-head"><h2>posts</h2></Reveal>
        <Reveal kind="rise" className="c-rows">
          {data.posts.map((post) => (
            <a key={post.slug} className="c-row r-pub" href="#blog" onClick={(e) => { e.preventDefault(); setOpenSlug(post.slug); }}>
              <span className="k">{post.date}</span>
              <span className="v"><span className="t">{post.title}</span><span className="d">{post.desc}</span></span>
              <span className="ar">→</span>
            </a>
          ))}
        </Reveal>
      </section>
    </div>
  );
}

// Turns the professor's name into a link when it appears inside a plain string.
function linkProfZhang(text) {
  const name = "Prof. Xiuwei Zhang";
  if (typeof text !== "string" || !text.includes(name)) return text;
  const parts = text.split(name);
  const out = [];
  parts.forEach((part, i) => {
    if (i > 0) out.push(<a key={i} className="person-link" href="https://xiuweizhang.wordpress.com/" target="_blank" rel="noopener">{name}</a>);
    if (part) out.push(part);
  });
  return out;
}

Object.assign(window, { HomePage, ResearchPage, CVPage, BlogPage, linkProfZhang });
