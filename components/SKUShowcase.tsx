"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { products, Product } from "@/lib/products";

function ProductCard({ product, index, onClick }: { product: Product; index: number; onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        transition: "all 0.3s ease",
        transform: visible ? (hovered ? "translateY(-8px)" : "none") : "translateY(32px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.12)" : "0 2px 20px rgba(0,0,0,0.06)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", paddingTop: "100%", background: "var(--warm-white)" }}>
        {product.heroImage ? (
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            style={{
              objectFit: "cover",
              objectPosition: "center 30%",
              transition: "transform 0.4s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--jasmine-cream)",
            gap: 12,
          }}>
            <span style={{ fontSize: 40, opacity: 0.4 }}>🍜</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--warm-grey)", letterSpacing: "1px" }}>IN PRODUCTION</span>
          </div>
        )}

        {/* Veg/nonveg badge */}
        <div style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 8,
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          gap: 5,
        }}>
          <span className={product.category === "veg" ? "veg-dot" : "nonveg-dot"} />
          <span style={{ fontSize: 10, fontWeight: 700, color: product.category === "veg" ? "#2E7D32" : "#C62828" }}>
            {product.category === "veg" ? "VEG" : "NON-VEG"}
          </span>
        </div>

        {/* View product overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(28,74,71,0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}>
          <span style={{
            background: "var(--swish-green)",
            color: "#fff",
            padding: "10px 24px",
            borderRadius: 24,
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "1px",
          }}>
            VIEW PRODUCT →
          </span>
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 18px 18px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <h3 style={{
            fontFamily: "var(--font-body)",
            fontWeight: 800,
            fontSize: 14,
            color: "var(--dark-text)",
            lineHeight: 1.3,
            margin: 0,
          }}>
            {product.name}
          </h3>
          {!product.heroImage && (
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.8px",
              color: "#E65100",
              background: "#FFF3E0",
              padding: "2px 7px",
              borderRadius: 4,
              flexShrink: 0,
            }}>
              PENDING
            </span>
          )}
        </div>

        {/* Direction teaser — angle + surface */}
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          {(["angle", "surface"] as const).map(key => (
            <div key={key} style={{ display: "flex", gap: 6, alignItems: "flex-start" }}>
              <span style={{
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "1px",
                color: "var(--swish-green)",
                textTransform: "uppercase",
                flexShrink: 0,
                paddingTop: 1,
                minWidth: 44,
              }}>
                {key === "angle" ? "Angle" : "Surface"}
              </span>
              <span style={{ fontSize: 11, color: "var(--muted-text)", lineHeight: 1.4 }}>
                {product.creativeDirection[key].split(";")[0]}
              </span>
            </div>
          ))}
        </div>

        {/* Open CTA */}
        <div style={{
          marginTop: 12,
          padding: "6px 0",
          borderTop: "1px solid var(--border)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "1px",
          color: "var(--jade)",
          opacity: 0.5,
        }}>
          VIEW FULL SHOOT SHEET →
        </div>
      </div>
    </div>
  );
}

const directionLabels: Record<string, string> = {
  angle: "Angle",
  lighting: "Lighting",
  surface: "Surface & Serveware",
  props: "Props",
  garnish: "Hero & Garnish",
  cropFill: "Crop & Fill",
};

function PromptBlock({ prompt, negativePrompt }: { prompt: string; negativePrompt: string }) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const isPending = prompt.startsWith("[PROMPT PENDING");

  return (
    <div>
      {/* Prompt */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
          GENERATION PROMPT
        </div>
        <div
          style={{ position: "relative", cursor: isPending ? "default" : "pointer" }}
          onMouseEnter={() => !isPending && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => !isPending && setExpanded(e => !e)}
        >
          <div style={{
            fontSize: 12,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.7)",
            fontFamily: "var(--font-mono, monospace)",
            overflow: "hidden",
            maxHeight: expanded ? "none" : 72,
            transition: "max-height 0.4s ease",
            whiteSpace: "pre-wrap",
          }}>
            {prompt}
          </div>

          {/* Fade + hint overlay when collapsed */}
          {!expanded && !isPending && (
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 56,
              background: "linear-gradient(to bottom, transparent, #1C4A47)",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              paddingBottom: 6,
              pointerEvents: "none",
            }}>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "1.5px",
                color: hovered ? "var(--swish-green)" : "rgba(255,255,255,0.4)",
                transition: "color 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 5,
              }}>
                {hovered ? "↕  CLICK TO EXPAND FULL PROMPT" : "· · · · · · · · ·"}
              </span>
            </div>
          )}

          {/* Collapse button when expanded */}
          {expanded && (
            <button
              onClick={e => { e.stopPropagation(); setExpanded(false); }}
              style={{
                marginTop: 10,
                display: "flex",
                alignItems: "center",
                gap: 5,
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 6,
                color: "rgba(255,255,255,0.6)",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "1px",
                padding: "4px 10px",
                cursor: "pointer",
              }}
            >
              ↑ COLLAPSE
            </button>
          )}
        </div>
      </div>

      {/* Negative prompt */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.08)",
        paddingTop: 12,
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: "rgba(255,255,255,0.45)", marginBottom: 6 }}>
          NEGATIVE PROMPT
        </div>
        <p style={{ fontSize: 11, lineHeight: 1.6, color: "rgba(255,255,255,0.5)", fontStyle: "italic", margin: 0 }}>
          {negativePrompt}
        </p>
      </div>
    </div>
  );
}

type GalleryEntry = { src: string; label: string; rejected?: boolean; reason?: string };
type GalleryState = { mode: "final" } | { mode: "iterations"; startIndex: number } | null;

function ImageGallery({
  images, initialIndex, mode, pairSrc, pairLabel, onClose,
}: {
  images: GalleryEntry[];
  initialIndex: number;
  mode: "final" | "iterations";
  pairSrc?: string | null;
  pairLabel?: string;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [showPair, setShowPair] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.stopImmediatePropagation(); onClose(); }
      if (mode === "iterations") {
        if (e.key === "ArrowLeft") setIndex(i => Math.max(0, i - 1));
        if (e.key === "ArrowRight") setIndex(i => Math.min(images.length - 1, i + 1));
      }
    };
    window.addEventListener("keydown", handleKey, true);
    return () => window.removeEventListener("keydown", handleKey, true);
  }, [onClose, mode, images.length]);

  const current = images[index];
  const displaySrc = showPair && pairSrc ? pairSrc : current.src;
  const displayLabel = showPair && pairLabel ? pairLabel : current.label;

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 400,
        background: "rgba(5,10,8,0.96)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      {/* Close */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 24, right: 24, zIndex: 10,
          width: 44, height: 44, borderRadius: "50%",
          border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.08)",
          color: "#fff", fontSize: 18, cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >✕</button>

      {/* Prev */}
      {mode === "iterations" && index > 0 && (
        <button
          onClick={() => setIndex(i => i - 1)}
          style={{
            position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", zIndex: 10,
            width: 52, height: 52, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "#fff", fontSize: 32, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >‹</button>
      )}

      {/* Next */}
      {mode === "iterations" && index < images.length - 1 && (
        <button
          onClick={() => setIndex(i => i + 1)}
          style={{
            position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", zIndex: 10,
            width: 52, height: 52, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(255,255,255,0.08)",
            color: "#fff", fontSize: 32, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >›</button>
      )}

      {/* Image */}
      <div style={{ position: "relative", width: "80vmin", height: "80vmin" }}>
        <Image src={displaySrc} alt={displayLabel} fill style={{ objectFit: "contain" }} sizes="80vmin" priority />
      </div>

      {/* Bottom bar */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, letterSpacing: "0.5px" }}>
            {displayLabel}
          </div>
          {current.rejected && current.reason && !showPair && (
            <div style={{
              marginTop: 6, fontSize: 11, color: "#fff", letterSpacing: "0.3px",
              background: "rgba(198,40,40,0.75)", borderRadius: 6, padding: "4px 12px",
            }}>
              ✕ {current.reason}
            </div>
          )}
        </div>

        {/* Final/raw toggle */}
        {mode === "final" && pairSrc && (
          <div style={{
            display: "flex", gap: 4,
            background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: 4,
          }}>
            {([false, true] as const).map(isPair => (
              <button
                key={String(isPair)}
                onClick={() => setShowPair(isPair)}
                style={{
                  padding: "7px 18px", borderRadius: 7, border: "none",
                  background: showPair === isPair ? "var(--swish-green)" : "transparent",
                  color: showPair === isPair ? "#fff" : "rgba(255,255,255,0.55)",
                  fontWeight: 700, fontSize: 11, letterSpacing: "0.6px",
                  cursor: "pointer", transition: "all 0.15s",
                }}
              >
                {isPair ? "⟲ RAW INPUT" : "✦ FINAL AI IMAGE"}
              </button>
            ))}
          </div>
        )}

        {/* Dots */}
        {mode === "iterations" && images.length > 1 && (
          <div style={{ display: "flex", gap: 6 }}>
            {images.map((_, i) => (
              <div
                key={i}
                onClick={() => setIndex(i)}
                style={{
                  width: i === index ? 20 : 7, height: 7, borderRadius: 4,
                  background: i === index ? "var(--swish-green)" : "rgba(255,255,255,0.3)",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [beforeAfter, setBeforeAfter] = useState<"final" | "raw">("final");
  const [galleryState, setGalleryState] = useState<GalleryState>(null);
  const galleryOpenRef = useRef(false);
  galleryOpenRef.current = galleryState !== null;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !galleryOpenRef.current) onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  const directionEntries = Object.entries(product.creativeDirection);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(10,20,18,0.82)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#fff",
        borderRadius: 24,
        maxWidth: 1080,
        width: "100%",
        maxHeight: "92vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.35)",
      }}>

        {/* ── Sticky header ── */}
        <div style={{
          background: "var(--jade)",
          padding: "20px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className={product.category === "veg" ? "veg-dot" : "nonveg-dot"} style={{ width: 10, height: 10 }} />
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,0.5)", marginBottom: 2 }}>
                {product.category === "veg" ? "VEGETARIAN · SKU SHOOT SHEET" : "NON-VEGETARIAN · SKU SHOOT SHEET"}
              </div>
              <h2 style={{
                fontFamily: "var(--font-body)",
                fontWeight: 900,
                fontSize: "clamp(18px, 2.5vw, 26px)",
                color: "#fff",
                letterSpacing: "-0.3px",
                lineHeight: 1.1,
                margin: 0,
              }}>
                {product.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              color: "rgba(255,255,255,0.8)",
              cursor: "pointer",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.2s",
            }}
          >
            ✕
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div className="modal-scroll-body sku-modal-grid" style={{
          overflowY: "auto",
          flex: 1,
          padding: "28px 28px 32px",
          display: "grid",
          gridTemplateColumns: "minmax(0,2fr) minmax(0,3fr)",
          gap: 28,
          alignItems: "start",
        }}>

          {/* ── LEFT: image + iterations ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Main image */}
            <div
              onClick={() => { if (product.heroImage || product.rawImage) setGalleryState({ mode: "final" }); }}
              style={{
                position: "relative",
                paddingTop: "100%",
                borderRadius: 16,
                overflow: "hidden",
                background: "var(--warm-white)",
                cursor: (product.heroImage || product.rawImage) ? "zoom-in" : "default",
              }}
            >
              {beforeAfter === "final" && product.heroImage ? (
                <Image src={product.heroImage} alt={product.name} fill style={{ objectFit: "cover" }} sizes="460px" />
              ) : beforeAfter === "raw" && product.rawImage ? (
                <Image src={product.rawImage} alt="Raw input" fill style={{ objectFit: "cover" }} sizes="460px" />
              ) : (
                <div style={{
                  position: "absolute", inset: 0, display: "flex",
                  flexDirection: "column", alignItems: "center", justifyContent: "center",
                  background: "var(--jasmine-cream)", gap: 10,
                }}>
                  <span style={{ fontSize: 36, opacity: 0.3 }}>📷</span>
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: "var(--warm-grey)" }}>
                    IMAGE PENDING
                  </span>
                </div>
              )}
            </div>

            {/* Before / after toggle */}
            {(product.heroImage || product.rawImage) && (
              <div style={{ display: "flex", gap: 6 }}>
                {(["final", "raw"] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setBeforeAfter(mode)}
                    style={{
                      flex: 1,
                      padding: "8px 10px",
                      borderRadius: 8,
                      border: "1.5px solid",
                      borderColor: beforeAfter === mode ? "var(--swish-green)" : "var(--border)",
                      background: beforeAfter === mode ? "var(--swish-green-light)" : "transparent",
                      color: beforeAfter === mode ? "var(--jade)" : "var(--muted-text)",
                      fontFamily: "var(--font-body)",
                      fontWeight: 700,
                      fontSize: 10,
                      letterSpacing: "0.8px",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    {mode === "final" ? "✦ FINAL AI IMAGE" : "⟲ RAW INPUT"}
                  </button>
                ))}
              </div>
            )}

            {/* Iterations */}
            {product.iterations.length > 0 && (
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: "var(--muted-text)", marginBottom: 10 }}>
                  PRODUCTION ITERATIONS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
                  {product.iterations.map((iter, idx) => (
                    <div
                      key={iter.src}
                      onClick={() => setGalleryState({ mode: "iterations", startIndex: idx })}
                      style={{ position: "relative", paddingTop: "100%", borderRadius: 10, overflow: "hidden", cursor: "zoom-in" }}
                    >
                      <Image src={iter.src} alt={iter.label} fill style={{ objectFit: "cover" }} sizes="130px" />
                      <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0,
                        background: "rgba(0,0,0,0.55)",
                        padding: "3px 6px",
                        fontSize: 8, color: "#fff", fontWeight: 600, letterSpacing: "0.3px",
                      }}>
                        {iter.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── RIGHT: direction + AI production ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Photography Direction */}
            <div>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "var(--jade)" }}>
                  PHOTOGRAPHY DIRECTION
                </div>
                <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {directionEntries.map(([key, val]) => (
                  <div
                    key={key}
                    style={{
                      padding: "12px 14px",
                      background: "var(--warm-white)",
                      borderRadius: 12,
                      border: "1px solid var(--border)",
                      borderTop: "2px solid var(--swish-green)",
                    }}
                  >
                    <div style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: "1.5px",
                      color: "var(--swish-green)",
                      textTransform: "uppercase",
                      marginBottom: 5,
                    }}>
                      {directionLabels[key] ?? key}
                    </div>
                    <div style={{ fontSize: 12, lineHeight: 1.55, color: "var(--dark-text)" }}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Production */}
            <div style={{
              background: "var(--jade)",
              borderRadius: 16,
              padding: "20px 22px",
              color: "#fff",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 16,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "2px", color: "var(--swish-green)" }}>
                  AI PRODUCTION
                </div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.1)" }} />
              </div>

              {/* Tool + model */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: "rgba(255,255,255,0.45)", marginBottom: 6 }}>
                  TOOL / MODEL
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {product.aiTool.split("—").map((part, i) => (
                    <span
                      key={i}
                      style={{
                        display: "inline-block",
                        fontSize: 11,
                        fontWeight: 700,
                        color: i === 0 ? "var(--swish-green)" : "rgba(255,255,255,0.65)",
                        background: i === 0 ? "rgba(51,195,98,0.12)" : "rgba(255,255,255,0.06)",
                        border: `1px solid ${i === 0 ? "rgba(51,195,98,0.3)" : "rgba(255,255,255,0.1)"}`,
                        borderRadius: 6,
                        padding: "3px 10px",
                        letterSpacing: "0.3px",
                      }}
                    >
                      {part.trim()}
                    </span>
                  ))}
                </div>
              </div>

              <PromptBlock prompt={product.prompt} negativePrompt={product.negativePrompt} />
            </div>
          </div>
        </div>
      </div>

      {galleryState && (
        <ImageGallery
          images={
            galleryState.mode === "iterations"
              ? product.iterations
              : [{ src: product.heroImage ?? product.rawImage ?? "", label: "Final AI Image" }]
          }
          initialIndex={galleryState.mode === "iterations" ? galleryState.startIndex : 0}
          mode={galleryState.mode}
          pairSrc={galleryState.mode === "final" ? (product.rawImage ?? null) : null}
          pairLabel="Raw Input"
          onClose={() => setGalleryState(null)}
        />
      )}

      <style>{`
        .modal-scroll-body::-webkit-scrollbar { width: 4px; }
        .modal-scroll-body::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll-body::-webkit-scrollbar-thumb { background: rgba(28,74,71,0.2); border-radius: 4px; }
        @media (max-width: 720px) {
          .sku-modal-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

export default function SKUShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<"all" | "veg" | "nonveg">("all");

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const filtered = products.filter(p =>
    filter === "all" ? true :
    filter === "veg" ? p.category === "veg" :
    p.category === "nonveg"
  );

  return (
    <section
      id="menu"
      ref={ref}
      style={{ background: "var(--off-white)", padding: "100px 32px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 48,
          flexWrap: "wrap",
          gap: 24,
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(20px)",
          transition: "all 0.6s ease",
        }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "3px", color: "var(--swish-green)", marginBottom: 16 }}>
              03 — THE MENU
            </div>
            <h2 style={{
              fontFamily: "var(--font-body)",
              fontWeight: 900,
              fontSize: "clamp(36px, 5vw, 60px)",
              lineHeight: 1,
              letterSpacing: "-1.5px",
              color: "var(--jade)",
            }}>
              FIVE NEW<br />FAVOURITES.
            </h2>
          </div>

          {/* Filter */}
          <div style={{
            display: "flex",
            gap: 4,
            background: "#fff",
            padding: 4,
            borderRadius: 12,
            border: "1px solid var(--border)",
          }}>
            {(["all", "veg", "nonveg"] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: "8px 20px",
                  borderRadius: 8,
                  border: "none",
                  background: filter === f ? "var(--swish-green)" : "transparent",
                  color: filter === f ? "#fff" : "var(--muted-text)",
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.5px",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
              >
                {f === "all" ? "ALL" : f === "veg" ? "🌿 VEG" : "🍗 NON-VEG"}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 24,
        }}>
          {filtered.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        <p style={{
          marginTop: 32,
          fontSize: 13,
          color: "var(--warm-grey)",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.6s",
        }}>
          Click any product to see the full creative production — raw input, AI prompt, iterations and final image.
        </p>
      </div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </section>
  );
}
