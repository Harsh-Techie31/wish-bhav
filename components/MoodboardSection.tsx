"use client";
import { useState, useEffect, useRef } from "react";

export default function MoodboardSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="look"
      ref={ref}
      style={{
        background: "var(--jade)",
        padding: "100px 32px",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          marginBottom: 60,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "3px", color: "var(--swish-green)", marginBottom: 16 }}>
            02 — THE LOOK
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <h2 style={{
              fontFamily: "var(--font-body)",
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 64px)",
              lineHeight: 1,
              letterSpacing: "-1.5px",
            }}>
              VISUAL<br />DIRECTION.
            </h2>
          </div>
        </div>

        {/* Moodboard image — always visible */}
        <div style={{
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
          marginBottom: 36,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.1s",
        }}>
          <img
            src="/images/moodboard-2.webp"
            alt="Swish Asian Category Moodboard"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>

      </div>


    </section>
  );
}
