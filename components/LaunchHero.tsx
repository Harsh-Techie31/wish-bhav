"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function LaunchHero() {
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="launch"
      ref={heroRef}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: "var(--jade)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Background image — Veg Pad Thai */}
      <div style={{
        position: "absolute",
        inset: 0,
        opacity: loaded ? 0.55 : 0,
        transition: "opacity 1.2s ease",
      }}>
        <Image
          src="/images/products/veg-pad-thai.png"
          alt="Veg Pad Thai Noodles — hero image"
          fill
          style={{ objectFit: "cover", objectPosition: "center 40%" }}
          priority
          onLoad={() => setLoaded(true)}
          quality={90}
        />
      </div>

      {/* Gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(105deg, rgba(28,74,71,0.92) 0%, rgba(28,74,71,0.7) 50%, rgba(28,74,71,0.3) 100%)",
      }} />

      {/* Noise texture */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
        opacity: 0.4,
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 2,
        maxWidth: 1280,
        margin: "0 auto",
        padding: "120px 32px 80px",
        width: "100%",
      }}>
        {/* Campaign label */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          background: "var(--swish-green)",
          color: "#fff",
          padding: "5px 12px",
          borderRadius: 20,
          fontWeight: 700,
          fontSize: 10,
          letterSpacing: "2.5px",
          marginBottom: 36,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(12px)",
          transition: "all 0.6s ease 0.2s",
        }}>
          <span>✦</span>
          SWISH PRESENTS A NEW CATEGORY
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: "var(--font-body)",
          fontWeight: 900,
          fontSize: "clamp(52px, 8vw, 112px)",
          lineHeight: 0.95,
          color: "#fff",
          letterSpacing: "-2px",
          maxWidth: 800,
          marginBottom: 24,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(24px)",
          transition: "all 0.8s ease 0.3s",
        }}>
          ASIAN,<br />
          <span style={{ color: "var(--swish-green)" }}>IN 10.</span>
        </h1>

        {/* Sub-headline */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontWeight: 500,
          fontSize: "clamp(18px, 2.5vw, 28px)",
          color: "rgba(255,255,255,0.75)",
          maxWidth: 540,
          lineHeight: 1.4,
          letterSpacing: "-0.3px",
          marginBottom: 20,
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(16px)",
          transition: "all 0.7s ease 0.4s",
          fontStyle: "italic",
        }}>
          "A little Bangkok.<br />A lot of craving."
        </p>

        <p style={{
          fontFamily: "var(--font-body)",
          fontWeight: 400,
          fontSize: 16,
          color: "rgba(255,255,255,0.6)",
          marginBottom: 48,
          letterSpacing: "0.2px",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(12px)",
          transition: "all 0.7s ease 0.5s",
        }}>
          Five new favourites. One irresistible category.
        </p>

        {/* CTAs */}
        <div style={{
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(12px)",
          transition: "all 0.7s ease 0.6s",
        }}>
          <a
            href="#menu"
            onClick={e => { e.preventDefault(); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--swish-green)",
              color: "#fff",
              textDecoration: "none",
              padding: "16px 32px",
              borderRadius: 12,
              fontFamily: "var(--font-body)",
              fontWeight: 800,
              fontSize: 14,
              letterSpacing: "1px",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--swish-green-dark)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "var(--swish-green)"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
          >
            EXPLORE THE MENU
          </a>
          <a
            href="#app"
            onClick={e => { e.preventDefault(); document.getElementById("app")?.scrollIntoView({ behavior: "smooth" }); }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              textDecoration: "none",
              padding: "16px 32px",
              borderRadius: 12,
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "1px",
              border: "1.5px solid rgba(255,255,255,0.3)",
              backdropFilter: "blur(8px)",
              transition: "all 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.2)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
          >
            EXPERIENCE IT IN SWISH
          </a>
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex",
          gap: 48,
          marginTop: 80,
          paddingTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.15)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease 0.8s",
        }}>
          {[
            { n: "5", label: "New SKUs" },
            { n: "2", label: "Final hero images" },
            { n: "3+", label: "AI iterations per dish" },
            { n: "10", label: "Minutes to your door" },
          ].map(stat => (
            <div key={stat.label}>
              <div style={{ fontWeight: 800, fontSize: 32, color: "var(--swish-green)", lineHeight: 1 }}>{stat.n}</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500, marginTop: 4, letterSpacing: "0.5px" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute",
        bottom: 32,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity: loaded ? 0.6 : 0,
        transition: "opacity 0.8s ease 1s",
        animation: "bounce 2s infinite",
      }}>
        <span style={{ fontSize: 11, letterSpacing: "2px", color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>SCROLL</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 4L10 16M10 16L5 11M10 16L15 11" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>
    </section>
  );
}
