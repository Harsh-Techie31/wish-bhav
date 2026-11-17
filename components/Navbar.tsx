"use client";
import { useState, useEffect } from "react";

const sections = [
  { id: "launch", label: "THE LAUNCH" },
  { id: "look", label: "THE LOOK" },
  { id: "menu", label: "THE MENU" },
  { id: "app", label: "THE APP" },
  { id: "process", label: "THE PROCESS" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("launch");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
      const sectionEls = sections.map(s => document.getElementById(s.id));
      const scrollPos = window.scrollY + 120;
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const el = sectionEls[i];
        if (el && el.offsetTop <= scrollPos) {
          setActive(sections[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "all 0.3s ease",
        background: scrolled ? "rgba(255,255,255,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #E5E0D8" : "none",
        padding: scrolled ? "12px 32px" : "20px 32px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        {/* Logo */}
        <button
          onClick={() => scrollTo("launch")}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/swish-logo.png"
            alt="Swish — 10-minute food delivery"
            style={{
              height: 30,
              width: "auto",
              filter: scrolled ? "none" : "brightness(0) invert(1)",
              transition: "filter 0.3s ease",
            }}
          />
        </button>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="hidden-mobile">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "1.5px",
                color: active === s.id
                  ? "var(--swish-green)"
                  : scrolled ? "#1A1A1A" : "rgba(255,255,255,0.85)",
                transition: "color 0.2s",
                padding: "4px 0",
                borderBottom: active === s.id ? "2px solid var(--swish-green)" : "2px solid transparent",
              }}
            >
              {s.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("menu")}
            style={{
              background: "var(--swish-green)",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "8px 18px",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "1px",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.1s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--swish-green-dark)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--swish-green)")}
          >
            EXPLORE ASIAN →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="show-mobile"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: scrolled ? "#1A1A1A" : "#fff" }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: "#fff",
          padding: "16px 32px 24px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          borderTop: "1px solid #E5E0D8",
        }}>
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "1px",
                color: active === s.id ? "var(--swish-green)" : "#1A1A1A",
                padding: "10px 0",
                borderBottom: "1px solid #E5E0D8",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } .show-mobile { display: block; } }
      `}</style>
    </nav>
  );
}
