const FEATURES = [
  {
    no: "01",
    title: "Katalog Digital",
    desc: "Telusuri ribuan buku dari berbagai genre dan penulis dengan mudah menggunakan fitur pencarian dan filter canggih kami.",
  },
  {
    no: "02",
    title: "Peminjaman Online",
    desc: "Pinjam buku tanpa antri dan tanpa harus datang ke perpustakaan. Semua bisa dilakukan dari rumahmu.",
  },
  {
    no: "03",
    title: "Notifikasi Jatuh Tempo",
    desc: "Dapatkan pengingat otomatis sebelum batas waktu peminjaman, supaya kamu tidak kena denda.",
  },
  {
    no: "04",
    title: "Riwayat Peminjaman",
    desc: "Lacak semua buku yang pernah kamu pinjam dan buat daftar bacaan pribadimu dengan mudah.",
  },
];

export default function Features() {
  return (
    <section id="layanan" className="py-20 md:py-28 bg-[#fdfcfb]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Label */}
        <div className="inline-block text-xs font-bold text-[#eb6935] tracking-widest uppercase border border-[#eb6935]/30 bg-[#eb6935]/8 px-3 py-1 rounded-full mb-5">
          Layanan Kami
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-black text-[#3d2b1a] leading-tight mb-14 max-w-xl">
          Semua yang kamu butuhkan,{" "}
          <span
            className="text-[#eb6935] italic"
            style={{ fontFamily: "Georgia, serif" }}
          >
            dalam satu platform.
          </span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.no}
              className="group relative bg-white border border-[#ede5da] rounded-2xl p-6 hover:border-[#eb6935]/40 hover:shadow-lg hover:shadow-[#eb6935]/8 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl font-black text-[#eb6935]/15 mb-4 group-hover:text-[#eb6935]/25 transition-colors">
                {f.no}
              </div>
              <div className="text-base font-bold text-[#3d2b1a] mb-2">{f.title}</div>
              <div className="text-sm text-[#814524]/70 leading-relaxed">{f.desc}</div>
              {/* Accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-[#eb6935] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}