import { useState, useEffect } from "react";
import { Github, Mail, MapPin, ChevronDown, Linkedin } from "lucide-react";

const ROLES = ["AI ENGINEER", "SOFTWARE DEVELOPER", "DATA ANALYST", "FULL STACK DEV"];

const EXPERIENCE = [
  {
    title: "AI ENGINEER",
    company: "NEFERTITI LTD",
    period: "07 2024 – PRESENT",
    location: "HONG KONG SAR",
    bullets: [
      "Owned and scaled end-to-end AI generation infrastructure (FastAPI, Redis, RunPod, AWS, R2) for real-time image/video inference at production scale.",
      "Improved reliability from ~84% to >97% and reduced failures by ~70–90%, while increasing throughput by ~2–3× and cutting cloud costs by ~30–50% via async pipelines, queue redesign, and GPU recovery.",
    ],
    tags: ["FASTAPI", "REDIS", "AWS", "RUNPOD", "PYTHON"],
    color: "#00ff41",
  },
  {
    title: "SOFTWARE DEV INTERN",
    company: "MANULIFE INVESTMENT MGMT",
    period: "06 2023 – 08 2023",
    location: "HONG KONG SAR",
    bullets: [
      "Contributed to backend development for multiple microservices and developed APIs for iFUNDS, supporting front-end operations related to fund management.",
      "Applied Agile methodologies with TypeScript and Nest.js, engaging in code review, version control, sprint cycles, and CI/CD practices.",
    ],
    tags: ["TYPESCRIPT", "NEST.JS", "MICROSERVICES", "CI/CD"],
    color: "#ff00ff",
  },
  {
    title: "DATA ANALYST",
    company: "DLAB ASSET MANAGEMENT",
    period: "04 2023 – 06 2023",
    location: "HONG KONG SAR",
    bullets: [
      "Developed risk assessment models using Python and quantitative analysis, enabling portfolio volatility optimization and smarter asset allocation.",
      "Built 24 dashboards and 35 ad hoc reports in Power BI to address business problems and streamline processes.",
    ],
    tags: ["PYTHON", "POWER BI", "QUANTITATIVE ANALYSIS", "SQL"],
    color: "#00ffff",
  },
  {
    title: "BUSINESS INTELLIGENCE INTERN",
    company: "GENERALI",
    period: "08 2022 – 12 2022",
    location: "HONG KONG SAR",
    bullets: [
      "Executed real-time data streaming solutions with Apache Kafka, resulting in a 41% reduction in data latency.",
      "Led KPI evaluation and refinement to measure business performance, delivering actionable insights for data-driven decisions.",
    ],
    tags: ["APACHE KAFKA", "POWER BI", "DATA PIPELINES", "KPI"],
    color: "#ffff00",
  },
];

const SKILLS = {
  "AI / ML": [
    { name: "PYTHON", pct: 92 },
    { name: "FASTAPI", pct: 85 },
    { name: "REDIS / QUEUES", pct: 80 },
    { name: "AWS / CLOUD", pct: 78 },
  ],
  DEVELOPMENT: [
    { name: "TYPESCRIPT / JS", pct: 85 },
    { name: "NODE.JS / NEST.JS", pct: 82 },
    { name: "C++ / JAVA", pct: 75 },
    { name: "GITHUB / CI/CD", pct: 88 },
  ],
  DATA: [
    { name: "SQL", pct: 88 },
    { name: "POWER BI", pct: 85 },
    { name: "APACHE KAFKA", pct: 72 },
    { name: "MATLAB", pct: 70 },
  ],
};

const STATS = [
  { label: "YEARS EXP", value: "03+" },
  { label: "REPORTS BUILT", value: "59" },
  { label: "LATENCY CUT", value: "41%" },
  { label: "COST SAVED", value: "50%" },
];

const TECH_MARQUEE = [
  "PYTHON", "TYPESCRIPT", "FASTAPI", "REDIS", "AWS", "NODE.JS",
  "SQL", "POWER BI", "APACHE KAFKA", "C++", "NEST.JS", "MATLAB", "GITHUB",
];

type SkillCategory = keyof typeof SKILLS;

export default function App() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [skillTab, setSkillTab] = useState<SkillCategory>("AI / ML");
  const [activeExp, setActiveExp] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const current = ROLES[roleIdx];
    const id = setTimeout(
      () => {
        if (!deleting) {
          if (typed.length < current.length) {
            setTyped(current.slice(0, typed.length + 1));
          } else {
            setTimeout(() => setDeleting(true), 1800);
          }
        } else {
          if (typed.length > 0) {
            setTyped(typed.slice(0, -1));
          } else {
            setDeleting(false);
            setRoleIdx((i) => (i + 1) % ROLES.length);
          }
        }
      },
      deleting ? 55 : 110,
    );
    return () => clearTimeout(id);
  }, [typed, deleting, roleIdx]);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&family=Share+Tech+Mono&display=swap');

        @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes flicker      { 0%,96%,100%{opacity:1} 97%{opacity:.75} 98%{opacity:.9} 99%{opacity:.7} }
        @keyframes marquee      { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes pixelPulse   { 0%,100%{box-shadow:0 0 8px rgba(0,255,65,.4)} 50%{box-shadow:0 0 24px rgba(0,255,65,.9)} }

        .cursor-blink::after {
          content: '█';
          animation: blink 1s step-end infinite;
          color: #00ff41;
        }
        .blink-dot { animation: blink 1.6s step-end infinite; }

        .scanlines {
          pointer-events: none;
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: repeating-linear-gradient(
            to bottom,
            transparent 0px, transparent 3px,
            rgba(0,0,0,.06) 3px, rgba(0,0,0,.06) 4px
          );
          animation: flicker 10s infinite;
        }

        .px-btn {
          position: relative;
          font-family: 'Press Start 2P', monospace;
          font-size: 10px;
          padding: 12px 24px;
          border: 2px solid #00ff41;
          color: #00ff41;
          background: transparent;
          box-shadow: 4px 4px 0 #006b1a;
          cursor: pointer;
          transition: all .1s;
          white-space: nowrap;
        }
        .px-btn:hover { box-shadow: 2px 2px 0 #006b1a; transform: translate(2px,2px); }
        .px-btn:active { box-shadow: none; transform: translate(4px,4px); }

        .px-btn-mg {
          border-color: #ff00ff;
          color: #ff00ff;
          box-shadow: 4px 4px 0 #6b006b;
        }
        .px-btn-mg:hover { box-shadow: 2px 2px 0 #6b006b; }

        .glow-g  { text-shadow: 0 0 12px rgba(0,255,65,.8), 0 0 32px rgba(0,255,65,.35); }
        .glow-mg { text-shadow: 0 0 12px rgba(255,0,255,.8), 0 0 32px rgba(255,0,255,.35); }
        .glow-cy { text-shadow: 0 0 12px rgba(0,255,255,.8), 0 0 32px rgba(0,255,255,.35); }

        .nav-link {
          font-family: 'Press Start 2P', monospace;
          font-size: 9px;
          letter-spacing: .1em;
          color: rgba(212,232,212,.5);
          transition: color .2s;
          position: relative;
          padding-bottom: 4px;
          background: none;
          border: none;
          cursor: pointer;
        }
        .nav-link::after {
          content:'';
          position:absolute; left:0; right:0; bottom:0; height:2px;
          background:#00ff41;
          transform: scaleX(0);
          transition: transform .2s;
        }
        .nav-link:hover { color: #00ff41; }
        .nav-link:hover::after { transform: scaleX(1); }

        .prog-bg {
          background: rgba(0,255,65,.08);
          border: 1px solid rgba(0,255,65,.25);
          height: 14px;
        }
        .prog-fill {
          height: 100%;
          background: repeating-linear-gradient(
            90deg,
            #00ff41 0px, #00ff41 10px, #005a16 10px, #005a16 12px
          );
          box-shadow: 0 0 8px rgba(0,255,65,.5);
          transition: width 1.1s cubic-bezier(.4,0,.2,1);
        }

        .marquee-wrap { overflow: hidden; }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 24s linear infinite;
        }

        .px-input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(0,255,65,.3);
          color: #d4e8d4;
          padding: 8px 12px;
          font-size: 13px;
          font-family: 'Share Tech Mono', monospace;
          outline: none;
          transition: border-color .2s;
          box-sizing: border-box;
        }
        .px-input:focus { border-color: #00ff41; }

        .grid-bg {
          background-image:
            linear-gradient(rgba(0,255,65,.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,.12) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .exp-tab {
          cursor: pointer;
          padding: 14px 16px;
          border-left: 3px solid rgba(0,255,65,.2);
          transition: all .15s;
          background: transparent;
          text-align: left;
          width: 100%;
          display: block;
        }
        .exp-tab:hover { border-left-color: rgba(0,255,65,.6); background: rgba(0,255,65,.04); }
        .exp-tab.active { border-left-color: #00ff41; background: rgba(0,255,65,.07); }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: #080810; }
        ::-webkit-scrollbar-thumb { background: #00ff41; }
        * { scrollbar-width: thin; scrollbar-color: #00ff41 #080810; }
      `}</style>

      <div className="scanlines" aria-hidden="true" />

      <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Share Tech Mono', monospace" }}>

        {/* ── NAV ── */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <button
              onClick={() => scrollTo("hero")}
              className="glow-g"
              style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "11px", color: "#00ff41", background: "none", border: "none", cursor: "pointer" }}
            >
              &gt;_ ISHANVI.EXE
            </button>

            <div className="hidden md:flex items-center gap-8">
              {["ABOUT", "EXPERIENCE", "SKILLS", "CONTACT"].map((s) => (
                <button key={s} className="nav-link" onClick={() => scrollTo(s.toLowerCase())}>
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 blink-dot"
                style={{ display: "inline-block", background: "#00ff41", boxShadow: "0 0 6px #00ff41" }}
              />
              <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#00ff41" }}>
                ONLINE
              </span>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section id="hero" className="min-h-screen flex flex-col justify-center pt-14 relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-100" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(0,255,65,.04) 0%, transparent 70%)" }} />

          <div className="max-w-6xl mx-auto px-6 py-16 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left */}
              <div>
                <div className="mb-4" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "rgba(0,255,65,.45)", letterSpacing: ".2em" }}>
                  // HELLO WORLD &nbsp;·&nbsp; PLAYER ONE
                </div>

                <h1
                  className="mb-3 leading-none"
                  style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(64px,10vw,104px)", color: "#d4e8d4" }}
                >
                  ISHANVI<br />
                  <span className="glow-g" style={{ color: "#00ff41" }}>MOHAN</span>
                </h1>

                <div
                  className="mb-8 cursor-blink"
                  style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "11px", color: "#ff00ff", minHeight: "28px", letterSpacing: ".05em" }}
                >
                  {typed}
                </div>

                <p className="text-muted-foreground mb-10 leading-relaxed max-w-md" style={{ fontSize: "14px" }}>
                  BEng Computer Engineering (HKU) · Dean's Award · Upper Second Class Honours.
                  I build AI infrastructure, data pipelines, and full-stack systems that hold up under pressure.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className="px-btn" onClick={() => scrollTo("experience")}>
                    VIEW WORK
                  </button>
                  <button className="px-btn px-btn-mg" onClick={() => scrollTo("contact")}>
                    CONTACT ME
                  </button>
                </div>
              </div>

              {/* Right — photo */}
              <div className="flex justify-center items-center">
                <div className="relative">
                  <div
                    className="w-72 h-80 overflow-hidden relative"
                    style={{ border: "4px solid #00ff41", boxShadow: "8px 8px 0 #006b1a, 0 0 48px rgba(0,255,65,.25)", animation: "pixelPulse 3s ease-in-out infinite" }}
                  >
                    <img
                      src="/ishanvi.jpg"
                      alt="Ishanvi Mohan"
                      className="w-full h-full object-cover object-top"
                      style={{ filter: "saturate(.85) contrast(1.1)" }}
                    />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 65%, rgba(8,8,16,.6) 100%)" }} />
                  </div>

                  {/* Corner brackets */}
                  {["-top-3 -left-3 border-l-4 border-t-4", "-top-3 -right-3 border-r-4 border-t-4", "-bottom-3 -left-3 border-l-4 border-b-4", "-bottom-3 -right-3 border-r-4 border-b-4"].map((cls, i) => (
                    <div key={i} className={`absolute ${cls} w-6 h-6`} style={{ borderColor: "#00ffff" }} />
                  ))}

                  <div
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 px-4 py-1 whitespace-nowrap"
                    style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", background: "#080810", border: "2px solid #00ff41", color: "#00ff41" }}
                  >
                    LVL UP · ENGINEER
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee */}
          <div className="border-t border-b py-3 marquee-wrap" style={{ borderColor: "rgba(0,255,65,.18)" }}>
            <div className="marquee-track">
              {[0, 1].map((k) => (
                <div key={k} className="flex items-center gap-10 px-6">
                  {TECH_MARQUEE.map((t) => (
                    <span key={t} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "rgba(0,255,65,.35)", whiteSpace: "nowrap" }}>
                      ◆ {t}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <button
            className="absolute bottom-8 left-1/2 -translate-x-1/2 blink-dot"
            onClick={() => scrollTo("about")}
            style={{ color: "rgba(0,255,65,.5)", background: "none", border: "none", cursor: "pointer" }}
            aria-label="Scroll down"
          >
            <ChevronDown size={20} />
          </button>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#00ff41", letterSpacing: ".2em", marginBottom: "10px" }}>
                // 001 — ABOUT
              </div>
              <h2 className="leading-none" style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(44px,7vw,72px)", color: "#d4e8d4" }}>
                THE PLAYER
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-5">
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "14px" }}>
                  Computer Engineering graduate from HKU with a minor in Finance. Started with embedded systems and FPGA boards, then found my way into production AI infrastructure — scaling image/video generation systems that developers and creators actually rely on.
                </p>
                <p className="text-muted-foreground leading-relaxed" style={{ fontSize: "14px" }}>
                  Outside work: instrumental music, birdwatching, long-distance running, international affairs. I believe good engineering is invisible — it just works, reliably, at scale.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
                  {STATS.map((s) => (
                    <div key={s.label} className="p-4 text-center" style={{ border: "2px solid rgba(0,255,65,.25)", background: "rgba(0,255,65,.04)" }}>
                      <div className="glow-g leading-none mb-2" style={{ fontFamily: "'VT323', monospace", fontSize: "48px", color: "#00ff41" }}>
                        {s.value}
                      </div>
                      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px", color: "rgba(212,232,212,.4)" }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4" style={{ borderTop: "1px solid rgba(0,255,65,.15)" }}>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#00ff41", marginBottom: "16px", letterSpacing: ".1em" }}>
                    EDUCATION LOG
                  </div>
                  {[
                    { school: "UNIVERSITY OF HONG KONG", degree: "BEng Computer Engineering · Finance Minor", period: "2020 – 2024", note: "Dean's Award 2020–2022 · Upper Second Class Honours" },
                    { school: "SIMON FRASER UNIVERSITY", degree: "Study Abroad · Computer Engineering", period: "Jan – Apr 2023", note: "British Columbia, Canada" },
                    { school: "BRIGHTLANDS SCHOOL", degree: "High School · ICSE / ISC", period: "2009 – 2020", note: "ICSE 98.25% · ISC 99% · SAT Math II 790 / Physics 800 · National Merit Scholar" },
                  ].map((ed) => (
                    <div key={ed.school} className="mb-5 pl-4" style={{ borderLeft: "2px solid rgba(0,255,65,.3)" }}>
                      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "#00ff41", marginBottom: "4px" }}>{ed.school}</div>
                      <div style={{ fontSize: "13px", color: "#d4e8d4", marginBottom: "3px" }}>{ed.degree}</div>
                      <div style={{ fontSize: "12px", color: "rgba(212,232,212,.4)" }}>{ed.period} · {ed.note}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Character sheet */}
              <div className="p-6" style={{ border: "2px solid rgba(0,255,65,.25)", background: "rgba(0,255,65,.03)" }}>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#00ff41", marginBottom: "20px", letterSpacing: ".1em" }}>
                  CHARACTER STATS
                </div>
                {[
                  { name: "RELIABILITY", val: 97 },
                  { name: "PROBLEM SOLVING", val: 94 },
                  { name: "DATA INSTINCT", val: 91 },
                  { name: "SYSTEM DESIGN", val: 88 },
                  { name: "COFFEE INTAKE", val: 100 },
                ].map((a) => (
                  <div key={a.name} className="mb-5">
                    <div className="flex justify-between mb-1">
                      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px", color: "rgba(212,232,212,.55)" }}>{a.name}</span>
                      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px", color: "#00ff41" }}>{a.val}</span>
                    </div>
                    <div className="prog-bg">
                      <div className="prog-fill" style={{ width: `${a.val}%` }} />
                    </div>
                  </div>
                ))}

                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#00ff41", margin: "24px 0 14px", letterSpacing: ".1em" }}>
                  LANGUAGES
                </div>
                {[
                  { lang: "ENGLISH", level: "PROFICIENT" },
                  { lang: "HINDI", level: "PROFICIENT" },
                  { lang: "CANTONESE", level: "BEGINNER" },
                ].map((l) => (
                  <div key={l.lang} className="flex justify-between mb-3">
                    <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px", color: "rgba(212,232,212,.55)" }}>{l.lang}</span>
                    <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px", color: l.level === "PROFICIENT" ? "#00ff41" : "#ff00ff" }}>{l.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-24" style={{ background: "rgba(0,255,65,.025)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#00ff41", letterSpacing: ".2em", marginBottom: "10px" }}>
                // 002 — EXPERIENCE
              </div>
              <h2 className="leading-none" style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(44px,7vw,72px)", color: "#d4e8d4" }}>
                QUEST LOG
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-0" style={{ border: "2px solid rgba(0,255,65,.22)", background: "#0d0d1a" }}>
              {/* Tab list */}
              <div style={{ borderRight: "2px solid rgba(0,255,65,.22)" }}>
                {EXPERIENCE.map((exp, i) => (
                  <button
                    key={exp.company}
                    className={`exp-tab${activeExp === i ? " active" : ""}`}
                    onClick={() => setActiveExp(i)}
                  >
                    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: activeExp === i ? "#00ff41" : "rgba(0,255,65,.4)", marginBottom: "6px" }}>
                      {exp.company}
                    </div>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: activeExp === i ? "#d4e8d4" : "rgba(212,232,212,.4)" }}>
                      {exp.period}
                    </div>
                  </button>
                ))}
              </div>

              {/* Content pane */}
              <div className="lg:col-span-2 p-8">
                <div className="flex flex-wrap gap-2 items-start justify-between mb-1">
                  <div>
                    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: EXPERIENCE[activeExp].color, marginBottom: "6px" }}>
                      {EXPERIENCE[activeExp].title}
                    </div>
                    <div style={{ fontFamily: "'VT323', monospace", fontSize: "28px", color: "#d4e8d4", marginBottom: "4px" }}>
                      {EXPERIENCE[activeExp].company}
                    </div>
                  </div>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "rgba(212,232,212,.35)", textAlign: "right" }}>
                    <div>{EXPERIENCE[activeExp].period}</div>
                    <div style={{ marginTop: "4px" }}>{EXPERIENCE[activeExp].location}</div>
                  </div>
                </div>

                <div style={{ borderTop: "1px solid rgba(0,255,65,.15)", paddingTop: "20px", marginTop: "12px" }}>
                  {EXPERIENCE[activeExp].bullets.map((b, i) => (
                    <div key={i} className="flex gap-3 mb-4">
                      <span style={{ color: EXPERIENCE[activeExp].color, flexShrink: 0, fontFamily: "'Press Start 2P', monospace", fontSize: "8px", marginTop: "3px" }}>▶</span>
                      <p style={{ fontSize: "13px", color: "rgba(212,232,212,.7)", lineHeight: "1.7" }}>{b}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-6">
                  {EXPERIENCE[activeExp].tags.map((t) => (
                    <span key={t} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "rgba(212,232,212,.45)", border: "1px solid rgba(212,232,212,.15)", padding: "3px 7px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Leadership */}
            <div className="mt-10 p-6" style={{ border: "2px solid rgba(255,0,255,.2)", background: "rgba(255,0,255,.03)" }}>
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#ff00ff", marginBottom: "14px", letterSpacing: ".1em" }}>
                SIDE QUESTS — LEADERSHIP
              </div>
              <div className="flex flex-wrap gap-8">
                <div>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "#ff00ff", marginBottom: "4px" }}>VICE CHAIRPERSON · 2022–2023</div>
                  <div style={{ fontSize: "13px", color: "rgba(212,232,212,.65)" }}>Music Society, The University of Hong Kong</div>
                </div>
                <div>
                  <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "#ff00ff", marginBottom: "4px" }}>STUDENT RESEARCHER · 2022</div>
                  <div style={{ fontSize: "13px", color: "rgba(212,232,212,.65)" }}>Greenpeace Philippines · Renewable energy &amp; sustainability expansion</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#00ff41", letterSpacing: ".2em", marginBottom: "10px" }}>
                // 003 — SKILLS
              </div>
              <h2 className="leading-none" style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(44px,7vw,72px)", color: "#d4e8d4" }}>
                TECH TREE
              </h2>
            </div>

            <div className="flex flex-wrap mb-10" style={{ width: "fit-content" }}>
              {(Object.keys(SKILLS) as SkillCategory[]).map((tab, i) => (
                <button
                  key={tab}
                  onClick={() => setSkillTab(tab)}
                  style={{
                    fontFamily: "'Press Start 2P', monospace",
                    fontSize: "9px",
                    padding: "10px 18px",
                    border: "2px solid",
                    borderColor: skillTab === tab ? "#00ff41" : "rgba(0,255,65,.25)",
                    color: skillTab === tab ? "#00ff41" : "rgba(0,255,65,.38)",
                    background: skillTab === tab ? "rgba(0,255,65,.1)" : "transparent",
                    cursor: "pointer",
                    transition: "all .15s",
                    marginRight: i < Object.keys(SKILLS).length - 1 ? "-2px" : "0",
                    position: "relative",
                    zIndex: skillTab === tab ? 1 : 0,
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                {SKILLS[skillTab].map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between mb-2">
                      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#d4e8d4" }}>{s.name}</span>
                      <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#00ff41" }}>{s.pct}%</span>
                    </div>
                    <div className="prog-bg">
                      <div className="prog-fill" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#00ff41", marginBottom: "16px", letterSpacing: ".1em" }}>
                  FULL INVENTORY
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "PYTHON", "SQL", "C++", "JAVA", "JAVASCRIPT", "TYPESCRIPT",
                    "NODE.JS", "NEST.JS", "FASTAPI", "REDIS", "AWS", "RUNPOD",
                    "APACHE KAFKA", "POWER BI", "MATLAB", "FPGA", "LINUX",
                    "ARDUINO", "GITHUB", "MS OFFICE", "EXCEL",
                  ].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "'Press Start 2P', monospace",
                        fontSize: "7px",
                        color: "rgba(212,232,212,.5)",
                        border: "1px solid rgba(0,255,65,.2)",
                        padding: "4px 8px",
                        background: "rgba(0,255,65,.03)",
                        transition: "all .15s",
                        cursor: "default",
                      }}
                      onMouseEnter={e => {
                        const el = e.target as HTMLElement;
                        el.style.color = "#00ff41";
                        el.style.borderColor = "#00ff41";
                        el.style.background = "rgba(0,255,65,.08)";
                      }}
                      onMouseLeave={e => {
                        const el = e.target as HTMLElement;
                        el.style.color = "rgba(212,232,212,.5)";
                        el.style.borderColor = "rgba(0,255,65,.2)";
                        el.style.background = "rgba(0,255,65,.03)";
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "#ff00ff", margin: "24px 0 12px", letterSpacing: ".1em" }}>
                  INTERESTS
                </div>
                <div className="flex flex-wrap gap-2">
                  {["INSTRUMENTAL MUSIC", "BIRDWATCHING", "LONG-DISTANCE RUNNING", "INTERNATIONAL AFFAIRS", "HORSE RIDING"].map((t) => (
                    <span key={t} style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "6px", color: "rgba(255,0,255,.5)", border: "1px solid rgba(255,0,255,.2)", padding: "4px 8px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-24" style={{ background: "rgba(0,255,65,.025)" }}>
          <div className="max-w-6xl mx-auto px-6">
            <div className="mb-12">
              <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "9px", color: "#00ff41", letterSpacing: ".2em", marginBottom: "10px" }}>
                // 004 — CONTACT
              </div>
              <h2 className="leading-none" style={{ fontFamily: "'VT323', monospace", fontSize: "clamp(44px,7vw,72px)", color: "#d4e8d4" }}>
                SEND A MESSAGE
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <p className="text-muted-foreground mb-8 leading-relaxed" style={{ fontSize: "14px" }}>
                  Open to interesting roles in AI engineering, software development, and data. Got a project or opportunity? Let's talk. I typically reply within 24 hours.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: <Mail size={14} />, label: "EMAIL", value: "ishanvimohan@gmail.com", href: "mailto:ishanvimohan@gmail.com" },
                    { icon: <Linkedin size={14} />, label: "LINKEDIN", value: "linkedin.com/in/ishanvimohan", href: "https://linkedin.com/in/ishanvimohan" },
                    { icon: <Github size={14} />, label: "GITHUB", value: "github.com/ishanvimohan", href: "https://github.com/ishanvimohan" },
                    { icon: <MapPin size={14} />, label: "LOCATION", value: "HONG KONG SAR", href: null },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div style={{ color: "#00ff41" }}>{item.icon}</div>
                      <div>
                        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "rgba(0,255,65,.45)", marginBottom: "3px" }}>
                          {item.label}
                        </div>
                        {item.href ? (
                          <a
                            href={item.href}
                            style={{ fontSize: "13px", color: "#d4e8d4", textDecoration: "none", transition: "color .2s" }}
                            onMouseEnter={e => (e.target as HTMLElement).style.color = "#00ff41"}
                            onMouseLeave={e => (e.target as HTMLElement).style.color = "#d4e8d4"}
                          >{item.value}</a>
                        ) : (
                          <div style={{ fontSize: "13px", color: "#d4e8d4" }}>{item.value}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terminal form */}
              <div style={{ border: "2px solid rgba(0,255,65,.3)", background: "#0a0a14", overflow: "hidden" }}>
                <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: "rgba(0,255,65,.18)", background: "rgba(0,255,65,.05)" }}>
                  {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
                    <div key={c} style={{ width: "11px", height: "11px", background: c }} />
                  ))}
                  <span style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "rgba(0,255,65,.4)", marginLeft: "8px" }}>
                    CONTACT.EXE
                  </span>
                </div>

                {sent ? (
                  <div className="p-10 text-center">
                    <div className="glow-g mb-2" style={{ fontFamily: "'VT323', monospace", fontSize: "72px", color: "#00ff41", lineHeight: "1" }}>✓</div>
                    <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "10px", color: "#00ff41", marginBottom: "8px" }}>MESSAGE SENT!</div>
                    <div style={{ fontSize: "13px", color: "rgba(212,232,212,.5)" }}>I'll get back to you soon.</div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {[
                      { field: "name" as const, label: "YOUR NAME", type: "text", placeholder: "Ada Lovelace" },
                      { field: "email" as const, label: "YOUR EMAIL", type: "email", placeholder: "ada@lovelace.dev" },
                    ].map(({ field, label, type, placeholder }) => (
                      <div key={field}>
                        <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "rgba(0,255,65,.55)", marginBottom: "6px" }}>
                          &gt; {label}
                        </div>
                        <input
                          type={type}
                          required
                          placeholder={placeholder}
                          value={form[field]}
                          onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                          className="px-input"
                        />
                      </div>
                    ))}
                    <div>
                      <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "7px", color: "rgba(0,255,65,.55)", marginBottom: "6px" }}>
                        &gt; YOUR MESSAGE
                      </div>
                      <textarea
                        required
                        rows={4}
                        placeholder="What are you building?"
                        value={form.message}
                        onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                        className="px-input"
                        style={{ resize: "none" }}
                      />
                    </div>
                    <button type="submit" className="px-btn" style={{ width: "100%" }}>
                      TRANSMIT MESSAGE
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="py-8 border-t" style={{ borderColor: "rgba(0,255,65,.18)" }}>
          <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "rgba(0,255,65,.35)" }}>
              © 2025 ISHANVI MOHAN · ALL RIGHTS RESERVED
            </div>
            <div className="flex items-center gap-2" style={{ fontFamily: "'Press Start 2P', monospace", fontSize: "8px", color: "rgba(212,232,212,.2)" }}>
              MADE WITH&nbsp;<span style={{ color: "#ff00ff" }}>♥</span>&nbsp;AND COFFEE
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}
