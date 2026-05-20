const STATS = [
  { value: "22.615+", label: "Judul Buku" },
  { value: "17.678+", label: "Anggota Aktif" },
  { value: "21.867+", label: "Peminjaman" },
  { value: "4.8★", label: "Rating Layanan" },
];

export default function Stats() {
  return (
    <section className="bg-[#5e432f] py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-white mb-1 tracking-tight">
                {s.value}
              </div>
              <div className="text-sm text-white/60 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}