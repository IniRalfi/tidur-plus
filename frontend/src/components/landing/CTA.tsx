import { ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 md:py-28 bg-[#fdfcfb]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="relative bg-[#3d2b1a] rounded-3xl px-8 md:px-16 py-16 md:py-20 overflow-hidden text-center">
          {/* Decorative blobs */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#eb6935]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#d27d3f]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <div className="text-xs font-bold text-[#eb6935] tracking-widest uppercase">
              Bergabung Sekarang
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Mulai perjalanan membacamu{" "}
              <span
                className="text-[#eb6935] italic"
                style={{ fontFamily: "Georgia, serif" }}
              >
                hari ini.
              </span>
            </h2>

            <p className="text-white/60 text-sm md:text-base leading-relaxed">
              Gratis untuk semua warga Kota Pontianak. Daftarkan dirimu dan nikmati ribuan koleksi buku.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href="/register"
                className="inline-flex items-center gap-2 bg-[#eb6935] hover:bg-[#e05128] text-white font-bold px-8 py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-[#eb6935]/30 hover:-translate-y-0.5 no-underline text-sm w-full sm:w-auto justify-center"
              >
                Daftar Gratis <ArrowRight size={16} />
              </a>
              <a
                href="/katalog"
                className="inline-flex items-center gap-2 text-white/70 hover:text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-white/8 transition-all no-underline text-sm w-full sm:w-auto justify-center"
              >
                Lihat Katalog
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}