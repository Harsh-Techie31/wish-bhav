"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function CategoryIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="category-intro"
      ref={ref}
      style={{
        background: "var(--warm-white)",
        padding: "100px 32px",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 80,
          alignItems: "center",
        }}>
          {/* Left — text */}
          <div>
            <div style={{
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "3px",
              color: "var(--swish-green)",
              marginBottom: 20,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(12px)",
              transition: "all 0.6s ease",
            }}>
              CATEGORY LAUNCH · NOV 2026
            </div>

            <h2 style={{
              fontFamily: "var(--font-body)",
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1.05,
              letterSpacing: "-1.5px",
              color: "var(--jade)",
              marginBottom: 28,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "all 0.6s ease 0.1s",
            }}>
              YOUR NEXT<br />
              CRAVING HAS<br />
              ARRIVED.
            </h2>

            <p style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "var(--muted-text)",
              maxWidth: 480,
              marginBottom: 32,
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(16px)",
              transition: "all 0.6s ease 0.2s",
            }}>
              Swish&apos;s Asian category brings five new dishes to the app — four individual favourites and one generous combo.
            </p>

            <div style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(12px)",
              transition: "all 0.6s ease 0.3s",
            }}>
              <p style={{
                fontSize: 13,
                fontWeight: 600,
                color: "var(--jade)",
                marginBottom: 16,
                letterSpacing: "0.5px",
              }}>
                THE FIVE NEW DISHES:
              </p>
              {[
                { name: "Veg Pad Thai Noodles", veg: true },
                { name: "Chicken Pad Thai Noodles", veg: false },
                { name: "Veg Green Thai Curry + Jasmine Rice", veg: true },
                { name: "Chicken Green Thai Curry + Jasmine Rice", veg: false },
                { name: "Combo — Veg Pad Thai + Veg Green Thai Curry", veg: true },
              ].map(item => (
                <div key={item.name} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 0",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <span className={item.veg ? "veg-dot" : "nonveg-dot"} />
                  <span style={{ fontSize: 14, fontWeight: 500, color: "var(--dark-text)" }}>{item.name}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Right — fanned image deck */}
          <div style={{
            position: "relative",
            height: 600,
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateX(24px)",
            transition: "all 0.8s ease 0.2s",
          }}>
            {[
              { src: "/images/products/veg-pad-thai.webp",             label: "Veg Pad Thai",             veg: true,  rotation: -22, zIndex: 1 },
              { src: "/images/products/chicken-pad-thai.webp",         label: "Chicken Pad Thai",         veg: false, rotation: -11, zIndex: 2 },
              { src: "/images/products/veg-green-thai-curry-v2.webp",  label: "Veg Green Thai Curry",     veg: true,  rotation: 0,   zIndex: 3 },
              { src: "/images/products/chicken-green-thai-curry.webp", label: "Chicken Green Thai Curry", veg: false, rotation: 11,  zIndex: 4 },
              { src: "/images/products/veg-combo-v2.webp",             label: "Veg Combo",                veg: true,  rotation: 22,  zIndex: 5 },
            ].map(card => (
              <div
                key={card.src}
                style={{
                  position: "absolute",
                  bottom: 70,
                  left: "50%",
                  width: 268,
                  height: 348,
                  transform: `translateX(-50%) rotate(${card.rotation}deg)`,
                  transformOrigin: "50% 112%",
                  background: "#fff",
                  borderRadius: 28,
                  padding: 10,
                  boxShadow: card.zIndex === 5
                    ? "0 20px 56px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)"
                    : "0 8px 32px rgba(0,0,0,0.11), 0 2px 8px rgba(0,0,0,0.06)",
                  zIndex: card.zIndex,
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: 20, overflow: "hidden" }}>
                  <Image
                    src={card.src}
                    alt={card.label}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center 30%" }}
                    sizes="290px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #category-intro > div > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
