"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { moodboardColors } from "@/lib/products";

type Color = { name: string; hex: string; source: string; role: string };

function ColorSwatch({ color, index }: { color: Color; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.transform = "scale(1.03)")}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.transform = "none")}
    >
      <div
        style={{
          height: expanded ? 100 : 72,
          borderRadius: 12,
          background: color.hex,
          marginBottom: 8,
          transition: "height 0.3s ease",
          boxShadow: `0 4px 20px ${color.hex}40`,
        }}
      />
      <div style={{ fontWeight: 700, fontSize: 12, color: "var(--dark-text)", marginBottom: 2 }}>{color.name}</div>
      <div style={{ fontFamily: "monospace", fontSize: 11, color: "var(--warm-grey)", marginBottom: 4 }}>{color.hex}</div>
      {expanded && (
        <div style={{ fontSize: 11, color: "var(--muted-text)", lineHeight: 1.5 }}>
          <div style={{ marginBottom: 2 }}><strong>Source:</strong> {color.source}</div>
          <div><strong>Role:</strong> {color.role}</div>
        </div>
      )}
    </div>
  );
}

export default function MoodboardSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("story");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const tabs = [
    { id: "story", label: "CATEGORY STORY" },
    { id: "colours", label: "COLOUR PALETTE" },
    { id: "rules", label: "DO / DON'T" },
    { id: "references", label: "REFERENCES" },
  ];

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

        {/* Tab nav */}
        <div style={{
          display: "flex",
          gap: 4,
          marginBottom: 48,
          background: "rgba(255,255,255,0.08)",
          padding: 4,
          borderRadius: 12,
          width: "fit-content",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.2s",
        }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id ? "var(--swish-green)" : "transparent",
                color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.6)",
                border: "none",
                padding: "8px 18px",
                borderRadius: 8,
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "1px",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Category Story */}
        {activeTab === "story" && (
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 20,
            }}>
              {[
                {
                  label: "Option A — CHOSEN",
                  chosen: true,
                  text: "The warmth of a Thai kitchen, the quiet of a Japanese table.",
                  note: "Warmth + restraint — fits Swish's energetic but focused personality.",
                },
                {
                  label: "Option B",
                  chosen: false,
                  text: "Street food that grew up. Thai flavours, served with intention.",
                  note: "Slightly elevated — risks sounding too premium for the price point.",
                },
                {
                  label: "Option C",
                  chosen: false,
                  text: "Same wok, different world — Thai done with care.",
                  note: "Concise and punchy, but loses the warmth angle.",
                },
              ].map(option => (
                <div
                  key={option.label}
                  style={{
                    background: option.chosen ? "var(--swish-green)" : "rgba(255,255,255,0.08)",
                    borderRadius: 16,
                    padding: 28,
                    border: option.chosen ? "none" : "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", marginBottom: 16, opacity: 0.7 }}>
                    {option.label}
                  </div>
                  <p style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.4, marginBottom: 16, fontStyle: "italic" }}>
                    &ldquo;{option.text}&rdquo;
                  </p>
                  <p style={{ fontSize: 12, opacity: 0.75, lineHeight: 1.5 }}>{option.note}</p>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Colour Palette */}
        {activeTab === "colours" && (
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 36, maxWidth: 600, lineHeight: 1.6 }}>
              Every colour was pulled directly from the food photography — extracted from the actual ingredients, serveware and surfaces. Click a swatch for details.
            </p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: 16,
            }}>
              {moodboardColors.map((color, i) => (
                <ColorSwatch key={color.hex} color={color} index={i} />
              ))}
            </div>
            <div style={{ marginTop: 40 }}>
              <Image
                src="/images/moodboard/colour-palette.png"
                alt="Colour palette from Figma"
                width={800}
                height={565}
                style={{ width: "100%", maxWidth: 800, height: "auto", borderRadius: 12, opacity: 0.9 }}
              />
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 10 }}>
                Colour palette as designed in Figma — extracted from the actual food photography assets.
              </p>
            </div>
          </div>
        )}

        {/* Do/Don't */}
        {activeTab === "rules" && (
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              {/* DO */}
              <div style={{ background: "rgba(51,195,98,0.1)", borderRadius: 16, padding: 28, border: "1px solid rgba(51,195,98,0.3)" }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: "var(--swish-green)", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 24 }}>✓</span> DO
                </div>
                {[
                  "Food fills 60–70% of frame",
                  "Soft left side light, always",
                  "Max 2 props beside the dish",
                  "Chopsticks diagonal, never straight",
                  "Garnish placed on the food, not beside it",
                  "Sauce glossy — if it looks matte, reshoot",
                  "All 5 images feel like one shoot",
                  "Bottom-right quadrant clear for Add button",
                ].map(rule => (
                  <div key={rule} style={{ display: "flex", gap: 10, marginBottom: 12, fontSize: 14, lineHeight: 1.5 }}>
                    <span style={{ color: "var(--swish-green)", flexShrink: 0, fontWeight: 700 }}>→</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>

              {/* DON'T */}
              <div style={{ background: "rgba(192,57,43,0.1)", borderRadius: 16, padding: 28, border: "1px solid rgba(192,57,43,0.3)" }}>
                <div style={{ fontWeight: 800, fontSize: 18, color: "var(--chilli-red)", marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 24 }}>✗</span> DON&apos;T
                </div>
                {[
                  "No fake steam",
                  "No text baked into the image",
                  "No props not related to the dish",
                  "No flat, grey, unappetising light",
                  "No noodles clumped — they must look separate",
                  "No white balance that makes curry look grey",
                  "No bottom-right food — Add button lives there",
                  "No dramatic dark backgrounds",
                  "No overhead flat-lay for single dishes",
                ].map(rule => (
                  <div key={rule} style={{ display: "flex", gap: 10, marginBottom: 12, fontSize: 14, lineHeight: 1.5 }}>
                    <span style={{ color: "var(--chilli-red)", flexShrink: 0, fontWeight: 700 }}>✗</span>
                    <span>{rule}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* References */}
        {activeTab === "references" && (
          <div style={{ opacity: visible ? 1 : 0, transition: "opacity 0.6s ease" }}>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}>
              {[
                {
                  title: "SURFACES",
                  desc: "Warm cream and beige stone — the Swish default surface for mid-range SKUs. Never pure white, never grey.",
                  img: "/images/moodboard/surfaces.png",
                },
                {
                  title: "EXISTING SWISH SKUs",
                  desc: "10 catalogue images studied for background tone, angle, light quality, crop and prop language before making a single decision.",
                  img: "/images/catalogue/existing-skus.png",
                },
                {
                  title: "WHAT THIS MEANS FOR EACH DISH",
                  desc: "Pad Thai → noodles get texture and separation. Green curry → sauce gets a gloss. Jasmine rice → grains get individual definition.",
                  img: null,
                  text: "Soft left side light creates depth without drama — the same warmth that makes the Rajma and Khichdi look approachable, translated into a Southeast Asian register.",
                },
              ].map(ref => (
                <div key={ref.title} style={{
                  background: "rgba(255,255,255,0.08)",
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}>
                  {ref.img ? (
                    <div style={{ position: "relative", height: 200 }}>
                      <Image src={ref.img} alt={ref.title} fill style={{ objectFit: "cover" }} sizes="400px" />
                    </div>
                  ) : (
                    <div style={{ height: 200, background: "rgba(51,195,98,0.1)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                      <p style={{ fontSize: 14, lineHeight: 1.6, fontStyle: "italic", color: "rgba(255,255,255,0.75)", textAlign: "center" }}>
                        {ref.text}
                      </p>
                    </div>
                  )}
                  <div style={{ padding: "20px 24px" }}>
                    <div style={{ fontWeight: 800, fontSize: 11, letterSpacing: "2px", color: "var(--swish-green)", marginBottom: 8 }}>{ref.title}</div>
                    <p style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.75 }}>{ref.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #look > div > div:nth-child(4) > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
