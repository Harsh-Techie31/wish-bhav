"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type SKUId = "veg-pad-thai" | "chicken-pad-thai" | "veg-green-thai-curry" | "chicken-green-thai-curry" | "veg-combo";

const skus: {
  id: SKUId;
  label: string;
  hasRaw: boolean;
  rawImg: string | null;
  finalImg: string;
  prompt: string;
  iterations: { src: string; label: string }[];
}[] = [
  {
    id: "veg-pad-thai",
    label: "Veg Pad Thai",
    hasRaw: true,
    rawImg: "/images/raw/veg-pad-thai-raw.webp",
    finalImg: "/images/products/veg-pad-thai.webp",
    prompt: `45-degree overhead food photography of Veg Pad Thai Noodles in a wide white ceramic bowl. Golden pan-seared tofu cubes as the hero protein on top — large, crispy-edged, clearly tofu not chicken. Flat rice noodles with bean sprouts, julienned carrot, red bell pepper, baby corn, broccoli floret, spring onion. Single lime wedge at 10 o'clock on bowl rim.

Surface: deep dark forest-green textured linen. Bottom-right quadrant completely clear for UI overlay. Props: gold fork (bottom-left, partial), peanuts + red chilli rings (top-left), ribbed glass with lime (top-right, partial). Lighting: warm directional from upper-left, golden highlights catching the crispy tofu edges and noodle gloss.`,
    iterations: [
      { src: "/images/iterations/veg-pad-thai-iter1.webp", label: "Iteration 1" },
      { src: "/images/iterations/veg-pad-thai-iter2.webp", label: "Iteration 2" },
      { src: "/images/iterations/veg-pad-thai-iter3.webp", label: "Iteration 3" },
      { src: "/images/iterations/veg-pad-thai-iter4.webp", label: "Iteration 4" },
      { src: "/images/iterations/veg-pad-thai-iter5.webp", label: "Iteration 5" },
      { src: "/images/iterations/veg-pad-thai-iter6.webp", label: "Iteration 6" },
    ],
  },
  {
    id: "chicken-pad-thai",
    label: "Chicken Pad Thai",
    hasRaw: true,
    rawImg: "/images/raw/chicken-pad-thai-raw.webp",
    finalImg: "/images/products/chicken-pad-thai.webp",
    prompt: `45-degree overhead food photography of Chicken Pad Thai in a wide white ceramic bowl. Flat rice noodles with visible seared boneless chicken pieces, scrambled egg ribbons, bean sprouts, roasted crushed peanuts, julienned carrot and red bell pepper strips, spring onion rings garnished on top, single lime wedge resting on the bowl rim at 10 o'clock position, chopsticks lifting a tangle of noodles from the bowl showing separation and gloss.

Surface: round dark walnut wooden serving board with natural live edge, sitting on warm off-white cream matte surface. Bottom-right quadrant completely empty for UI overlay.

Props placed in the top half and left side: a small ceramic ramekin with Pad Thai sauce, one halved lime and lime wedge, 3–4 sliced red chilli rings, 2–3 fresh Thai basil leaves, 5–6 loose roasted peanuts, a tall ribbed glass of water with lemon at top-right corner (partially cropped).

Lighting: soft warm directional from top-left, gentle shadow cast to bottom-right.`,
    iterations: [
      { src: "/images/iterations/chicken-pad-thai-iter1.webp", label: "Iteration 1" },
      { src: "/images/iterations/chicken-pad-thai-iter2.webp", label: "Iteration 2" },
      { src: "/images/iterations/chicken-pad-thai-iter3.webp", label: "Iteration 3" },
    ],
  },
  {
    id: "veg-green-thai-curry",
    label: "Veg Green Thai Curry",
    hasRaw: true,
    rawImg: "/images/raw/veg-green-thai-curry-raw.webp",
    finalImg: "/images/products/veg-green-thai-curry-v2.webp",
    prompt: `Professional food photography of a Veg Green Thai Curry Bowl served alongside a bowl of fluffy jasmine rice. Camera: elevated 45–60 degree angle.

Composition: Two bowls on a rustic wooden rectangular serving board — green Thai curry in foreground-left, jasmine rice in mid-right. Steel spoon placed diagonally. Small condiment bowl of crushed peanuts in background.

The curry: matte-finish ceramic bowl, creamy green coconut base — glossy, NOT oily. Visible broccoli, baby corn, tofu (clearly tofu, not chicken), Thai eggplant, red bell pepper. Garnish: 2–3 Thai basil leaves and red chilli rings.

The rice: fluffy long-grain jasmine rice, grains individually visible and slightly translucent. Single basil leaf on top.

Lighting: soft diffused from top-left, gentle highlights on curry surface. No harsh shadows.`,
    iterations: [
      { src: "/images/iterations/veg-green-thai-curry-iter1.webp", label: "Iteration 1" },
      { src: "/images/iterations/veg-green-thai-curry-iter2.webp", label: "Iteration 2" },
      { src: "/images/iterations/veg-green-thai-curry-iter3.webp", label: "Iteration 3" },
      { src: "/images/iterations/veg-green-thai-curry-iter4.webp", label: "Iteration 4" },
      { src: "/images/iterations/veg-green-thai-curry-iter5.webp", label: "Iteration 5" },
      { src: "/images/iterations/veg-green-thai-curry-iter6.webp", label: "Iteration 6" },
    ],
  },
  {
    id: "chicken-green-thai-curry",
    label: "Chicken Green Thai Curry",
    hasRaw: true,
    rawImg: "/images/raw/chicken-green-thai-curry-raw.webp",
    finalImg: "/images/products/chicken-green-thai-curry.webp",
    prompt: `A close-up food photography shot of a Thai green chicken curry served in a matte ceramic bowl placed on a rustic wooden serving board. Rich creamy green coconut milk base. Large, golden-seared chicken pieces surfacing above the curry as the hero ingredient. Minimal vegetables — zucchini, baby corn. Thai basil leaves and sliced red chillies on top. Rice bowl beside with cilantro sprig. Steel spoon on right side of board.

Background: warm muted sage green surface. Lighting: soft directional from upper-left, 45-degree angle. Chicken must be golden-seared and prominently above curry level. Bottom-right quadrant completely clear for UI overlay. Hyper-realistic commercial food photography, 8K.`,
    iterations: [
      { src: "/images/iterations/chicken-green-thai-curry-iter1.webp", label: "Iteration 1" },
      { src: "/images/iterations/chicken-green-thai-curry-iter2.webp", label: "Iteration 2" },
      { src: "/images/iterations/chicken-green-thai-curry-iter3.webp", label: "Iteration 3" },
      { src: "/images/iterations/chicken-green-thai-curry-iter4.webp", label: "Iteration 4" },
      { src: "/images/iterations/chicken-green-thai-curry-iter5.webp", label: "Iteration 5" },
      { src: "/images/iterations/chicken-green-thai-curry-iter6.webp", label: "Iteration 6" },
    ],
  },
  {
    id: "veg-combo",
    label: "Veg Combo",
    hasRaw: false,
    rawImg: null,
    finalImg: "/images/products/veg-combo.webp",
    prompt: `Professional food photography, top-down angled shot of a Thai combo meal in a staggered triangular composition on a warm beige surface.

Top-right: white ceramic bowl on round rustic wooden board — veg pad thai with golden tofu, red bell pepper, purple cabbage, broccoli, baby corn, bean sprouts, edamame; bamboo chopstick lifting noodles; lime wedge on rim.

Middle-left: matte beige bowl — veg green Thai curry with creamy green coconut base, baby corn, broccoli, zucchini, mushrooms, red pepper; Thai basil and red chilli on top.

Bottom-centre: smaller beige bowl of fluffy jasmine rice, cilantro sprig on top. Steel spoon beside curry bowl. Soft warm directional lighting from upper-left. Shallow DOF. Bottom-right completely clear.`,
    iterations: [
      { src: "/images/iterations/veg-combo-iter1.webp", label: "Iteration 1" },
      { src: "/images/iterations/veg-combo-iter2.webp", label: "Iteration 2" },
      { src: "/images/iterations/veg-combo-iter3.webp", label: "Iteration 3" },
      { src: "/images/iterations/veg-combo-iter4.webp", label: "Iteration 4" },
    ],
  },
];

export default function ProductionSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeSKU, setActiveSKU] = useState<SKUId>("chicken-pad-thai");
  const [stage, setStage] = useState<"raw" | "prompt" | "final">("raw");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const activeSKUData = skus.find(s => s.id === activeSKU) ?? skus[0];

  const getStageImage = (): string | null => {
    if (!activeSKUData) return null;
    if (stage === "raw") return activeSKUData.rawImg;
    if (stage === "prompt") {
      const firstIter = activeSKUData.iterations[0];
      return firstIter ? firstIter.src : activeSKUData.finalImg;
    }
    return activeSKUData.finalImg;
  };

  const stageButtons = (["raw", "prompt", "final"] as const).filter(s =>
    s !== "raw" || activeSKUData.hasRaw
  );

  return (
    <section
      id="process"
      ref={ref}
      style={{
        background: "#1A1A1A",
        padding: "100px 32px",
        color: "#fff",
      }}
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
            05 — THE PROCESS
          </div>
          <h2 style={{
            fontFamily: "var(--font-body)",
            fontWeight: 900,
            fontSize: "clamp(32px, 5vw, 60px)",
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            color: "#fff",
          }}>
            FROM RAW KITCHEN PHOTOS<br />
            <span style={{ color: "var(--swish-green)" }}>TO CRAVE-WORTHY HEROES.</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 580, lineHeight: 1.6, marginTop: 20 }}>
            I didn&apos;t upload a photo into AI and accept the first output. Each dish was art-directed: the angle, the light, the surface, the props, the garnish — documented before a single prompt was written.
          </p>
        </div>

        {/* SKU selector */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 40,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.2s",
        }}>
          {skus.map(sku => (
            <button
              key={sku.id}
              onClick={() => { setActiveSKU(sku.id); setStage(sku.hasRaw ? "raw" : "prompt"); }}
              style={{
                padding: "8px 20px",
                borderRadius: 24,
                border: "1.5px solid",
                borderColor: activeSKU === sku.id ? "var(--swish-green)" : "rgba(255,255,255,0.15)",
                background: activeSKU === sku.id ? "var(--swish-green)" : "transparent",
                color: activeSKU === sku.id ? "#fff" : "rgba(255,255,255,0.6)",
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.5px",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {sku.label}
            </button>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 40,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.3s",
        }}>
          {/* Left — visual */}
          <div>
            {/* Stage navigator */}
            <div style={{
              display: "flex",
              gap: 0,
              background: "rgba(255,255,255,0.08)",
              borderRadius: 12,
              padding: 4,
              marginBottom: 20,
              width: "fit-content",
            }}>
              {([
                { id: "raw" as const, label: "① RAW INPUT" },
                { id: "prompt" as const, label: "② ITERATIONS" },
                { id: "final" as const, label: "③ FINAL" },
              ]).filter(s => stageButtons.includes(s.id)).map(s => (
                <button
                  key={s.id}
                  onClick={() => setStage(s.id)}
                  style={{
                    padding: "7px 16px",
                    borderRadius: 8,
                    border: "none",
                    background: stage === s.id ? "var(--swish-green)" : "transparent",
                    color: stage === s.id ? "#fff" : "rgba(255,255,255,0.5)",
                    fontFamily: "var(--font-body)",
                    fontWeight: 700,
                    fontSize: 11,
                    cursor: "pointer",
                    letterSpacing: "0.5px",
                    transition: "all 0.2s",
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Main image */}
            <div style={{
              position: "relative",
              paddingTop: "100%",
              borderRadius: 20,
              overflow: "hidden",
              background: "rgba(255,255,255,0.05)",
              marginBottom: 16,
            }}>
              {getStageImage() ? (
                <Image
                  src={getStageImage()!}
                  alt={`${activeSKUData.label} - ${stage}`}
                  fill
                  style={{ objectFit: "cover", transition: "opacity 0.4s ease" }}
                  sizes="600px"
                />
              ) : (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Image not available</span>
                </div>
              )}
              <div style={{
                position: "absolute",
                top: 12,
                left: 12,
                background: "rgba(0,0,0,0.6)",
                padding: "4px 10px",
                borderRadius: 20,
                fontSize: 10,
                fontWeight: 700,
                color: stage === "final" ? "var(--swish-green)" : "#fff",
                letterSpacing: "1px",
              }}>
                {stage === "raw" ? "RAW KITCHEN REFERENCE" : stage === "prompt" ? "AI ITERATION" : "FINAL APPROVED"}
              </div>
            </div>

            {/* Iterations contact sheet */}
            {activeSKUData.iterations.length > 0 && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>
                  ALL PRODUCTION ITERATIONS — {activeSKUData.iterations.length} ROUNDS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {activeSKUData.iterations.map((iter) => (
                    <div
                      key={iter.src}
                      style={{ position: "relative", paddingTop: "100%", borderRadius: 10, overflow: "hidden", cursor: "pointer" }}
                      onClick={() => setStage("prompt")}
                    >
                      <Image src={iter.src} alt={iter.label} fill style={{ objectFit: "cover" }} sizes="150px" />
                      <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)",
                      }} />
                      <div style={{ position: "absolute", bottom: 6, left: 6, right: 6, fontSize: 9, color: "#fff", fontWeight: 700, lineHeight: 1.3 }}>
                        {iter.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — text production notes */}
          <div>
            <div style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: 20,
              padding: 28,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 24,
            }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 8 }}>{activeSKUData.label}</div>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: "var(--swish-green)" }}>
                  {stage === "raw" ? "STEP 1 — RAW REFERENCE" : stage === "prompt" ? "STEP 2 — GENERATION + ITERATIONS" : "STEP 3 — FINAL APPROVED IMAGE"}
                </div>
              </div>

              {stage === "raw" && (
                <>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }}>
                    Every dish started with a real kitchen photograph — taken as a composition and styling reference. This establishes the actual physical reality: the container size, the food volume, the colour of the dish, the realistic sauce consistency.
                  </p>
                  <div style={{
                    background: "rgba(51,195,98,0.1)",
                    borderRadius: 12,
                    padding: "16px 20px",
                    borderLeft: "2px solid var(--swish-green)",
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 12, color: "var(--swish-green)", marginBottom: 8 }}>WHY THIS MATTERS</div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                      Without a real reference, AI generates a fantasy version of the dish — perfect, plastic, unappetising at the moment it arrives. The raw photo anchors the AI output to what actually gets delivered.
                    </p>
                  </div>
                </>
              )}

              {stage === "prompt" && (
                <>
                  <p style={{ fontSize: 13, lineHeight: 1.7, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
                    The generation prompt was written in precise photographic language — not &ldquo;a photo of Pad Thai&rdquo; but a complete art direction brief: angle, lens height, container position, light direction, prop placement rules, bottom-right safe zone, colour palette, and quality criteria.
                  </p>
                  <div style={{
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: 12,
                    padding: 16,
                    fontFamily: "monospace",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.7,
                    maxHeight: 260,
                    overflowY: "auto",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}>
                    {activeSKUData.prompt}
                  </div>
                </>
              )}

              {stage === "final" && (
                <>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }}>
                    The approved final image meets all the criteria of the visual direction brief: correct angle, warm side lighting, food filling 60–70% of frame, bottom-right quadrant clear for the Add button, all key ingredients clearly visible and identifiable.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    {[
                      { label: "FOOD SCALE", value: "60–70% frame fill" },
                      { label: "SAFE ZONE", value: "Bottom-right clear" },
                      { label: "LIGHT", value: "Soft left-side warm" },
                      { label: "TRUTH", value: "No fantasy ingredients" },
                    ].map(item => (
                      <div key={item.label} style={{
                        background: "rgba(51,195,98,0.1)",
                        borderRadius: 10,
                        padding: "12px 14px",
                        borderLeft: "2px solid var(--swish-green)",
                      }}>
                        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: "var(--swish-green)", marginBottom: 4 }}>{item.label}</div>
                        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
