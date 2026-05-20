const BOOKS = [
  { title: "Laskar Pelangi", author: "Andrea Hirata", cat: "Fiksi", color: "#eb6935" },
  { title: "Bumi Manusia", author: "Pramoedya Ananta Toer", cat: "Sastra", color: "#5e432f" },
  { title: "Negeri 5 Menara", author: "Ahmad Fuadi", cat: "Biografi", color: "#a18e62" },
  { title: "Perahu Kertas", author: "Dee Lestari", cat: "Fiksi", color: "#d27d3f" },
  { title: "Ronggeng Dukuh Paruk", author: "Ahmad Tohari", cat: "Sastra", color: "#838055" },
  { title: "Sang Pemimpi", author: "Andrea Hirata", cat: "Fiksi", color: "#814524" },
];

export default function Books() {
  return (
    <section className="py-20 md:py-28 bg-[#f7f0e8] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-block text-xs font-bold text-[#eb6935] tracking-widest uppercase border border-[#eb6935]/30 bg-[#eb6935]/8 px-3 py-1 rounded-full mb-5">
              Koleksi Unggulan
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#3d2b1a] leading-tight">
              Buku Populer
              <br />
              <span className="text-[#eb6935] italic" style={{ fontFamily: "Georgia, serif" }}>
                Bulan Ini
              </span>
            </h2>
          </div>
          <a
            href="/katalog"
            className="text-sm font-semibold text-[#eb6935] hover:text-[#e05128] transition-colors no-underline self-start md:self-auto pb-1 border-b border-[#eb6935]/40 hover:border-[#e05128]"
          >
            Lihat semua koleksi →
          </a>
        </div>

        {/* Books grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BOOKS.map((b) => (
            <div key={b.title} className="group flex flex-col gap-3 cursor-pointer">
              {/* Book cover */}
              <div
                className="relative w-full aspect-[3/4] rounded-xl shadow-md group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-300"
                style={{ background: b.color }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent" />
                {/* Spine */}
                <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-xl bg-black/20" />
                {/* Category badge */}
                <div className="absolute top-2 right-2 text-[9px] font-bold text-white/90 bg-black/20 px-1.5 py-0.5 rounded">
                  {b.cat}
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="text-xs font-bold text-[#3d2b1a] leading-snug group-hover:text-[#eb6935] transition-colors line-clamp-2">
                  {b.title}
                </div>
                <div className="text-[11px] text-[#a18e62] mt-0.5 line-clamp-1">{b.author}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}