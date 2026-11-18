"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { products } from "@/lib/products";

type Screen = "category" | "product" | "cart";
type CartItem = { id: string; name: string; qty: number; image: string | null };

const productMeta: Record<string, { portionTag: string; subcategory: string; protein: string; cuisineTag: string }> = {
  "veg-pad-thai":             { portionTag: "Serves 1", subcategory: "noodles", protein: "18g Protein", cuisineTag: "Asian" },
  "chicken-pad-thai":         { portionTag: "Serves 1", subcategory: "noodles", protein: "18g Protein", cuisineTag: "Asian" },
  "veg-green-thai-curry":     { portionTag: "Serves 1", subcategory: "curries", protein: "18g Protein", cuisineTag: "Thai" },
  "chicken-green-thai-curry": { portionTag: "Serves 1", subcategory: "curries", protein: "35g Protein", cuisineTag: "Thai" },
  "veg-combo":                { portionTag: "Serves 2", subcategory: "combos",  protein: "Combo Meal",  cuisineTag: "Thai Cuisine" },
};

const prices: Record<string, number> = {
  "veg-pad-thai": 299, "chicken-pad-thai": 299,
  "veg-green-thai-curry": 329, "chicken-green-thai-curry": 379, "veg-combo": 499,
};

function VegDot({ isVeg, size = 16 }: { isVeg: boolean; size?: number }) {
  return (
    <div style={{
      width: size,
      height: size,
      border: `1.5px solid ${isVeg ? "#2E7D32" : "#C62828"}`,
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      background: "#fff",
    }}>
      {isVeg ? (
        <div style={{ width: size * 0.5, height: size * 0.5, borderRadius: "50%", background: "#2E7D32" }} />
      ) : (
        <div style={{
          width: 0, height: 0,
          borderLeft: `${size * 0.28}px solid transparent`,
          borderRight: `${size * 0.28}px solid transparent`,
          borderBottom: `${size * 0.52}px solid #C62828`,
        }} />
      )}
    </div>
  );
}

function StatusBar({ time }: { time: string }) {
  return (
    <div style={{
      height: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      paddingTop: 10,
      background: "#f0faf3",
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 14, fontWeight: 700, color: "#000", letterSpacing: "-0.3px" }}>{time}</span>
      <div style={{ width: 106, height: 32, background: "#000", borderRadius: 16, position: "absolute", left: "50%", transform: "translateX(-50%)", top: 16 }} />
      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
        {/* Signal */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <rect x="0" y="8" width="3" height="4" rx="1" fill="#000"/>
          <rect x="4.5" y="5" width="3" height="7" rx="1" fill="#000"/>
          <rect x="9" y="2" width="3" height="10" rx="1" fill="#000"/>
          <rect x="13.5" y="0" width="3" height="12" rx="1" fill="#000" opacity="0.3"/>
        </svg>
        {/* WiFi */}
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
          <path d="M8 9.5a1 1 0 100 2 1 1 0 000-2z" fill="#000"/>
          <path d="M5.5 7.5C6.2 6.8 7 6.5 8 6.5s1.8.3 2.5 1" stroke="#000" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M3 5C4.3 3.7 6 3 8 3s3.7.7 5 2" stroke="#000" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M0.5 2.5C2.3.9 5 0 8 0s5.7.9 7.5 2.5" stroke="#000" strokeWidth="1.3" strokeLinecap="round"/>
        </svg>
        {/* Battery */}
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#000" strokeOpacity="0.35"/>
          <rect x="2" y="2" width="11" height="8" rx="1.5" fill="#33C362"/>
          <path d="M23 4V8c1.1-.5 1.1-3.5 0-4z" fill="#000" opacity="0.4"/>
        </svg>
      </div>
    </div>
  );
}

function SearchBar({ vegFilter, setVegFilter }: { vegFilter: boolean; setVegFilter: (v: boolean) => void }) {
  return (
    <div style={{ background: "#f0faf3", padding: "8px 12px 10px", flexShrink: 0 }}>
      <div style={{
        background: "#fff",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        padding: "7px 10px",
        gap: 6,
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      }}>
        {/* Back arrow */}
        <svg width="8" height="13" viewBox="0 0 8 13" fill="none" style={{ flexShrink: 0 }}>
          <path d="M6.5 1.5L1.5 6.5L6.5 11.5" stroke="#33C362" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {/* Search text */}
        <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#1A1A1A" }}>Asian</span>
        {/* Clear × */}
        <div style={{ width: 18, height: 18, borderRadius: "50%", background: "#E0E0E0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <span style={{ fontSize: 10, color: "#666", lineHeight: 1 }}>✕</span>
        </div>
        {/* Divider */}
        <div style={{ width: 1, height: 18, background: "#E0E0E0" }} />
        {/* VEG toggle */}
        <button
          onClick={() => setVegFilter(!vegFilter)}
          style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 0, flexShrink: 0 }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, color: vegFilter ? "#33C362" : "#666" }}>VEG</span>
          <div style={{ width: 28, height: 16, background: vegFilter ? "#33C362" : "#ccc", borderRadius: 8, position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
            <div style={{
              position: "absolute", width: 12, height: 12, background: "#fff", borderRadius: "50%",
              top: 2, left: vegFilter ? 14 : 2, transition: "left 0.2s",
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }} />
          </div>
        </button>
      </div>
    </div>
  );
}

function CategoryTabs({ active, setActive }: { active: string; setActive: (c: string) => void }) {
  const tabs = [
    { id: "all", label: "All Items", type: "starburst" },
    { id: "noodles", label: "Noodles", img: "/images/products/veg-pad-thai.webp" },
    { id: "curries", label: "Curries", img: "/images/products/veg-green-thai-curry-v2.webp" },
    { id: "combos", label: "Combos", emoji: "🍱" },
  ];

  return (
    <div style={{ background: "#f0faf3", flexShrink: 0 }}>
      <div style={{ display: "flex", overflowX: "auto", padding: "4px 12px 0", gap: 4, scrollbarWidth: "none" }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              background: "none", border: "none", cursor: "pointer",
              padding: "6px 10px 0", flexShrink: 0, minWidth: 56,
            }}
          >
            {/* Icon */}
            {tab.type === "starburst" ? (
              <div style={{ width: 36, height: 36, position: "relative" }}>
                <svg viewBox="0 0 36 36" width="36" height="36">
                  <path d="M18 1L20.5 11.5L31 7L26.5 17.5L36 18L26.5 18.5L31 29L20.5 24.5L18 35L15.5 24.5L5 29L9.5 18.5L0 18L9.5 17.5L5 7L15.5 11.5Z" fill="#33C362"/>
                </svg>
              </div>
            ) : tab.img ? (
              <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", position: "relative", border: "1.5px solid #E0E0E0" }}>
                <Image src={tab.img} alt={tab.label} fill style={{ objectFit: "cover" }} sizes="36px" />
              </div>
            ) : (
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#E8F5E9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
                {tab.emoji}
              </div>
            )}
            {/* Label */}
            <span style={{
              fontSize: 10,
              fontWeight: active === tab.id ? 700 : 500,
              color: active === tab.id ? "#33C362" : "#555",
              letterSpacing: "-0.2px",
            }}>
              {tab.label}
            </span>
            {/* Active underline */}
            {active === tab.id && (
              <div style={{ width: "100%", height: 2, background: "#33C362", borderRadius: 1 }} />
            )}
            {active !== tab.id && <div style={{ height: 2 }} />}
          </button>
        ))}
      </div>
      <div style={{ height: 1, background: "#E8E8E8", margin: "0 0" }} />
    </div>
  );
}

function ProductCard({ product, qty, onAdd, onDec, onSelectProduct, showOriginal }: {
  product: typeof products[0];
  qty: number;
  onAdd: () => void;
  onDec: () => void;
  onSelectProduct: () => void;
  showOriginal: boolean;
}) {
  const meta = productMeta[product.id];
  const img = showOriginal && product.rawImage ? product.rawImage : product.heroImage;

  return (
    <div style={{ flex: "0 0 calc(50% - 5px)", background: "#fff", borderRadius: 12, overflow: "hidden" }}>
      {/* Image square */}
      <div
        style={{ position: "relative", paddingTop: "100%", background: "#F5F0E8", cursor: "pointer" }}
        onClick={onSelectProduct}
      >
        {img ? (
          <Image src={img} alt={product.name} fill style={{ objectFit: "cover" }} sizes="150px" />
        ) : (
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
            <span style={{ fontSize: 24, opacity: 0.3 }}>🍜</span>
            <span style={{ fontSize: 7, color: "#aaa", fontWeight: 600, textAlign: "center", padding: "0 4px" }}>Coming Soon</span>
          </div>
        )}

        {/* "New" badge — top left */}
        <div style={{
          position: "absolute", top: 7, left: 7,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 20, padding: "2px 7px",
          display: "flex", alignItems: "center", gap: 3,
          boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
        }}>
          <span style={{ color: "#33C362", fontSize: 7 }}>★</span>
          <span style={{ fontSize: 8, fontWeight: 700, color: "#1A1A1A" }}>New</span>
        </div>

        {/* Veg/nonveg indicator — bottom left */}
        <div style={{ position: "absolute", bottom: 7, left: 7 }}>
          <VegDot isVeg={product.category === "veg"} size={16} />
        </div>

        {/* Add / Stepper — bottom right */}
        <div style={{ position: "absolute", bottom: 7, right: 7 }}>
          {qty === 0 ? (
            <button
              onClick={e => { e.stopPropagation(); onAdd(); }}
              style={{
                background: "#fff",
                border: "1px solid #E0E0E0",
                borderRadius: 7,
                padding: "5px 9px",
                display: "flex", alignItems: "center", gap: 3,
                cursor: "pointer",
                boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: "#33C362" }}>Add</span>
              <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                <path d="M1 1.5L4 4.5L7 1.5" stroke="#33C362" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <div style={{
              background: "#33C362", borderRadius: 7,
              display: "flex", alignItems: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
            }}>
              <button
                onClick={e => { e.stopPropagation(); onDec(); }}
                style={{ background: "none", border: "none", color: "#fff", fontWeight: 900, fontSize: 14, cursor: "pointer", padding: "5px 7px", lineHeight: 1 }}
              >−</button>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 12, minWidth: 14, textAlign: "center" }}>{qty}</span>
              <button
                onClick={e => { e.stopPropagation(); onAdd(); }}
                style={{ background: "none", border: "none", color: "#fff", fontWeight: 900, fontSize: 14, cursor: "pointer", padding: "5px 7px", lineHeight: 1 }}
              >+</button>
            </div>
          )}
        </div>
      </div>

      {/* Below-image info */}
      <div style={{ padding: "7px 8px 9px" }}>
        {/* Portion tag */}
        <div style={{ display: "flex", gap: 4, marginBottom: 5, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 9, fontWeight: 600, color: "#666",
            border: "1px solid #E0E0E0", borderRadius: 20,
            padding: "1px 7px", display: "inline-block",
          }}>
            {meta?.portionTag ?? "Serves 1"}
          </span>
        </div>
        {/* Product name */}
        <div style={{
          fontSize: 11, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.4, marginBottom: 3,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
        }}>
          {product.shortName}
        </div>
        {/* Key ingredients as description */}
        <div style={{
          fontSize: 9, color: "#999", lineHeight: 1.4,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
        }}>
          {product.keyIngredients.slice(0, 3).join(", ")}
        </div>
      </div>
    </div>
  );
}

function useDragScroll() {
  const el = useRef<HTMLDivElement>(null);
  const drag = useRef({ on: false, startY: 0, startScroll: 0, moved: false });

  const onMouseDown = (e: React.MouseEvent) => {
    if (!el.current) return;
    e.preventDefault(); // stops browser image-drag ghost
    drag.current = { on: true, startY: e.clientY, startScroll: el.current.scrollTop, moved: false };
    el.current.style.userSelect = "none";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!drag.current.on || !el.current) return;
    const dy = drag.current.startY - e.clientY;
    if (Math.abs(dy) > 4) drag.current.moved = true;
    el.current.scrollTop = drag.current.startScroll + dy;
  };
  const stop = () => {
    if (el.current) el.current.style.userSelect = "";
    drag.current.on = false;
    setTimeout(() => { drag.current.moved = false; }, 0);
  };
  const didDrag = () => drag.current.moved;

  return { ref: el, props: { onMouseDown, onMouseMove, onMouseUp: stop, onMouseLeave: stop }, didDrag };
}

function CategoryScreen({ vegFilter, setVegFilter, activeCategory, setActiveCategory, onSelectProduct, cart, onUpdateCart, showOriginal }: {
  vegFilter: boolean;
  setVegFilter: (v: boolean) => void;
  activeCategory: string;
  setActiveCategory: (c: string) => void;
  onSelectProduct: (p: typeof products[0]) => void;
  cart: CartItem[];
  onUpdateCart: (c: CartItem[]) => void;
  showOriginal: boolean;
}) {
  const scroll = useDragScroll();

  const filtered = products
    .filter(p => vegFilter ? p.category === "veg" : true)
    .filter(p => activeCategory === "all" || productMeta[p.id]?.subcategory === activeCategory);

  const getQty = (id: string) => cart.find(c => c.id === id)?.qty ?? 0;

  const addItem = (product: typeof products[0]) => {
    const existing = cart.find(c => c.id === product.id);
    if (!existing) {
      onUpdateCart([...cart, { id: product.id, name: product.shortName, qty: 1, image: product.heroImage }]);
    } else {
      onUpdateCart(cart.map(c => c.id === product.id ? { ...c, qty: c.qty + 1 } : c));
    }
  };

  const decItem = (product: typeof products[0]) => {
    const existing = cart.find(c => c.id === product.id);
    if (!existing) return;
    if (existing.qty <= 1) {
      onUpdateCart(cart.filter(c => c.id !== product.id));
    } else {
      onUpdateCart(cart.map(c => c.id === product.id ? { ...c, qty: c.qty - 1 } : c));
    }
  };

  return (
    <div ref={scroll.ref} {...scroll.props} style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", background: "#f0faf3" }}>
      <SearchBar vegFilter={vegFilter} setVegFilter={setVegFilter} />
      <CategoryTabs active={activeCategory} setActive={setActiveCategory} />

      {/* Product grid */}
      <div style={{ padding: "10px", display: "flex", flexWrap: "wrap", gap: "10px", flex: 1 }}>
        {filtered.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            qty={getQty(product.id)}
            onAdd={() => addItem(product)}
            onDec={() => decItem(product)}
            onSelectProduct={() => { if (!scroll.didDrag()) onSelectProduct(product); }}
            showOriginal={showOriginal}
          />
        ))}
        {filtered.length === 0 && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <span style={{ fontSize: 11, color: "#aaa" }}>No items match filter</span>
          </div>
        )}
      </div>

      {/* Promo strip */}
      <div style={{
        background: "#33C362", padding: "9px 14px",
        display: "flex", alignItems: "center", gap: 8, flexShrink: 0,
      }}>
        <div style={{
          width: 24, height: 24, borderRadius: "50%", background: "rgba(0,0,0,0.15)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <span style={{ fontSize: 12 }}>✦</span>
        </div>
        <div>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#fff" }}>New Category Launch </span>
          <span style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>| Asian · 5 Thai Dishes</span>
        </div>
      </div>
    </div>
  );
}

function ProductDetailScreen({ product, cart, onUpdateCart, onBack, showOriginal }: {
  product: typeof products[0];
  cart: CartItem[];
  onUpdateCart: (c: CartItem[]) => void;
  onBack: () => void;
  showOriginal: boolean;
}) {
  const scroll = useDragScroll();
  const qty = cart.find(c => c.id === product.id)?.qty ?? 0;
  const img = showOriginal && product.rawImage ? product.rawImage : product.heroImage;
  const totalCartItems = cart.reduce((s, c) => s + c.qty, 0);
  const price = prices[product.id] ?? 299;
  const meta = productMeta[product.id];
  const related = products.filter(p => p.id !== product.id);

  const updateQty = (delta: number) => {
    const existing = cart.find(c => c.id === product.id);
    if (!existing && delta > 0) {
      onUpdateCart([...cart, { id: product.id, name: product.shortName, qty: 1, image: product.heroImage }]);
    } else if (existing) {
      const newQty = existing.qty + delta;
      if (newQty <= 0) onUpdateCart(cart.filter(c => c.id !== product.id));
      else onUpdateCart(cart.map(c => c.id === product.id ? { ...c, qty: newQty } : c));
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: "#fff" }}>
      {/* Scrollable content */}
      <div ref={scroll.ref} {...scroll.props} style={{ flex: 1, overflowY: "auto" }}>
        {/* Hero image */}
        <div style={{ position: "relative", height: 230, background: "#F5F0E8", flexShrink: 0 }}>
          {img ? (
            <Image src={img} alt={product.name} fill style={{ objectFit: "cover", objectPosition: "center 25%" }} sizes="400px" />
          ) : (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 48, opacity: 0.2 }}>🍜</span>
            </div>
          )}
          <button
            onClick={onBack}
            style={{
              position: "absolute", top: 12, left: 12,
              background: "rgba(255,255,255,0.88)", border: "none", borderRadius: "50%",
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: "0 1px 8px rgba(0,0,0,0.18)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2.5L4.5 7L9 11.5" stroke="#1A1A1A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Detail content */}
        <div style={{ padding: "14px 16px 20px", background: "#fff" }}>
          {/* Tags row */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
            <VegDot isVeg={product.category === "veg"} size={20} />
            <span style={{ fontSize: 10, fontWeight: 500, color: "#555", border: "1px solid #ccc", borderRadius: 20, padding: "2px 9px" }}>
              {meta?.portionTag ?? "Serves 1"}
            </span>
            <span style={{ fontSize: 10, fontWeight: 500, color: "#7A5C2E", border: "1px solid #C9A96E", borderRadius: 20, padding: "2px 9px", background: "#FBF5EC" }}>
              {meta?.protein ?? "18g Protein"}
            </span>
            <span style={{ fontSize: 10, fontWeight: 500, color: "#1E7D40", border: "1.5px solid #33C362", borderRadius: 20, padding: "2px 9px" }}>
              {meta?.cuisineTag ?? "Asian"}
            </span>
          </div>

          {/* Name */}
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#1A1A1A", lineHeight: 1.2, marginBottom: 10 }}>{product.name}</h2>

          {/* Description */}
          <p style={{ fontSize: 12, color: "#444", lineHeight: 1.65, marginBottom: 14 }}>{product.description}</p>

          {/* Price */}
          <div style={{ fontSize: 20, fontWeight: 800, color: "#1A1A1A", marginBottom: 10 }}>₹{price}</div>

          {/* View dish details */}
          <div style={{ fontSize: 12, fontWeight: 600, color: "#33C362", marginBottom: 20, display: "flex", alignItems: "center", gap: 4 }}>
            View dish details
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 4.5L6 8L10 4.5" stroke="#33C362" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* People also bought */}
          {related.length > 0 && (
            <div>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1A1A1A", marginBottom: 12 }}>People also bought</h3>
              <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none", paddingBottom: 4 }}>
                {related.map(p => (
                  <div key={p.id} style={{ flex: "0 0 90px" }}>
                    <div style={{ position: "relative", height: 90, borderRadius: 8, overflow: "hidden", background: "#F5F0E8" }}>
                      {p.heroImage && <Image src={p.heroImage} alt={p.shortName} fill style={{ objectFit: "cover" }} sizes="90px" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sticky bottom CTA bar */}
      <div style={{
        display: "flex", gap: 10, padding: "10px 12px 12px",
        borderTop: "1px solid #F0F0F0", background: "#fff", flexShrink: 0,
      }}>
        {/* Cart count pill */}
        <button
          style={{
            display: "flex", alignItems: "center", gap: 7,
            border: "1.5px solid #33C362", borderRadius: 10, background: "#fff",
            padding: "0 14px", cursor: "pointer", flexShrink: 0,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M1 1H4L5.68 10.39C5.77 10.9 6.14 11.33 6.63 11.5L18 14.5L19 8H7" stroke="#33C362" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.5" cy="17" r="1.5" fill="#33C362"/>
            <circle cx="16.5" cy="17" r="1.5" fill="#33C362"/>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#33C362" }}>Cart + {totalCartItems}</span>
        </button>

        {/* Add to cart */}
        <button
          onClick={() => updateQty(1)}
          style={{
            flex: 1, background: "#33C362", color: "#fff", border: "none",
            borderRadius: 10, padding: "13px", fontWeight: 700, fontSize: 12, cursor: "pointer",
          }}
        >
          Add to Cart + ₹{price}
        </button>
      </div>
    </div>
  );
}

function CartScreen({ cart, onUpdateCart }: { cart: CartItem[]; onUpdateCart: (c: CartItem[]) => void }) {
  const scroll = useDragScroll();

  const updateQty = (id: string, delta: number) => {
    const item = cart.find(c => c.id === id);
    if (!item) return;
    const newQty = item.qty + delta;
    if (newQty <= 0) onUpdateCart(cart.filter(c => c.id !== id));
    else onUpdateCart(cart.map(c => c.id === id ? { ...c, qty: newQty } : c));
  };

  if (cart.length === 0) {
    return (
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 40, gap: 14, background: "#F5F5F5" }}>
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none" opacity="0.25">
          <path d="M4 4H9L11.72 25.95C11.9 27.37 13.1 28.5 14.54 28.5H42C43.4 28.5 44.58 27.42 44.8 26.03L47 11H15" stroke="#1A1A1A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="20" cy="38" r="3" fill="#1A1A1A"/><circle cx="38" cy="38" r="3" fill="#1A1A1A"/>
        </svg>
        <p style={{ fontSize: 12, color: "#888", textAlign: "center", lineHeight: 1.5 }}>Your cart is empty.<br/>Add some Asian dishes!</p>
      </div>
    );
  }

  const totalItems = cart.reduce((s, c) => s + c.qty, 0);
  const subtotal = cart.reduce((s, c) => s + (prices[c.id] ?? 0) * c.qty, 0);
  const couponDiscount = 50;
  const deliverySavings = 9;
  const payTotal = subtotal - couponDiscount;
  const suggested = products.filter(p => !cart.find(c => c.id === p.id)).slice(0, 3);

  return (
    <div ref={scroll.ref} {...scroll.props} style={{ flex: 1, overflowY: "auto", background: "#F0F0F0" }}>

      {/* ── Savings banner ── */}
      <div style={{ background: "#F3ECFF", padding: "7px 14px", display: "flex", alignItems: "center", gap: 5 }}>
        <span style={{ color: "#7B2FBE", fontSize: 11 }}>✦</span>
        <span style={{ fontSize: 10, fontWeight: 600, color: "#7B2FBE" }}>
          You saved ₹{couponDiscount + deliverySavings} on this order + FREE Delivery
        </span>
      </div>

      {/* ── Cart items card ── */}
      <div style={{ background: "#fff", marginBottom: 6 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 14px 8px" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1A1A1A" }}>{totalItems} item{totalItems !== 1 ? "s" : ""}</span>
          <button
            onClick={() => onUpdateCart([])}
            style={{ background: "none", border: "none", fontSize: 11, fontWeight: 600, color: "#1A1A1A", cursor: "pointer", textDecoration: "underline", padding: 0 }}
          >Clear</button>
        </div>

        {cart.map((item, idx) => (
          <div key={item.id} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "8px 14px",
            borderTop: idx > 0 ? "1px solid #F5F5F5" : "none",
          }}>
            {/* Image */}
            <div style={{ position: "relative", width: 52, height: 52, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#F5F0E8" }}>
              {item.image && <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} sizes="52px" />}
            </div>
            {/* Name + customize */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
              <div style={{ fontSize: 9, color: "#888", marginTop: 2 }}>Customize ▾</div>
            </div>
            {/* Price */}
            <span style={{ fontSize: 11, fontWeight: 700, color: "#1A1A1A", flexShrink: 0 }}>₹{(prices[item.id] ?? 0) * item.qty}</span>
            {/* Stepper — green outlined */}
            <div style={{ display: "flex", alignItems: "center", border: "1.5px solid #33C362", borderRadius: 7, overflow: "hidden", flexShrink: 0 }}>
              <button
                onClick={() => updateQty(item.id, -1)}
                style={{ background: "none", border: "none", padding: "4px 7px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                {item.qty === 1 ? (
                  <svg width="10" height="11" viewBox="0 0 10 11" fill="none">
                    <path d="M1 2.5h8M3.5 2.5V1.5h3V2.5M4 5v3M6 5v3M1.5 2.5l.5 7h6l.5-7" stroke="#33C362" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <span style={{ fontSize: 13, fontWeight: 900, color: "#33C362", lineHeight: 1 }}>−</span>
                )}
              </button>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#33C362", minWidth: 14, textAlign: "center" }}>{item.qty}</span>
              <button
                onClick={() => updateQty(item.id, 1)}
                style={{ background: "none", border: "none", padding: "4px 7px", cursor: "pointer" }}
              >
                <span style={{ fontSize: 13, fontWeight: 900, color: "#33C362", lineHeight: 1 }}>+</span>
              </button>
            </div>
          </div>
        ))}
        <div style={{ height: 10 }} />
      </div>

      {/* ── You might also like ── */}
      {suggested.length > 0 && (
        <div style={{ background: "#fff", marginBottom: 6, padding: "12px 14px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1A1A1A", marginBottom: 10 }}>You might also like this</div>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", scrollbarWidth: "none" }}>
            {suggested.map(p => (
              <div key={p.id} style={{ flex: "0 0 88px" }}>
                <div style={{ position: "relative", height: 88, borderRadius: 8, overflow: "hidden", background: "#F5F0E8", marginBottom: 5 }}>
                  {p.heroImage && <Image src={p.heroImage} alt={p.shortName} fill style={{ objectFit: "cover" }} sizes="88px" />}
                  {/* Bestseller badge */}
                  <div style={{ position: "absolute", top: 5, left: 5, background: "#fff", borderRadius: 20, padding: "1px 5px", display: "flex", alignItems: "center", gap: 3 }}>
                    <span style={{ color: "#33C362", fontSize: 7 }}>★</span>
                    <span style={{ fontSize: 7, fontWeight: 700, color: "#1A1A1A" }}>Bestseller</span>
                  </div>
                  {/* Veg dot bottom-left */}
                  <div style={{ position: "absolute", bottom: 5, left: 5 }}>
                    <VegDot isVeg={p.category === "veg"} size={13} />
                  </div>
                  {/* Add button bottom-right */}
                  <button style={{
                    position: "absolute", bottom: 5, right: 5,
                    background: "#fff", border: "1.5px solid #33C362", borderRadius: 6,
                    padding: "2px 7px", fontSize: 9, fontWeight: 700, color: "#33C362", cursor: "pointer",
                  }}>Add</button>
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: "#1A1A1A", lineHeight: 1.3, marginBottom: 2 }}>{p.shortName}</div>
                <div style={{ fontSize: 8, color: "#888", marginBottom: 2 }}>Serves 1</div>
                <div style={{ fontSize: 10, fontWeight: 800, color: "#1A1A1A" }}>₹{prices[p.id] ?? 249}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Best offer applied ── */}
      <div style={{ background: "#fff", marginBottom: 6, overflow: "hidden" }}>
        <div style={{ background: "#33C362", padding: "6px 14px", textAlign: "center" }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: "#fff" }}>Best offer applied!</span>
        </div>
        <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 20, height: 20, borderRadius: "50%", background: "#33C362",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          }}>
            <span style={{ fontSize: 10, color: "#fff", fontWeight: 900 }}>✓</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1A1A" }}>You saved ₹{couponDiscount} with &apos;SAVE50&apos;</div>
            <div style={{ fontSize: 9, color: "#33C362", marginTop: 2 }}>View all coupons &rsaquo;</div>
          </div>
          <button style={{
            background: "#fff", border: "1.5px solid #ccc", borderRadius: 6,
            padding: "4px 10px", fontSize: 10, fontWeight: 700, color: "#1A1A1A", cursor: "pointer",
          }}>Remove</button>
        </div>
        <div style={{ padding: "0 14px 10px", fontSize: 8.5, color: "#999" }}>
          ⓘ Coupons/Rewards are applicable only on Swish food &amp; beverages
        </div>
      </div>

      {/* ── Cashback row ── */}
      <div style={{ background: "#fff", marginBottom: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%", background: "#E8F5E9",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
          border: "1.5px solid #33C362",
        }}>
          <span style={{ fontSize: 12, color: "#33C362", fontWeight: 800 }}>₹</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#33C362" }}>Get ₹28 extra cashback</div>
          <div style={{ fontSize: 9, color: "#888", marginTop: 1 }}>Top up &amp; save with Swish Money</div>
        </div>
        <button style={{ background: "none", border: "none", fontSize: 11, fontWeight: 700, color: "#33C362", cursor: "pointer", padding: 0 }}>
          Add money
        </button>
      </div>

      {/* ── Pay button ── */}
      <div style={{ padding: "10px 14px 14px" }}>
        <button style={{
          width: "100%", background: "#33C362", color: "#fff", border: "none",
          borderRadius: 10, padding: "13px", fontWeight: 800, fontSize: 13, cursor: "pointer",
        }}>
          Pay ₹{payTotal}
        </button>
      </div>
    </div>
  );
}

function AppHeader({ cartCount, onCartClick, currentScreen, onBack }: {
  cartCount: number;
  onCartClick: () => void;
  currentScreen: Screen;
  onBack: () => void;
}) {
  if (currentScreen === "category" || currentScreen === "product") return null;
  return (
    <div style={{
      padding: "10px 14px", background: "#fff",
      borderBottom: "1px solid #F0F0F0",
      display: "flex", alignItems: "center", gap: 10, flexShrink: 0,
    }}>
      <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", padding: "2px 6px 2px 0", display: "flex" }}>
        <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
          <path d="M6.5 1.5L1.5 6.5L6.5 11.5" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <span style={{ fontWeight: 700, fontSize: 13, color: "#1A1A1A", flex: 1 }}>
        Your Cart
      </span>
    </div>
  );
}

function BottomNav({ screen, setScreen, cartCount }: { screen: Screen; setScreen: (s: Screen) => void; cartCount: number }) {
  return (
    <div style={{ display: "flex", background: "#fff", borderTop: "1px solid #F0F0F0", paddingBottom: 18, flexShrink: 0 }}>
      {[
        { id: "category" as Screen, label: "Home", icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 8.5L10 2.5L17 8.5V17H13V13H7V17H3V8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
        )},
        { id: "cart" as Screen, label: "Cart", icon: (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M1 1H4L5.68 10.39C5.77 10.9 6.14 11.33 6.63 11.5L18 14.5L19 8H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="8.5" cy="17" r="1.5" fill="currentColor"/>
            <circle cx="16.5" cy="17" r="1.5" fill="currentColor"/>
          </svg>
        )},
      ].map(tab => (
        <button
          key={tab.id}
          onClick={() => setScreen(tab.id)}
          style={{
            flex: 1, background: "none", border: "none", padding: "10px 0 4px",
            cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: screen === tab.id ? "#33C362" : "#bbb", position: "relative",
          }}
        >
          {tab.icon}
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.3px" }}>{tab.label}</span>
          {screen === tab.id && <div style={{ width: 20, height: 2, background: "#33C362", borderRadius: 1, position: "absolute", bottom: 0 }} />}
          {tab.id === "cart" && cartCount > 0 && screen !== "cart" && (
            <div style={{
              position: "absolute", top: 7, right: "calc(50% - 14px)",
              background: "#33C362", color: "#fff", borderRadius: "50%",
              width: 14, height: 14, fontSize: 8, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>{cartCount}</div>
          )}
        </button>
      ))}
    </div>
  );
}

export default function InteractivePhone() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [screen, setScreen] = useState<Screen>("category");
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [vegFilter, setVegFilter] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showOriginal, setShowOriginal] = useState(false);
  const [time, setTime] = useState("9:41");

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTime(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSelectProduct = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setScreen("product");
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <section
      id="app"
      ref={ref}
      style={{
        background: "var(--warm-white)",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "60px 48px",
      }}
    >
      <div style={{
        maxWidth: 1280,
        margin: "0 auto",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "1fr 1.55fr",
        gap: "clamp(40px, 5vw, 80px)",
        alignItems: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}>

        {/* ── LEFT: Header text ── */}
        <div>
          <div style={{
            fontWeight: 700, fontSize: 11, letterSpacing: "3px",
            color: "var(--swish-green)", marginBottom: 20,
          }}>
            04 — THE APP
          </div>
          <h2 style={{
            fontFamily: "var(--font-body)", fontWeight: 900,
            fontSize: "clamp(26px, 3.2vw, 48px)", lineHeight: 1.05,
            letterSpacing: "-1.5px", color: "var(--jade)", marginBottom: 20,
          }}>
            NOT JUST A<br />PRETTY PICTURE.<br />
            <span style={{ color: "var(--swish-green)" }}>A PRODUCT<br />THAT SELLS.</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--muted-text)", lineHeight: 1.7, maxWidth: 360 }}>
            See how the new Asian category lives inside the Swish experience. Fully interactive — tap products, add to cart, filter by diet.
          </p>
        </div>

        {/* ── RIGHT: Phone + toggle ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* Raw / Final toggle pill */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: "var(--muted-text)", letterSpacing: "0.3px" }}>Image</span>
            <div style={{ display: "flex", background: "rgba(0,0,0,0.07)", borderRadius: 24, padding: 3 }}>
              {[
                { val: false, label: "Final" },
                { val: true,  label: "Raw" },
              ].map(opt => (
                <button
                  key={String(opt.val)}
                  onClick={() => setShowOriginal(opt.val)}
                  style={{
                    padding: "5px 18px", borderRadius: 21, border: "none",
                    background: showOriginal === opt.val ? "#fff" : "transparent",
                    color: showOriginal === opt.val ? "var(--jade)" : "#999",
                    fontFamily: "var(--font-body)", fontWeight: 700, fontSize: 11,
                    cursor: "pointer", transition: "all 0.18s",
                    boxShadow: showOriginal === opt.val ? "0 1px 6px rgba(0,0,0,0.14)" : "none",
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* iPhone 16 Pro Max frame */}
          <div style={{ position: "relative" }}>
            {/* Ground shadow */}
            <div style={{
              position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)",
              width: "65%", height: 36,
              background: "radial-gradient(ellipse, rgba(0,0,0,0.28) 0%, transparent 72%)",
              filter: "blur(14px)",
            }} />

            {/* Phone body — Space Black titanium */}
            <div style={{
              width: 310,
              height: 670,
              background: "linear-gradient(160deg, #3A3A3C 0%, #1C1C1E 35%, #28282A 70%, #1C1C1E 100%)",
              borderRadius: 56,
              padding: 11,
              position: "relative",
              boxShadow: [
                "0 0 0 1px #0A0A0A",
                "inset 0 0 0 1px rgba(255,255,255,0.12)",
                "0 50px 100px rgba(0,0,0,0.55)",
                "0 20px 44px rgba(0,0,0,0.35)",
                "0 4px 12px rgba(0,0,0,0.25)",
              ].join(", "),
            }}>
              {/* Action button (top-left, small) */}
              <div style={{ position: "absolute", left: -3.5, top: 100, width: 3.5, height: 32, background: "#2C2C2E", borderRadius: "3px 0 0 3px", boxShadow: "inset -1px 0 0 rgba(255,255,255,0.08)" }} />
              {/* Volume up */}
              <div style={{ position: "absolute", left: -3.5, top: 152, width: 3.5, height: 54, background: "#2C2C2E", borderRadius: "3px 0 0 3px", boxShadow: "inset -1px 0 0 rgba(255,255,255,0.08)" }} />
              {/* Volume down */}
              <div style={{ position: "absolute", left: -3.5, top: 220, width: 3.5, height: 54, background: "#2C2C2E", borderRadius: "3px 0 0 3px", boxShadow: "inset -1px 0 0 rgba(255,255,255,0.08)" }} />
              {/* Power / Side button */}
              <div style={{ position: "absolute", right: -3.5, top: 182, width: 3.5, height: 82, background: "#2C2C2E", borderRadius: "0 3px 3px 0", boxShadow: "inset 1px 0 0 rgba(255,255,255,0.08)" }} />

              {/* Screen */}
              <div style={{
                width: "100%", height: "100%", background: "#f0faf3",
                borderRadius: 46, overflow: "hidden",
                display: "flex", flexDirection: "column",
              }}>
                <StatusBar time={time} />
                <AppHeader
                  cartCount={cartCount}
                  onCartClick={() => setScreen("cart")}
                  currentScreen={screen}
                  onBack={() => { setScreen("category"); setSelectedProduct(null); }}
                />
                {screen === "category" && (
                  <CategoryScreen
                    vegFilter={vegFilter}
                    setVegFilter={setVegFilter}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    onSelectProduct={handleSelectProduct}
                    cart={cart}
                    onUpdateCart={setCart}
                    showOriginal={showOriginal}
                  />
                )}
                {screen === "product" && selectedProduct && (
                  <ProductDetailScreen
                    product={selectedProduct}
                    cart={cart}
                    onUpdateCart={setCart}
                    onBack={() => { setScreen("category"); setSelectedProduct(null); }}
                    showOriginal={showOriginal}
                  />
                )}
                {screen === "cart" && (
                  <CartScreen cart={cart} onUpdateCart={setCart} />
                )}
                <BottomNav screen={screen} setScreen={setScreen} cartCount={cartCount} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
