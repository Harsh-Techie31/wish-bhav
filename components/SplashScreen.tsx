"use client";
import { useEffect, useState } from "react";

export default function SplashScreen() {
  // phase 0: green, nothing shown
  // phase 1: logo + text visible
  // phase 2: wordmark + text fade out, star zooms toward us + bg goes white
  // phase 3: pure white hold
  // phase 4: fade out revealing site
  // phase 5: done
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 350),   // logo pops in
      setTimeout(() => setPhase(2), 2100),  // logo fades, star zooms
      setTimeout(() => setPhase(3), 2950),  // white hold
      setTimeout(() => setPhase(4), 3200),  // fade out
      setTimeout(() => setPhase(5), 3900),  // done
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  if (phase === 5) return null;

  const showAll   = phase === 1;
  const isZooming = phase >= 2;
  const isWhiteBg = phase >= 2;
  const isFading  = phase >= 4;

  return (
    <>
      <style>{`
        @keyframes starPop {
          0%   { opacity: 0; transform: scale(0.6); }
          65%  { opacity: 1; transform: scale(1.08); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes logoPop {
          0%   { opacity: 0; transform: scale(0.7); }
          65%  { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes starZoom {
          0%   { transform: scale(1); }
          100% { transform: scale(90); }
        }
      `}</style>

      <div
        data-phase={phase}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          overflow: "hidden",
          opacity: isFading ? 0 : 1,
          transitionProperty: isFading ? "opacity" : "none",
          transitionDuration: "0.7s",
          transitionTimingFunction: "ease",
          pointerEvents: isFading ? "none" : "all",
        }}
      >
        {/* Background: green → white as star zooms */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: isWhiteBg ? "#ffffff" : "#33C362",
            transitionProperty: isWhiteBg ? "background" : "none",
            transitionDuration: "0.9s",
            transitionTimingFunction: "ease-in",
          }}
        />

        {/* ── LOGO IMAGE (phase 1) ── actual Swish logo, white-filtered, centered */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 3,
            opacity: isZooming ? 0 : phase === 0 ? 0 : 1,
            transitionProperty: "opacity",
            transitionDuration: isZooming ? "0.3s" : "0s",
            transitionTimingFunction: "ease",
            pointerEvents: "none",
          }}
        >
          <div style={{ animation: phase >= 1 ? "logoPop 0.5s cubic-bezier(0.34,1.3,0.64,1) forwards" : "none" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/swish-logo.png"
              alt="Swish"
              style={{ height: 68, width: "auto", filter: "brightness(0) invert(1)", display: "block" }}
            />
          </div>
        </div>

        {/* ── STAR ZOOM (phase 2+) ── standalone at exact viewport center for clean zoom */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 4,
            opacity: isZooming ? 1 : 0,
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              transformOrigin: "center center",
              animation: isZooming
                ? "starZoom 0.7s cubic-bezier(0.4,0,1,0.55) forwards"
                : "none",
            }}
          >
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26 1C26 1 28.5 17 36 26C28.5 35 26 51 26 51C26 51 23.5 35 16 26C23.5 17 26 1 26 1Z" fill="white"/>
              <path d="M1 26C1 26 17 23.5 26 16C35 23.5 51 26 51 26C51 26 35 28.5 26 36C17 28.5 1 26 1 26Z" fill="white"/>
            </svg>
          </div>
        </div>

        {/* ── BOTTOM TEXT ── "Made Fresh / Delivered Fast" */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 0,
            right: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            zIndex: 3,
            opacity: showAll ? 1 : 0,
            transform: showAll ? "translateY(0)" : "translateY(12px)",
            transitionProperty: "opacity, transform",
            transitionDuration: "0.4s",
            transitionDelay: showAll ? "0.35s" : "0s",
            transitionTimingFunction: "ease",
            pointerEvents: "none",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginBottom: 4 }}>
            <path d="M9 1.5C9 1.5 3 4.5 3 10C3 13.3137 5.68629 16 9 16C12.3137 16 15 13.3137 15 10C15 4.5 9 1.5 9 1.5Z" fill="rgba(255,255,255,0.6)"/>
            <path d="M9 16V10M9 10C9 10 7 8.5 5.5 7" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.75)", letterSpacing: "0.3px" }}>Made Fresh</span>
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: 13, color: "rgba(255,255,255,0.75)", letterSpacing: "0.3px" }}>Delivered Fast</span>
        </div>
      </div>
    </>
  );
}
