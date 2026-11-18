"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { products } from "@/lib/products";

export default function FinalDeliverables() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const deliverables = [
    { filename: "SWISH_ASIAN_VegPadThai_1x1.webp", status: "ready", size: "2000×2000px", src: "/images/products/veg-pad-thai.webp", sku: products[0] },
    { filename: "SWISH_ASIAN_ChickenPadThai_1x1.webp", status: "ready", size: "2000×2000px", src: "/images/products/chicken-pad-thai.webp", sku: products[1] },
    { filename: "SWISH_ASIAN_VegGreenThaiCurry_1x1.webp", status: "ready", size: "2000×2000px", src: "/images/products/veg-green-thai-curry-v2.webp", sku: products[2] },
    { filename: "SWISH_ASIAN_ChickenGreenThaiCurry_1x1.webp", status: "ready", size: "2000×2000px", src: "/images/products/chicken-green-thai-curry.webp", sku: products[3] },
    { filename: "SWISH_ASIAN_VegCombo_1x1.webp", status: "ready", size: "2000×2000px", src: "/images/products/veg-combo.webp", sku: products[4] },
  ];

  const statusColors: Record<string, string> = {
    ready: "#33C362",
    iteration: "#F59E0B",
    pending: "#9B9690",
  };
  const statusLabels: Record<string, string> = {
    ready: "FINAL HERO READY",
    iteration: "BEST ITERATION",
    pending: "IN PRODUCTION",
  };

  return (
    <section
      id="deliverables"
      ref={ref}
      style={{ background: "var(--jade)", padding: "100px 32px", color: "#fff" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          marginBottom: 64,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "3px", color: "var(--swish-green)", marginBottom: 16 }}>
            07 — FINAL DELIVERABLES
          </div>
          <h2 style={{
            fontFamily: "var(--font-body)",
            fontWeight: 900,
            fontSize: "clamp(32px, 5vw, 60px)",
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            color: "#fff",
          }}>
            READY FOR<br />
            <span style={{ color: "var(--swish-green)" }}>THE MENU.</span>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", maxWidth: 540, lineHeight: 1.6, marginTop: 20 }}>
            All deliverables follow the naming convention <code style={{ fontFamily: "monospace", background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 4 }}>SWISH_ASIAN_&lt;SKU&gt;_1x1.jpg</code>. Final images at 2000×2000px. Download only where actual file is available.
          </p>
        </div>

        {/* Deliverables grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 20,
          marginBottom: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(24px)",
          transition: "all 0.6s ease 0.2s",
        }}>
          {deliverables.map((d, i) => (
            <div
              key={d.filename}
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: 16,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "translateY(-4px)")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "none")}
            >
              {/* Image */}
              <div style={{ position: "relative", paddingTop: "100%", background: "rgba(255,255,255,0.05)" }}>
                {d.src ? (
                  <Image src={d.src} alt={d.filename} fill style={{ objectFit: "cover" }} sizes="260px" />
                ) : (
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
                    <span style={{ fontSize: 36, opacity: 0.3 }}>🍜</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 700, letterSpacing: "1px" }}>IN PRODUCTION</span>
                  </div>
                )}

                {/* Status badge */}
                <div style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: statusColors[d.status],
                  color: "#fff",
                  fontSize: 9,
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: 20,
                  letterSpacing: "0.5px",
                }}>
                  {statusLabels[d.status]}
                </div>

                {/* Veg/nonveg */}
                <div style={{ position: "absolute", top: 10, right: 10 }}>
                  <span className={d.sku.category === "veg" ? "veg-dot" : "nonveg-dot"} />
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "14px 16px" }}>
                <div style={{ fontFamily: "monospace", fontSize: 10, color: "rgba(255,255,255,0.5)", marginBottom: 6, wordBreak: "break-all" }}>{d.filename}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{d.sku.shortName}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 12 }}>{d.size}</div>

                {d.status === "ready" || d.status === "iteration" ? (
                  <a
                    href={d.src!}
                    download={d.filename}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      background: d.status === "ready" ? "var(--swish-green)" : "rgba(245,158,11,0.3)",
                      color: "#fff",
                      textDecoration: "none",
                      padding: "8px 12px",
                      borderRadius: 8,
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: 11,
                      letterSpacing: "0.5px",
                      border: d.status === "ready" ? "none" : "1px solid rgba(245,158,11,0.5)",
                    }}
                  >
                    ↓ {d.status === "ready" ? "DOWNLOAD" : "DOWNLOAD (ITERATION)"}
                  </a>
                ) : (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px 12px",
                    borderRadius: 8,
                    border: "1px solid rgba(255,255,255,0.1)",
                    fontSize: 11,
                    fontWeight: 700,
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.5px",
                  }}>
                    NOT YET AVAILABLE
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Deliverables checklist */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
        }}>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#fff", marginBottom: 16 }}>ASSETS COMPLETED</div>
            {[
              "SWISH_ASIAN_VegPadThai_1x1.webp — 2000×2000px",
              "SWISH_ASIAN_ChickenPadThai_1x1.webp — 2000×2000px",
              "SWISH_ASIAN_VegGreenThaiCurry_1x1.webp — 2000×2000px",
              "SWISH_ASIAN_ChickenGreenThaiCurry_1x1.webp — 2000×2000px",
              "SWISH_ASIAN_VegCombo_1x1.webp — 2000×2000px",
              "Raw reference photos — 4 of 5 SKUs (Combo: none needed)",
              "AI generation prompts — all 5 SKUs documented",
              "Failed iterations — 25 total across all SKUs",
              "Moodboard — complete (Figma)",
              "Visual direction brief — complete",
              "Shoot sheets — 5 SKUs (Figma)",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12, lineHeight: 1.4 }}>
                <span style={{ color: "var(--swish-green)", fontWeight: 700, flexShrink: 0 }}>✓</span>
                <span style={{ color: "rgba(255,255,255,0.75)" }}>{item}</span>
              </div>
            ))}
          </div>

          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: 24 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#fff", marginBottom: 16 }}>DERIVATIVE ASSETS</div>
            {[
              "5× PDP crops — square hero at 1080×1080px",
              "1× category banner 16:9 — using combo hero",
              "App grid thumbnails — 400×400px per SKU",
              "Push notification thumbnail — 72×72px per SKU",
            ].map(item => (
              <div key={item} style={{ display: "flex", gap: 10, marginBottom: 8, fontSize: 12, lineHeight: 1.4 }}>
                <span style={{ color: "rgba(255,165,0,0.9)", fontWeight: 700, flexShrink: 0 }}>→</span>
                <span style={{ color: "rgba(255,255,255,0.65)" }}>{item}</span>
              </div>
            ))}
            <div style={{
              marginTop: 16,
              padding: "12px 16px",
              background: "rgba(51,195,98,0.08)",
              borderRadius: 10,
              fontSize: 12,
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.6,
              borderLeft: "2px solid var(--swish-green)",
            }}>
              All 5 hero finals are approved and ready. Derivative exports can be generated from the master 2000×2000px files above.
            </div>
          </div>
        </div>

        {/* Production credits */}
        <div style={{
          marginTop: 48,
          paddingTop: 32,
          borderTop: "1px solid rgba(255,255,255,0.1)",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.6s",
        }}>
          <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "2px", color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>
            PRODUCTION CREDITS
          </div>
          <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
            {[
              { role: "Creative Direction", name: "Bhavika Kumar" },
              { role: "Visual Merchandising", name: "Bhavika Kumar" },
              { role: "AI Photography Direction", name: "Bhavika Kumar" },
              { role: "Product Design", name: "Bhavika Kumar" },
              { role: "Frontend Development", name: "Bhavika Kumar" },
              { role: "Brand", name: "Swish" },
            ].map(credit => (
              <div key={credit.role}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{credit.role.toUpperCase()}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{credit.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
