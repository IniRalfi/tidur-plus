import { ArrowRight, ChevronDown } from "lucide-react";
import bookHero from "@/assets/images/book-hero.jpg";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      style={{
        backgroundImage: `url(${bookHero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Gradient overlay bawah — transisi halus ke section berikutnya */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-semibold px-4 py-2 rounded-full">
          <span className="w-2 h-2 rounded-full bg-[#eb6935] animate-pulse" />
          Sistem Perpustakaan Digital — Kota Pontianak
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] text-white tracking-tight">
          Temukan Buku,
          <br />
          Pinjam dengan{" "}
          <span
            className="text-[#eb6935] italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Mudah.
          </span>
        </h1>

        {/* Description */}
        <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-xl">
          TIDUR+ menghadirkan ribuan koleksi perpustakaan Kota Pontianak ke ujung
          jari kamu.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href="/register"
            className="inline-flex items-center gap-2 bg-[#eb6935] hover:bg-[#e05128] text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#eb6935]/40 hover:-translate-y-0.5 no-underline text-sm w-full sm:w-auto justify-center"
          >
            Mulai Sekarang <ArrowRight size={16} />
          </a>
          <a
            href="/katalog"
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/25 text-white font-semibold px-8 py-3.5 rounded-xl transition-all no-underline text-sm w-full sm:w-auto justify-center"
          >
            Lihat Katalog
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40">
        <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/30" />
        <span className="text-[10px] font-medium tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-5 rounded-full border border-white/25 flex items-center justify-center">
          <ChevronDown size={10} />
        </div>
      </div>
    </section>
  );
}