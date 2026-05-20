import { BookOpen } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Katalog", href: "/katalog" },
  { label: "Layanan", href: "#layanan" },
  { label: "Tentang", href: "#tentang" },
  { label: "Kontak", href: "#kontak" },
];

export default function Footer() {
  return (
    <footer id="kontak" className="bg-[#2a1d12] text-white/70 py-12">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/10">
          {/* Brand */}
          <a href="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-lg bg-[#eb6935] flex items-center justify-center">
              <BookOpen size={18} color="white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              TIDUR<span className="text-[#eb6935]">+</span>
            </span>
          </a>

          {/* Links */}
          <ul className="flex flex-wrap gap-x-6 gap-y-2 list-none m-0 p-0">
            {FOOTER_LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm text-white/50 hover:text-white transition-colors no-underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 pt-8">
          <p className="text-xs text-white/30">
            © 2025 TIDUR+ — Sistem Perpustakaan Digital Kota Pontianak
          </p>
          <p className="text-xs text-white/30">
            Dibangun dengan ❤ untuk warga Pontianak
          </p>
        </div>
      </div>
    </footer>
  );
}