"use client";

export default function Footer() {
  return (
    <footer style={{
      background: "#0D1A18",
      padding: "40px 32px",
      color: "rgba(255,255,255,0.4)",
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: "var(--font-body)", fontWeight: 800, fontSize: 18, color: "#fff" }}>
            <span style={{ color: "var(--swish-green)" }}>*</span>swish
          </span>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Asian Category Launch — Visual Merchandising Assignment</span>
        </div>
        <div style={{ display: "flex", gap: 24, fontSize: 12, fontWeight: 500 }}>
          {[
            { label: "THE LAUNCH", id: "launch" },
            { label: "THE LOOK", id: "look" },
            { label: "THE MENU", id: "menu" },
            { label: "THE APP", id: "app" },
            { label: "THE PROCESS", id: "process" },
          ].map(link => (
            <button
              key={link.id}
              onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "1px", fontWeight: 600, transition: "color 0.2s" }}
              onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = "#fff")}
              onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.4)")}
            >
              {link.label}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          This is a conceptual prototype. Not connected to the Swish backend. All images are original work by Bhavika Kumar.
        </p>
      </div>
    </footer>
  );
}
