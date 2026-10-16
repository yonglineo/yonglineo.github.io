// fx.jsx — interactive effects: reveal-on-scroll, magnetic, aurora, count-up

const { useState: _useState, useEffect: _useEffect, useRef: _useRef, useCallback: _useCallback } = React;

// ─── reveal-on-scroll ─────────────────────────────────────────
// Adds the `is-visible` class the first time the element enters the viewport.
// Use via `<Reveal>` wrapper or `useReveal()` ref-getter on existing elements.
function useReveal({ once = true, threshold = 0, rootMargin = "0px 0px -40px 0px" } = {}) {
  const ref = _useRef(null);
  _useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) {
      node.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          if (once) io.unobserve(e.target);
        } else if (!once) {
          e.target.classList.remove("is-visible");
        }
      }
    }, { threshold, rootMargin });
    io.observe(node);
    const fallback = setTimeout(() => node.classList.add("is-visible"), 1200);
    return () => { io.disconnect(); clearTimeout(fallback); };
  }, [once, threshold, rootMargin]);
  return ref;
}

function Reveal({ children, as = "div", className = "", stagger = 0, delay = 0, kind = "rise", style, ...rest }) {
  const ref = useReveal();
  const Tag = as;
  const s = { ...style };
  if (delay) s["--reveal-delay"] = delay + "ms";
  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${kind}${stagger ? " reveal-stagger" : ""} ${className}`}
      style={s}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// ─── magnetic pull (subtle cursor tracking on hover) ─────────
function useMagnetic({ strength = 14, scale = 1 } = {}) {
  const ref = _useRef(null);
  _useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / r.width;
      const dy = (e.clientY - cy) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        node.style.transform = `translate(${dx * strength}px, ${dy * strength}px) scale(${scale})`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      node.style.transform = "translate(0,0) scale(1)";
    };
    node.addEventListener("mousemove", onMove);
    node.addEventListener("mouseleave", onLeave);
    return () => {
      node.removeEventListener("mousemove", onMove);
      node.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength, scale]);
  return ref;
}

function Magnetic({ children, strength, className = "", as = "div", ...rest }) {
  const ref = useMagnetic({ strength });
  const Tag = as;
  return <Tag ref={ref} className={`magnetic ${className}`} {...rest}>{children}</Tag>;
}

// ─── aurora (cursor-tracking soft accent on hero) ────────────
function useAurora() {
  const ref = _useRef(null);
  _useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    let cx = 50, cy = 30; // start centered-upper
    node.style.setProperty("--aurora-x", cx + "%");
    node.style.setProperty("--aurora-y", cy + "%");
    const onMove = (e) => {
      const r = node.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // ease toward cursor
        cx += (x - cx) * 0.18;
        cy += (y - cy) * 0.18;
        node.style.setProperty("--aurora-x", cx + "%");
        node.style.setProperty("--aurora-y", cy + "%");
      });
    };
    node.addEventListener("mousemove", onMove);
    return () => { node.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return ref;
}

// ─── count-up number (animates from 0 to target when in view) ─
function CountUp({ to, from = 0, suffix = "", prefix = "", decimals = 0, durationMs = 1400 }) {
  const ref = _useRef(null);
  const [val, setVal] = _useState(from);
  _useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let raf = 0;
    let started = false;
    const tween = () => {
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - t0) / durationMs);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setVal(from + (to - from) * eased);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !started) {
          started = true;
          tween();
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.4 });
    io.observe(node);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, from, durationMs]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

// ─── scroll progress bar (top of viewport) ────────────────────
function ScrollProgress() {
  const [p, setP] = _useState(0);
  _useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      const pct = total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0;
      setP(pct);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${p})` }} />
    </div>
  );
}

// ─── scrolling marquee ────────────────────────────────────────
function Marquee({ children, speed = 40, reverse = false, pauseOnHover = true }) {
  return (
    <div className={`marquee${pauseOnHover ? " marquee-pause" : ""}`}>
      <div className="marquee-track" style={{ animationDuration: speed + "s", animationDirection: reverse ? "reverse" : "normal" }}>
        <div className="marquee-row">{children}</div>
        <div className="marquee-row" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

// expose
Object.assign(window, {
  useReveal, Reveal,
  useMagnetic, Magnetic,
  useAurora,
  CountUp,
  ScrollProgress,
  Marquee,
});
