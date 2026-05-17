// pages.jsx — page-level components

// ─── HOME ─────────────────────────────────────────────────────
function HomePage({ data, tweaks, setPage }) {
  const r = data.research_pitch;
  return (
    <div className="page-view" key="home">
      {/* HERO */}
      <section className="page hero">
        <div className="hero-grid">
          <div>
            <div className="hero-eyebrow">
              <span className="pill"><span className="pulse" /> {data.status}</span>
              <Eyebrow>Atlanta, GA · 2026</Eyebrow>
            </div>
            <h1 className="hero-name">
              {data.name.first}<br />
              <span className="accent">{data.name.last}</span>
            </h1>
            <p className="hero-lede">
              Machine learning researcher. Graph neural networks for <em>cell–cell communication</em> and drug discovery. Undergraduate Researcher at Georgia Tech, Zhang Lab.
            </p>

            <dl className="hero-meta">
              <div>
                <dt>Focus</dt>
                <dd>GNNs for cell–cell communication; drug discovery</dd>
              </div>
              <div>
                <dt>Affiliation</dt>
                <dd>Zhang Lab, Georgia Tech · Jan 2026 — Present</dd>
              </div>
              <div>
                <dt>Publications</dt>
                <dd>3 × IEEE Conference Proceedings (2022–2024)</dd>
              </div>
              <div>
                <dt>Seeking</dt>
                <dd>Research Scientist & Research Internship roles, US</dd>
              </div>
            </dl>
          </div>

          <div>
            <HeroPhoto shape={tweaks.photoShape} />
            <div className="hero-rail">
              <a href={"mailto:" + data.links.email} className="rail-btn primary">
                <Icon name="mail" size={14} /> Email me <span className="arrow">↗</span>
              </a>
              <a href={data.links.scholar} target="_blank" rel="noopener" className="rail-btn">
                <Icon name="scholar" size={14} /> Scholar <span className="arrow">↗</span>
              </a>
              <a href={data.links.linkedin} target="_blank" rel="noopener" className="rail-btn">
                <Icon name="linkedin" size={14} /> LinkedIn <span className="arrow">↗</span>
              </a>
              <a href={data.links.github} target="_blank" rel="noopener" className="rail-btn">
                <Icon name="github" size={14} /> GitHub <span className="arrow">↗</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RESEARCH STRIP — full bleed accent */}
      <section className="full-bleed bleed-blue block-bleed">
        <div className="research-strip">
          <div>
            <div className="strip-eyebrow">01 · Current research</div>
            <Eyebrow noRule>Focus</Eyebrow>
          </div>
          <div>
            <h3>
              {r.title_pre} <em>{r.title_em}</em>{r.title_post}
            </h3>
            {r.paras.map((p, i) => <p key={i}>{p}</p>)}
            <ul>
              {r.bullets.map((b, i) => (
                <li key={i}><span className="marker">{b.tag}</span><span>{b.text}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SELECTED PROJECTS */}
      <section className="page block">
        <BlockHeader
          num="02"
          title="Selected projects"
          kicker={<>Current research and prior work. Full curriculum vitae in section 03.</>}
        />
        <div className="list">
          {data.projects.map((p, i) => (
            <ItemRow key={i} date={p.date} title={p.title} sub={p.sub} tags={p.tags} status={p.status} />
          ))}
        </div>
      </section>

      {/* AWARD BANNER — full-bleed ochre */}
      <section className="full-bleed bleed-ochre block-bleed" style={{ paddingTop: "clamp(48px,6vw,80px)", paddingBottom: "clamp(48px,6vw,80px)" }}>
        <div className="award-banner">
          <div className="award-num">§</div>
          <div>
            <div className="strip-eyebrow" style={{ marginBottom: 8 }}>Award · 2026</div>
            <h3>President's Undergraduate Research Award</h3>
            <p>Georgia Institute of Technology. Research funding for the cell–cell communication project, Zhang Lab.</p>
          </div>
          <a className="rail-btn" style={{ color: "inherit", borderColor: "currentColor" }} onClick={() => setPage("cv")}>
            Curriculum vitae <span className="arrow">↗</span>
          </a>
        </div>
      </section>

      {/* PUBLICATIONS preview */}
      <section className="page block">
        <BlockHeader
          num="03"
          title="Publications"
          kicker={<>Peer-reviewed IEEE Conference Proceedings on EEG signal classification (2022–2024).</>}
        />
        <div className="list">
          {data.publications.map((p, i) => (
            <ItemRow
              key={i}
              date={p.year}
              month={p.month}
              title={p.title}
              sub={p.venue}
              tags={p.tags}
              href={p.href}
              status="View"
            />
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── RESEARCH ─────────────────────────────────────────────────
function ResearchPage({ data, tweaks }) {
  const r = data.research_pitch;
  return (
    <div className="page-view" key="research">
      <section className="page" style={{ padding: "clamp(48px,7vw,100px) 0 24px" }}>
        <Eyebrow>02 · Research</Eyebrow>
        <h1 style={{
          fontFamily: "var(--font-sans)", fontWeight: 300,
          fontSize: "clamp(40px, 7vw, 92px)", lineHeight: 1, letterSpacing: "-0.03em",
          margin: "20px 0 28px",
        }}>
          Graph neural networks for<br />
          <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400, color: "var(--signal-1)" }}>cell–cell communication</em>.
        </h1>
        <p style={{
          fontFamily: "var(--font-serif)", fontSize: 22, lineHeight: 1.55,
          maxWidth: 720, color: "var(--ink-soft)", margin: "0 0 12px",
        }}>
          Developing machine learning methods for cell–cell communication and gene regulatory network inference. The applied goal is to accelerate target identification for drug discovery through more accurate directed-interaction models.
        </p>
      </section>

      {/* Three-column research focus */}
      <section className="full-bleed bleed-blue block-bleed">
        <div className="research-strip">
          <div>
            <div className="strip-eyebrow">Current</div>
            <Eyebrow noRule>Cell–Cell Communication</Eyebrow>
          </div>
          <div>
            <h3>Signal-direction prediction with <em>graph neural networks</em>.</h3>
            <p>Cell–cell communication is fundamentally directed, but most inference methods treat interactions as undirected co-expression. This project develops GNN architectures that predict signal direction from single-cell data, producing cell-type-aware interaction maps with applications to drug-target identification.</p>
            <p>Research conducted under Associate Prof. Xiuwei Zhang in the Computational Biology group at Georgia Tech. Supported by the President's Undergraduate Research Award.</p>
            <ul>
              <li><span className="marker">PROBLEM</span><span>Directed cell–cell communication inference</span></li>
              <li><span className="marker">METHOD</span><span>Graph neural networks on single-cell interaction graphs</span></li>
              <li><span className="marker">DATA</span><span>scRNA-seq; simulated single-cell datasets</span></li>
              <li><span className="marker">GOAL</span><span>Target identification for drug discovery</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="full-bleed bleed-moss block-bleed">
        <div className="research-strip">
          <div>
            <div className="strip-eyebrow">Adjacent</div>
            <Eyebrow noRule>Gene Regulatory Networks</Eyebrow>
          </div>
          <div>
            <h3>GRN inference and <em>foundation-model</em> simulation.</h3>
            <p>Within the Zhang Lab, contributing to gene regulatory network inference and single-cell data simulation using foundation models. This work develops a working vocabulary across cellular and gene-level representations relevant to downstream drug-discovery pipelines.</p>
            <ul>
              <li><span className="marker">FOCUS</span><span>GRN structure inference</span></li>
              <li><span className="marker">STACK</span><span>PyTorch Geometric, scanpy, AnnData</span></li>
              <li><span className="marker">METHOD</span><span>Foundation-model adaptation for biological simulation</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="full-bleed bleed-rust block-bleed">
        <div className="research-strip">
          <div>
            <div className="strip-eyebrow">Prior</div>
            <Eyebrow noRule>EEG Signal Classification</Eyebrow>
          </div>
          <div>
            <h3>Three years of <em>EEG</em> research · three IEEE publications.</h3>
            <p>Prior to single-cell biology, three years of EEG signal classification for mental health: depression, confusion, and epileptic seizure detection. End-to-end deep learning pipelines in PyTorch and TensorFlow, with iterative work on preprocessing, architecture, and evaluation across multiple datasets.</p>
            <ul>
              <li><span className="marker">2024</span><span>Review of state-of-the-art depression EEG methods · IEEE</span></li>
              <li><span className="marker">2023</span><span>Confused vs. non-confused EEG classification · IEEE</span></li>
              <li><span className="marker">2022</span><span>Epileptic seizure EEG classification · IEEE</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* Publications detail */}
      <section className="page block">
        <BlockHeader
          num="·"
          title="Publications"
          kicker={<>Reverse-chronological. First-authored peer-reviewed work.</>}
        />
        <div className="list">
          {data.publications.map((p, i) => (
            <ItemRow key={i} date={p.year} month={p.month} title={p.title} sub={p.venue} tags={p.tags} href={p.href} status="View" />
          ))}
        </div>
      </section>

      {/* Selected projects */}
      <section className="page block" style={{ paddingTop: 0 }}>
        <BlockHeader
          num="·"
          title="Selected projects"
          kicker={<>Active and completed research projects.</>}
        />
        <div className="list">
          {data.projects.map((p, i) => (
            <ItemRow key={i} date={p.date} title={p.title} sub={p.sub} tags={p.tags} status={p.status} />
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── CV ───────────────────────────────────────────────────────
function CVPage({ data, tweaks }) {
  return (
    <div className="page-view" key="cv">
      <section className="page" style={{ padding: "clamp(48px,7vw,100px) 0 24px" }}>
        <Eyebrow>03 · Curriculum Vitae</Eyebrow>
        <h1 style={{
          fontFamily: "var(--font-sans)", fontWeight: 300,
          fontSize: "clamp(40px, 7vw, 92px)", lineHeight: 1, letterSpacing: "-0.03em",
          margin: "20px 0 28px",
        }}>
          Curriculum <em style={{ fontFamily: "var(--font-serif)", fontWeight: 400, color: "var(--signal-1)" }}>vitae</em>.
        </h1>
        <p style={{
          fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.55,
          maxWidth: 660, color: "var(--ink-soft)", margin: "0 0 8px",
        }}>
          Experience, education, awards, and skills. PDF available on request.
        </p>
        <div style={{ display: "flex", gap: 8, marginTop: 20, flexWrap: "wrap" }}>
          <a className="rail-btn primary" href={"mailto:" + data.links.email}><Icon name="mail" size={14} /> Request PDF <span className="arrow">↗</span></a>
          <a className="rail-btn" href={data.links.scholar} target="_blank" rel="noopener"><Icon name="scholar" size={14} /> Scholar <span className="arrow">↗</span></a>
          <a className="rail-btn" href={data.links.linkedin} target="_blank" rel="noopener"><Icon name="linkedin" size={14} /> LinkedIn <span className="arrow">↗</span></a>
        </div>
      </section>

      <section className="page block">
        <BlockHeader num="01" title="Experience" kicker={<>Research roles at Georgia Tech and prior independent work.</>} />
        <div className="timeline">
          {data.experience.map((e, i) => <TimelineItem key={i} {...e} />)}
        </div>
      </section>

      <section className="page block" style={{ paddingTop: 0 }}>
        <BlockHeader num="02" title="Education" kicker={<>Georgia Institute of Technology.</>} />
        <div className="timeline">
          {data.education.map((e, i) => <TimelineItem key={i} {...e} />)}
        </div>
      </section>

      {/* Awards full-bleed strip */}
      <section className="full-bleed bleed-ink block-bleed">
        <div className="page" style={{ padding: 0, maxWidth: "var(--page-max)", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32, alignItems: "baseline", marginBottom: 36, paddingBottom: 18, borderBottom: "1px solid rgba(255,255,255,0.25)" }}>
            <h2 style={{
              fontFamily: "var(--font-sans)", fontWeight: 400, color: "#F4F2EA",
              fontSize: "clamp(28px, 4vw, 48px)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0,
            }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, opacity: 0.5, marginRight: 8 }}>03</span>Awards & honors
            </h2>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: 17, fontStyle: "italic", color: "#F4F2EA", opacity: 0.75, maxWidth: 560 }}>
              Selected, ordered by year.
            </div>
          </div>
          <div className="list">
            {data.awards.map((a, i) => (
              <div key={i} className="item" style={{ borderTop: "1px solid rgba(255,255,255,0.18)", color: "#F4F2EA" }}>
                <div className="item-date" style={{ color: "#F4F2EA", opacity: 0.7 }}>{a.year}</div>
                <div>
                  <h4 className="item-title" style={{ color: "#F4F2EA" }}>{a.title}</h4>
                  <p className="item-sub" style={{ color: "#F4F2EA", opacity: 0.85 }}>{a.org} — {a.note}</p>
                </div>
                <div className="item-action" style={{ color: "#F4F2EA" }}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills grid */}
      <section className="page block">
        <BlockHeader num="04" title="Skills" kicker={<>Languages, frameworks, and research toolkit.</>} />
        <div className="skills-grid">
          {data.skills.map((s, i) => (
            <div className="skill-cell" key={i}>
              <Eyebrow noRule>{s.group}</Eyebrow>
              <ul>{s.items.map((it, j) => <li key={j}>{it}</li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      {/* Publications */}
      <section className="page block" style={{ paddingTop: 0 }}>
        <BlockHeader num="05" title="Publications" kicker={<>Peer-reviewed · IEEE Conference Proceedings.</>} />
        <div className="list">
          {data.publications.map((p, i) => (
            <ItemRow key={i} date={p.year} month={p.month} title={p.title} sub={p.venue} tags={p.tags} href={p.href} status="View" />
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── WRITING ──────────────────────────────────────────────────
function WritingPage({ data }) {
  return (
    <div className="page-view" key="writing">
      <section className="page" style={{ padding: "clamp(48px,7vw,100px) 0 56px" }}>
        <Eyebrow>04 · Writing</Eyebrow>
        <h1 style={{
          fontFamily: "var(--font-sans)", fontWeight: 300,
          fontSize: "clamp(40px, 7vw, 92px)", lineHeight: 1, letterSpacing: "-0.03em",
          margin: "20px 0 28px",
        }}>
          Selected writing.
        </h1>
        <p style={{
          fontFamily: "var(--font-serif)", fontSize: 19, lineHeight: 1.55,
          maxWidth: 660, color: "var(--ink-soft)", margin: 0,
        }}>
          Notes on machine learning, computational biology, and competitive programming.
        </p>
      </section>

      <section className="page block" style={{ paddingTop: 0 }}>
        <div className="posts">
          {data.posts.map((p, i) => (
            <a key={i} className="post-card"
               href={p.href || "#"}
               onClick={(e) => { if (!p.href) e.preventDefault(); }}
               target={p.href ? "_blank" : undefined}
               rel="noopener">
              <div className="post-meta">
                <span className={"post-status " + p.status}>{p.status}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.55 }}>{p.date}</span>
              </div>
              <h3>{p.title}</h3>
              <p className="post-desc">{p.desc}</p>
              <div className="post-tags">
                {p.tags.map((t, j) => <Tag key={j} label={t.label} tone={t.tone} />)}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* End slab */}
      <section className="full-bleed bleed-blue block-bleed">
        <div className="research-strip" style={{ gridTemplateColumns: "1fr 2fr" }}>
          <div>
            <div className="strip-eyebrow">Subscribe</div>
            <Eyebrow noRule>Notifications</Eyebrow>
          </div>
          <div>
            <h3>Email me to receive drafts.</h3>
            <p>Posts ship infrequently (up to six per year). Send an email with "writing" in the subject for direct notifications.</p>
            <a href={"mailto:" + data.links.email + "?subject=writing"} className="rail-btn primary" style={{ marginTop: 8, borderColor: "var(--paper)" }}>
              <Icon name="mail" size={14} /> {data.links.email} <span className="arrow">↗</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomePage, ResearchPage, CVPage, WritingPage });
