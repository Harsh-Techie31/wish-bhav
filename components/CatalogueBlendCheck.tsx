"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { products, catalogueItems } from "@/lib/products";

export default function CatalogueBlendCheck() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState<"asian" | "catalogue">("asian");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const asianProducts = products.filter(p => p.heroImage);

  const mixedItems = [
    ...asianProducts.slice(0, 2),
    null, // existing SKU 1 placeholder
    ...asianProducts.slice(2),
    null, // existing SKU 2 placeholder
  ];

  return (
    <section
      id="blend"
      ref={ref}
      style={{
        background: "var(--warm-white)",
        padding: "100px 32px",
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
            06 — CATALOGUE BLEND CHECK
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 24 }}>
            <div>
              <h2 style={{
                fontFamily: "var(--font-body)",
                fontWeight: 900,
                fontSize: "clamp(32px, 5vw, 60px)",
                lineHeight: 1.05,
                letterSpacing: "-1.5px",
                color: "var(--jade)",
              }}>
                NEW CATEGORY.<br />
                <span style={{ color: "var(--swish-green)" }}>SAME SWISH.</span>
              </h2>
            </div>
            <p style={{ fontSize: 15, color: "var(--muted-text)", maxWidth: 400, lineHeight: 1.6 }}>
              The Asian category must feel native to the existing Swish app. Same background warmth, same angle logic, same light quality — different cuisine.
            </p>
          </div>
        </div>

        {/* View toggle */}
        <div style={{
          display: "flex",
          gap: 4,
          background: "#fff",
          padding: 4,
          borderRadius: 12,
          border: "1px solid var(--border)",
          width: "fit-content",
          marginBottom: 36,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.2s",
        }}>
          <button
            onClick={() => setView("asian")}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background: view === "asian" ? "var(--jade)" : "transparent",
              color: view === "asian" ? "#fff" : "var(--muted-text)",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.5px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            ASIAN CATEGORY
          </button>
          <button
            onClick={() => setView("catalogue")}
            style={{
              padding: "10px 24px",
              borderRadius: 8,
              border: "none",
              background: view === "catalogue" ? "var(--jade)" : "transparent",
              color: view === "catalogue" ? "#fff" : "var(--muted-text)",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.5px",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            MIXED WITH SWISH CATALOGUE
          </button>
        </div>

        {/* Asian view */}
        {view === "asian" && (
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 16,
              marginBottom: 36,
            }}>
              {products.map(product => (
                <div
                  key={product.id}
                  style={{
                    background: "#fff",
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid var(--border)",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                  }}
                >
                  <div style={{ position: "relative", paddingTop: "100%", background: "var(--warm-white)" }}>
                    {product.heroImage ? (
                      <Image src={product.heroImage} alt={product.name} fill style={{ objectFit: "cover", objectPosition: "center 30%" }} sizes="260px" />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                        <span style={{ fontSize: 28, opacity: 0.3 }}>🍜</span>
                        <span style={{ fontSize: 9, color: "var(--warm-grey)", fontWeight: 700, letterSpacing: "1px" }}>IN PRODUCTION</span>
                      </div>
                    )}
                    <div style={{ position: "absolute", top: 8, left: 8 }}>
                      <div style={{
                        background: "rgba(255,255,255,0.9)",
                        borderRadius: 6,
                        padding: "2px 7px",
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                      }}>
                        <span className={product.category === "veg" ? "veg-dot" : "nonveg-dot"} />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: "10px 12px" }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "var(--dark-text)", lineHeight: 1.3 }}>{product.shortName}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mixed catalogue view */}
        {view === "catalogue" && (
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.5s ease" }}>
            <div style={{
              marginBottom: 20,
              padding: "10px 16px",
              background: "rgba(51,195,98,0.08)",
              borderRadius: 10,
              borderLeft: "3px solid var(--swish-green)",
              fontSize: 13,
              color: "var(--jade)",
              fontWeight: 500,
            }}>
              Asian SKUs (highlighted) mixed with existing Swish catalogue images. Notice consistent background tone, light quality and crop language.
            </div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 14,
              marginBottom: 36,
            }}>
              {/* Show Asian products + placeholder existing items */}
              {products.map(product => (
                <div
                  key={product.id}
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    overflow: "hidden",
                    border: "2px solid var(--swish-green)",
                    boxShadow: "0 0 0 3px rgba(51,195,98,0.15)",
                  }}
                >
                  <div style={{ position: "relative", paddingTop: "100%", background: "var(--warm-white)" }}>
                    {product.heroImage ? (
                      <Image src={product.heroImage} alt={product.name} fill style={{ objectFit: "cover", objectPosition: "center 30%" }} sizes="200px" />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, background: "var(--jasmine-cream)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 24, opacity: 0.3 }}>🍜</span>
                      </div>
                    )}
                    <div style={{
                      position: "absolute",
                      top: 6,
                      right: 6,
                      background: "var(--swish-green)",
                      color: "#fff",
                      fontSize: 8,
                      fontWeight: 800,
                      padding: "2px 6px",
                      borderRadius: 4,
                      letterSpacing: "0.5px",
                    }}>
                      NEW
                    </div>
                  </div>
                  <div style={{ padding: "8px 10px" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "var(--dark-text)", lineHeight: 1.3 }}>{product.shortName}</div>
                  </div>
                </div>
              ))}

              {/* Existing catalogue reference */}
              <div style={{
                background: "#fff",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}>
                <div style={{ position: "relative", paddingTop: "100%", background: "var(--warm-white)" }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, gap: 8 }}>
                    <div style={{ width: 60, height: 60, borderRadius: 8, background: "var(--jasmine-cream)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🌯</div>
                    <span style={{ fontSize: 9, color: "var(--warm-grey)", fontWeight: 700, letterSpacing: "0.5px", textAlign: "center" }}>EXISTING SWISH SKU</span>
                  </div>
                </div>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--warm-grey)", lineHeight: 1.3 }}>Grilled Chicken Wrap</div>
                </div>
              </div>
              <div style={{
                background: "#fff",
                borderRadius: 14,
                overflow: "hidden",
                border: "1px solid var(--border)",
              }}>
                <div style={{ position: "relative", paddingTop: "100%", background: "var(--warm-white)" }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 16, gap: 8 }}>
                    <div style={{ width: 60, height: 60, borderRadius: 8, background: "var(--jasmine-cream)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>🍛</div>
                    <span style={{ fontSize: 9, color: "var(--warm-grey)", fontWeight: 700, letterSpacing: "0.5px", textAlign: "center" }}>EXISTING SWISH SKU</span>
                  </div>
                </div>
                <div style={{ padding: "8px 10px" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "var(--warm-grey)", lineHeight: 1.3 }}>Rajma Rice Bowl</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Consistency checklist */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.4s",
        }}>
          {[
            {
              title: "BACKGROUND",
              status: "✓",
              desc: "Warm cream / beige stone — the Swish catalogue default for mid-range SKUs.",
              ok: true,
            },
            {
              title: "CAMERA ANGLE",
              status: "✓",
              desc: "45° three-quarter for noodles. Slightly more top-down for curry/gravy dishes.",
              ok: true,
            },
            {
              title: "LIGHT QUALITY",
              status: "✓",
              desc: "Soft diffused warm light from the top-left. No harsh flash. No dramatic shadows.",
              ok: true,
            },
            {
              title: "FOOD SCALE",
              status: "✓",
              desc: "60–70% frame fill. Consistent across all five dishes and existing catalogue.",
              ok: true,
            },
            {
              title: "SAFE ZONE",
              status: "✓",
              desc: "Bottom-right quadrant clear in every image. Add button placement unobstructed.",
              ok: true,
            },
            {
              title: "VEG / NON-VEG",
              status: "✓",
              desc: "Veg and non-veg distinction immediately legible from the food itself — no ambiguity.",
              ok: true,
            },
          ].map(item => (
            <div key={item.title} style={{
              background: "#fff",
              borderRadius: 14,
              padding: "18px 20px",
              border: "1px solid var(--border)",
              borderLeft: `3px solid ${item.ok ? "var(--swish-green)" : "var(--chilli-red)"}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 16, color: item.ok ? "var(--swish-green)" : "var(--chilli-red)", fontWeight: 900 }}>{item.status}</span>
                <span style={{ fontWeight: 800, fontSize: 11, letterSpacing: "1.5px", color: "var(--jade)" }}>{item.title}</span>
              </div>
              <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
