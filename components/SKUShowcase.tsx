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
      <div style={{ padding: "16px 20px 20px" }}>
        <h3 style={{
          fontFamily: "var(--font-body)",
          fontWeight: 800,
          fontSize: 15,
          color: "var(--dark-text)",
          lineHeight: 1.3,
          marginBottom: 8,
        }}>
          {product.name}
        </h3>
        <p style={{ fontSize: 12, color: "var(--muted-text)", lineHeight: 1.5, marginBottom: 12 }}>
          {product.description.substring(0, 80)}…
        </p>

        {/* Key ingredients */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {product.keyIngredients.slice(0, 3).map(ing => (
            <span key={ing} style={{
              fontSize: 10,
              fontWeight: 600,
              color: "var(--jade)",
              background: "var(--warm-white)",
              padding: "2px 8px",
              borderRadius: 20,
            }}>
              {ing}
            </span>
          ))}
        </div>

        {!product.heroImage && (
          <div style={{
            marginTop: 10,
            padding: "6px 10px",
            background: "#FFF3E0",
            borderRadius: 6,
            fontSize: 11,
            color: "#E65100",
            fontWeight: 600,
          }}>
            Final image in production — prompt documented
          </div>
        )}
      </div>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [beforeAfter, setBeforeAfter] = useState<"final" | "raw">("final");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleKey); };
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflowY: "auto",
        padding: "40px 24px",
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{
        background: "#fff",
        borderRadius: 24,
        maxWidth: 1100,
        width: "100%",
        overflow: "hidden",
      }}>
        {/* Header */}
        <div style={{
          background: "var(--jade)",
          padding: "24px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <span className={product.category === "veg" ? "veg-dot" : "nonveg-dot"} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: "rgba(255,255,255,0.7)" }}>
                {product.category === "veg" ? "VEGETARIAN" : "NON-VEGETARIAN"}
              </span>
            </div>
            <h2 style={{ fontFamily: "var(--font-body)", fontWeight: 900, fontSize: 28, color: "#fff", letterSpacing: "-0.5px" }}>
              {product.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 40,
              height: 40,
              border: "none",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              color: "#fff",
              cursor: "pointer",
              fontSize: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 32, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {/* Left — images */}
          <div>
            {/* Main image with before/after toggle */}
            {(product.heroImage || product.rawImage) && (
              <>
                <div style={{
                  position: "relative",
                  paddingTop: "100%",
                  borderRadius: 16,
                  overflow: "hidden",
                  background: "var(--warm-white)",
                  marginBottom: 12,
                }}>
                  {beforeAfter === "final" && product.heroImage ? (
                    <Image src={product.heroImage} alt={product.name} fill style={{ objectFit: "cover" }} sizes="500px" />
                  ) : beforeAfter === "raw" && product.rawImage ? (
                    <Image src={product.rawImage} alt={`${product.name} raw input`} fill style={{ objectFit: "cover" }} sizes="500px" />
                  ) : (
                    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 13, color: "var(--warm-grey)" }}>Image not available</span>
                    </div>
                  )}
                </div>

                {/* Toggle */}
                {product.heroImage && product.rawImage && (
                  <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
                    {(["final", "raw"] as const).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setBeforeAfter(mode)}
                        style={{
                          flex: 1,
                          padding: "8px 12px",
                          borderRadius: 8,
                          border: "1.5px solid",
                          borderColor: beforeAfter === mode ? "var(--swish-green)" : "var(--border)",
                          background: beforeAfter === mode ? "var(--swish-green-light)" : "transparent",
                          color: beforeAfter === mode ? "var(--jade)" : "var(--muted-text)",
                          fontFamily: "var(--font-body)",
                          fontWeight: 700,
                          fontSize: 11,
                          letterSpacing: "0.5px",
                          cursor: "pointer",
                        }}
                      >
                        {mode === "final" ? "✦ FINAL AI IMAGE" : "⟲ RAW INPUT"}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Iterations */}
            {product.iterations.length > 0 && (
              <div>
                <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "2px", color: "var(--muted-text)", marginBottom: 12 }}>
                  PRODUCTION ITERATIONS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
                  {product.iterations.map(iter => (
                    <div key={iter.src} style={{ position: "relative", paddingTop: "100%", borderRadius: 10, overflow: "hidden" }}>
                      <Image src={iter.src} alt={iter.label} fill style={{ objectFit: "cover" }} sizes="150px" />
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(0,0,0,0.6)",
                        padding: "4px 8px",
                        fontSize: 9,
                        color: "#fff",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                      }}>
                        {iter.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — info */}
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "var(--muted-text)", marginBottom: 28 }}>
              {product.description}
            </p>

            {/* Key ingredients */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "2px", color: "var(--jade)", marginBottom: 12 }}>KEY INGREDIENTS</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {product.keyIngredients.map(ing => (
                  <span key={ing} style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--jade)",
                    background: "var(--warm-white)",
                    padding: "4px 12px",
                    borderRadius: 20,
                    border: "1px solid var(--border)",
                  }}>
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Creative direction */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "2px", color: "var(--jade)", marginBottom: 16 }}>PHOTOGRAPHY DIRECTION</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {Object.entries(product.creativeDirection).map(([key, val]) => (
                  <div key={key} style={{
                    padding: "10px 14px",
                    background: "var(--warm-white)",
                    borderRadius: 10,
                    borderLeft: "2px solid var(--swish-green)",
                  }}>
                    <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "1.5px", color: "var(--swish-green)", marginBottom: 4, textTransform: "uppercase" }}>{key}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.5, color: "var(--dark-text)" }}>{val}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Info */}
            <div style={{
              background: "var(--jade)",
              color: "#fff",
              borderRadius: 14,
              padding: "20px 24px",
            }}>
              <div style={{ fontWeight: 700, fontSize: 11, letterSpacing: "2px", color: "var(--swish-green)", marginBottom: 12 }}>AI PRODUCTION</div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 11, opacity: 0.6, fontWeight: 600 }}>TOOL / MODEL</span>
                <p style={{ fontSize: 13, marginTop: 2 }}>{product.aiTool}</p>
              </div>
              <div style={{ marginBottom: 12 }}>
                <span style={{ fontSize: 11, opacity: 0.6, fontWeight: 600 }}>GENERATION PROMPT (excerpt)</span>
                <p style={{ fontSize: 11, marginTop: 4, opacity: 0.75, lineHeight: 1.6, maxHeight: 120, overflow: "hidden" }}>
                  {product.prompt.substring(0, 300)}…
                </p>
              </div>
              <div>
                <span style={{ fontSize: 11, opacity: 0.6, fontWeight: 600 }}>NEGATIVE PROMPT</span>
                <p style={{ fontSize: 11, marginTop: 2, opacity: 0.75, fontStyle: "italic" }}>{product.negativePrompt}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
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
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
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
