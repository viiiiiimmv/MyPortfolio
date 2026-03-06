import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);
  const chars = "!<>-_\\/[]{}—=+*^?#";

  useEffect(() => {
    const loop = () => {
      setTimeout(() => {
        setGlitch(true);
        setTimeout(() => setGlitch(false), 260);
        loop();
      }, Math.random() * 9000 + 5000);
    };
    loop();
  }, []);

  return (
      <span style={{ position: "relative", display: "inline-block" }}>
      {glitch
          ? text.split("").map((c) =>
              Math.random() > 0.55 ? chars[Math.floor(Math.random() * chars.length)] : c
          ).join("")
          : text}
        {glitch && (
            <span style={{
              position: "absolute", inset: 0,
              clipPath: "polygon(0 38%, 100% 38%, 100% 60%, 0 60%)",
              transform: "translateX(-5px)", opacity: 0.45,
            }}>{text}</span>
        )}
    </span>
  );
}

function ScanLine() {
  return (
      <Motion.div
          style={{
            position: "absolute", left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
            pointerEvents: "none", zIndex: 3,
          }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
      />
  );
}

function MarqueeRow({ words, speed = 25, reverse = false, dim = false }) {
  const content = [...words, ...words, ...words, ...words];
  return (
      <div style={{ overflow: "hidden" }}>
        <Motion.div
            style={{ display: "flex", gap: "clamp(20px, 3vw, 52px)", whiteSpace: "nowrap" }}
            animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
            transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        >
          {content.map((w, i) => (
              <span key={i} style={{
                fontSize: "clamp(10px, 1vw, 12px)",
                letterSpacing: "0.32em",
                textTransform: "uppercase",
                color: dim ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.2)",
                fontFamily: "'Courier New', monospace",
                userSelect: "none",
              }}>{w}</span>
          ))}
        </Motion.div>
      </div>
  );
}

function StatementLine({ number, word, detail, delay = 0 }) {
  const [hovered, setHovered] = useState(false);

  return (
      <Motion.div
          initial={{ opacity: 0, y: 55 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
          style={{
            position: "relative",
            borderTop: "1px solid rgba(255,255,255,0.09)",
            padding: "clamp(10px, 2vh, 24px) 0",
            cursor: "default",
            display: "flex",
            alignItems: "baseline",
            gap: "clamp(12px, 2vw, 32px)",
          }}
      >
        {/* Index */}
        <span style={{
          fontSize: "clamp(9px, 0.9vw, 11px)",
          letterSpacing: "0.3em",
          color: "rgba(255,255,255,0.18)",
          fontFamily: "'Courier New', monospace",
          flexShrink: 0,
          alignSelf: "flex-start",
          paddingTop: "0.5em",
          minWidth: "clamp(22px, 3vw, 40px)",
        }}>{number}</span>

        {/* The massive word */}
        <Motion.span
            animate={{ color: hovered ? "#ffffff" : "rgba(255,255,255,0.82)" }}
            transition={{ duration: 0.2 }}
            style={{
              fontSize: "clamp(56px, 11.5vw, 160px)",
              fontWeight: 900,
              letterSpacing: "-0.045em",
              lineHeight: 0.87,
              flex: 1,
              fontFamily: "'Courier New', monospace",
              display: "block",
              userSelect: "none",
            }}
        >
          {hovered ? <GlitchText text={word} /> : word}
        </Motion.span>

        {/* Hover detail — fades in top-right */}
        <Motion.span
            animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
            transition={{ duration: 0.22 }}
            style={{
              fontSize: "clamp(9px, 0.85vw, 11px)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
              fontFamily: "'Courier New', monospace",
              flexShrink: 0,
              alignSelf: "flex-start",
              paddingTop: "0.5em",
              textAlign: "right",
              lineHeight: 1.6,
              maxWidth: "clamp(80px, 12vw, 160px)",
            }}
        >{detail}</Motion.span>

        {/* Bottom reveal line */}
        <Motion.div
            animate={{ scaleX: hovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: "1px", background: "rgba(255,255,255,0.55)",
              transformOrigin: "left", pointerEvents: "none",
            }}
        />
      </Motion.div>
  );
}

const STATEMENTS = [
  { number: "01", word: "BUILDER.",   detail: "react · node · full-stack" },
  { number: "02", word: "SHIPPER.",   detail: "fast deploys · clean apis" },
  { number: "03", word: "THINKER.",   detail: "product judgment · ux depth" },
  { number: "04", word: "OPERATOR.", detail: "idea → dependable release" },
];

const TICKER = [
  "React", "✦", "Node.js", "✦", "Full-Stack", "✦", "Product Engineering",
  "✦", "Shiv Chauhan", "✦", "Clean Architecture", "✦", "Open to Work", "✦",
];

export default function Terminal() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["5%", "-5%"]);

  return (
      <section
          id="about"
          ref={sectionRef}
          style={{ position: "relative", background: "#000", color: "#fff", overflow: "hidden", minHeight: "100vh" }}
      >
        <ScanLine />

        {/* Noise texture */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.025, pointerEvents: "none", zIndex: 0 }}>
          <filter id="n">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#n)" />
        </svg>

        {/* Ghost BG word */}
        <Motion.div style={{
          position: "absolute", top: "50%", left: "50%",
          translateX: "-50%", translateY: "-50%",
          y: bgY,
          fontSize: "clamp(180px, 32vw, 480px)",
          fontWeight: 900,
          letterSpacing: "-0.06em",
          lineHeight: 1,
          color: "transparent",
          WebkitTextStroke: "1px rgba(255,255,255,0.028)",
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
          fontFamily: "'Courier New', monospace",
          zIndex: 0,
        }}>
          ABOUT
        </Motion.div>

        <div style={{
          position: "relative", zIndex: 10,
          maxWidth: "1340px", margin: "0 auto",
          padding: "clamp(60px, 10vh, 130px) clamp(20px, 5vw, 72px)",
          display: "flex", flexDirection: "column",
          gap: "clamp(36px, 5vh, 64px)",
        }}>

          {/* Top bar */}
          <Motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Motion.div
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }}
                  animate={{ opacity: [1, 0.1, 1] }}
                  transition={{ duration: 1.3, repeat: Infinity }}
              />
              <span style={{ fontSize: 10, letterSpacing: "0.35em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>
              SYS://ABOUT — ACTIVE
            </span>
            </div>
            <span style={{ fontSize: 10, letterSpacing: "0.25em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>
            Shiv Chauhan · Portfolio
          </span>
          </Motion.div>

          {/* Intro line */}
          <Motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              style={{
                fontSize: "clamp(13px, 1.4vw, 16px)",
                color: "rgba(255,255,255,0.38)",
                letterSpacing: "0.06em",
                fontFamily: "'Courier New', monospace",
                maxWidth: 520,
                lineHeight: 1.75,
                margin: 0,
              }}
          >
            Product-focused full-stack engineer. I take ideas from zero to{" "}
            <span style={{ color: "rgba(255,255,255,0.82)", fontWeight: 700 }}>dependable release</span>
            {" "}— fast interfaces, resilient APIs, UX that feels deliberate.
          </Motion.p>

          {/* Statement lines */}
          <div>
            {STATEMENTS.map((s, i) => (
                <StatementLine key={s.word} {...s} delay={i * 0.06} />
            ))}
            <Motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                style={{ borderTop: "1px solid rgba(255,255,255,0.09)", transformOrigin: "left" }}
            />
          </div>

          {/* Ticker */}
          <Motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            <MarqueeRow words={TICKER} speed={30} />
            <MarqueeRow words={TICKER} speed={22} reverse dim />
          </Motion.div>

        </div>
      </section>
  );
}
