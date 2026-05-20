import { useState, useEffect } from "react";
import { BookOpen, ArrowRight, Menu, X, MoveRight } from "lucide-react";

const NAV_LINKS = [
  { label: "Katalog", href: "/katalog" },
  { label: "Layanan", href: "#layanan" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 64,
          background: "white",
          borderBottom: "1px solid #ede5da",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.08)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Inner container — sama lebar dengan konten Hero */}
        <div style={{
          maxWidth: 1152,
          margin: "0 auto",
          padding: "0 48px",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
        }} className="nav-inner">

        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            background: "#eb6935",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <BookOpen size={17} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 16, color: "#1a110a", letterSpacing: "-0.3px" }}>
            TIDUR<span style={{ color: "#eb6935" }}>+</span>
          </span>
        </a>

        {/* Desktop links — absolute center */}
        <ul style={{ display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0, position: "absolute", left: "50%", transform: "translateX(-50%)" }} className="nav-links">
          {NAV_LINKS.map((l) => (
            <li key={l.label}>
              <a href={l.href} className="nav-link" style={{ fontSize: 14, color: "#5c3d28", textDecoration: "none", fontWeight: 500 }}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="nav-cta">
          <a href="/login" className="btn-ghost-nav" style={{ fontSize: 14, color: "#5c3d28", textDecoration: "none", fontWeight: 500, padding: "8px 16px", borderRadius: 8 }}>
            Masuk
          </a>
          <a href="/register" className="btn-orange" style={{ fontSize: 14, color: "#fff", textDecoration: "none", fontWeight: 600, padding: "9px 20px", borderRadius: 9, background: "#eb6935", display: "flex", alignItems: "center", gap: 6 }}>
            Daftar <ArrowRight size={14} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setMenuOpen((v) => !v)} className="mobile-toggle" aria-label="Menu" style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "#2d2015", padding: 4 }}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        </div>{/* end nav-inner */}
      </nav>

      {/* Mobile menu */}
      <div style={{ position: "fixed", top: 64, left: 0, right: 0, zIndex: 40, background: "#fff", borderBottom: "1px solid #f0ece6", overflow: "hidden", maxHeight: menuOpen ? 400 : 0, transition: "max-height 0.3s ease" }}>
        <div style={{ padding: "8px 0 16px" }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 24px", fontSize: 14, color: "#3d2b1a", textDecoration: "none", fontWeight: 500, borderBottom: "1px solid #f5f0ea" }}
            >
              {l.label}
              <MoveRight size={16} color="#a18e62" />
            </a>
          ))}
          <div style={{ display: "flex", gap: 8, padding: "14px 24px 0" }}>
            <a href="/login" style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: 14, color: "#3d2b1a", textDecoration: "none", fontWeight: 600, border: "1px solid #e2d8ce", borderRadius: 9 }}>
              Masuk
            </a>
            <a href="/register" style={{ flex: 1, textAlign: "center", padding: "10px 0", fontSize: 14, color: "#fff", textDecoration: "none", fontWeight: 600, background: "#eb6935", borderRadius: 9 }}>
              Daftar
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .nav-link:hover { color: #eb6935 !important; }
        .btn-ghost-nav:hover { background: #fdf6f0; color: #eb6935 !important; }
        .btn-orange:hover { background: #e05128 !important; }
        @media (max-width: 768px) {
          .nav-links, .nav-cta { display: none !important; }
          .mobile-toggle { display: block !important; }
          .nav-inner { padding: 0 20px !important; }
        }
      `}</style>
    </>
  );
}