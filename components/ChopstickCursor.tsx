"use client";
import { useEffect, useState, useRef } from "react";

export default function ChopstickCursor() {
  const [pos, setPos]         = useState({ x: -300, y: -300 });
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only run on pointer devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setPos({ x: e.clientX, y: e.clientY });
        const el = document.elementFromPoint(e.clientX, e.clientY);
        setHovered(
          !!el?.closest('a, button, [role="button"], input, select, textarea, label, [tabindex]')
        );
      });
    };

    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);

    // Inject a style that hides the native cursor globally
    const style = document.createElement("style");
    style.id = "chopstick-hide-cursor";
    style.textContent = `html, * { cursor: none !important; }`;
    document.head.appendChild(style);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      document.getElementById("chopstick-hide-cursor")?.remove();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Rotation angles:
  //   default  → 0°
  //   hover    → sticks open (tips spread apart)
  //   clicking → sticks clamp together
  const frontRot = clicking ? 5  : hovered ? -8  : 0;
  const backRot  = clicking ? -5 : hovered ?  8  : 0;

  // The front stick tip sits at approx (8, 44) in the 52×48 viewBox.
  // Offset the whole element so the tip aligns with the mouse hotspot.
  const OFFSET_X = -8;
  const OFFSET_Y = -44;

  return (
    <div
      style={{
        position:      "fixed",
        left:          pos.x,
        top:           pos.y,
        transform:     `translate(${OFFSET_X}px, ${OFFSET_Y}px)`,
        pointerEvents: "none",
        zIndex:        99999,
        willChange:    "left, top",
      }}
    >
      <svg
        width="52"
        height="48"
        viewBox="0 0 52 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 1px 4px rgba(0,0,0,0.45))", overflow: "visible" }}
      >
        <defs>
          {/* Wood grain gradient — front stick */}
          <linearGradient id="wood-front" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#E8954A" />
            <stop offset="45%"  stopColor="#C4712A" />
            <stop offset="100%" stopColor="#9B540F" />
          </linearGradient>
          {/* Wood grain gradient — back stick */}
          <linearGradient id="wood-back" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#A0602A" />
            <stop offset="50%"  stopColor="#7A3B10" />
            <stop offset="100%" stopColor="#5A2A08" />
          </linearGradient>
        </defs>

        {/* Back chopstick */}
        <g
          style={{
            transformOrigin: "38px 3px",
            transform:       `rotate(${backRot}deg)`,
            transition:      "transform 0.22s cubic-bezier(0.34,1.3,0.64,1)",
          }}
        >
          <line x1="16" y1="45" x2="38" y2="3" stroke="url(#wood-back)" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Front chopstick */}
        <g
          style={{
            transformOrigin: "26px 3px",
            transform:       `rotate(${frontRot}deg)`,
            transition:      "transform 0.22s cubic-bezier(0.34,1.3,0.64,1)",
          }}
        >
          <line x1="8" y1="45" x2="26" y2="3" stroke="url(#wood-front)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="8" cy="45" r="1.5" fill="#C4712A" />
        </g>
      </svg>
    </div>
  );
}
