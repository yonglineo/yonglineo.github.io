// pages-projects.jsx — 03 · Projects

function ProjectsPage({ data, slug, setSlug }) {
  const openSlug = slug || null;
  const setOpenSlug = setSlug;
  const builds = data.project_builds || [];
  const proj = builds.find(p => p.slug === openSlug);

  React.useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [openSlug]);

  if (proj) {
    const Body = window[proj.bodyComponent];
    return (
      <div className="page-view" key="project-detail">
        <section className="page" style={{ padding: "clamp(48px,7vw,100px) 0 24px" }}>
          <button className="post-back" onClick={() => setOpenSlug(null)}>← Back to projects</button>
          <Eyebrow>projects</Eyebrow>
          <h1 style={{
            fontFamily: "var(--font-serif)", fontWeight: 300,
            fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.08, letterSpacing: "-0.02em",
            margin: "20px 0 16px",
          }}>
            {proj.title}
          </h1>
          <div className="post-detail-meta">
            <span className="post-status published">{proj.tagline}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.55 }}>{proj.date}</span>
          </div>
          <div className="post-tags" style={{ marginTop: 14 }}>
            {proj.tags.map((t, j) => <Tag key={j} label={t.label} tone={t.tone} />)}
          </div>
        </section>
        <section className="page block" style={{ paddingTop: 0 }}>
          {Body ? <Body /> : <p>Write-up coming soon.</p>}
        </section>
      </div>
    );
  }

  return (
    <div className="page-view" key="projects">
      <section className="page r-head">
        <Reveal kind="rise">
          <Eyebrow>projects</Eyebrow>
          <h1 className="r-title">Things I <em>built</em>.</h1>
          <p className="c-lede">Research projects, plus side projects I built to figure out how something works end to end.</p>
        </Reveal>
      </section>
      <section className="page c-block" style={{ paddingTop: 0 }}>
        <Reveal kind="rise" className="c-head"><h2>research projects</h2></Reveal>
        <Reveal kind="rise" className="c-rows">
          {(data.projects || []).map((r, i) => (
            <div key={i} className="c-row r-pub r-static">
              <span className="k">{r.date}</span>
              <span className="v"><span className="t">{r.title}</span><span className="d">{linkProfZhang(r.sub)}</span><span className="m">{[r.status, r.stack].filter(Boolean).join(" · ")}</span></span>
              <span className="ar">{r.status === "In progress" ? <i className="r-live" /> : null}</span>
            </div>
          ))}
        </Reveal>
      </section>
      <section className="page c-block">
        <Reveal kind="rise" className="c-head"><h2>other projects</h2></Reveal>
        <Reveal kind="rise" className="c-rows">
          {(data.otherProjects || []).map((o, i) => (
            <div key={i} className="c-row r-pub r-static">
              <span className="k">{o.when}</span>
              <span className="v"><span className="t">{o.title}</span><span className="m">{o.sub}</span><span className="d">{o.body}</span><span className="m">{o.stack}</span></span>
              <span className="ar" />
            </div>
          ))}
        </Reveal>
      </section>
      <section className="page c-block">
        <Reveal kind="rise" className="c-head"><h2>builds</h2></Reveal>
        <Reveal kind="rise" className="c-rows">
          {builds.map((p) => (
            <a key={p.slug} className="c-row r-pub" href={"#projects/" + p.slug} onClick={(e) => { e.preventDefault(); setOpenSlug(p.slug); }}>
              <span className="k">{p.date}</span>
              <span className="v"><span className="t">{p.title}</span><span className="d">{p.desc}</span><span className="m">{p.tags.map((t) => t.label).join(" · ")}</span></span>
              <span className="ar">→</span>
            </a>
          ))}
        </Reveal>
      </section>
    </div>
  );
}

Object.assign(window, { ProjectsPage });
