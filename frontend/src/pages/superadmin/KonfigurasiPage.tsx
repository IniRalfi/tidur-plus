import { useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface KonfigurasiData {
  // Peminjaman
  durasiPinjamDefault: number;       
  maksimalPerpanjangan: number;     
  maksimalPinjamAktif: number;       

  // Denda
  tarifDendaPerHari: number;         
  dendaMaksimal: number;             
  toleransiKeterlambatan: number;    

  // Katalog
  maksimalStokPerBuku: number;
  bukuBiasaDipinjam: boolean;       

  // Sistem
  namaAplikasi: string;
}

//  Dummy Data 

const DEFAULT_CONFIG: KonfigurasiData = {
  durasiPinjamDefault: 14,    
  maksimalPerpanjangan: 2,    
  maksimalPinjamAktif: 2,     
  tarifDendaPerHari: 1000,    
  dendaMaksimal: 50000,
  toleransiKeterlambatan: 0,
  maksimalStokPerBuku: 5,
  bukuBiasaDipinjam: true,
  namaAplikasi: "Perpustakaan Digital",
};

// Helpers 
function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

//  Sub-components 
interface SectionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
function SectionCard({ title, description, icon, children }: SectionCardProps) {
  return (
    <div className="bg-white border border-[#d27d3f]/10 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-[#d27d3f]/10 bg-[#fdfcfb]">
        <div className="w-8 h-8 rounded-xl bg-[#eb6935]/10 flex items-center justify-center text-[#d33a27]">
          {icon}
        </div>
        <div>
          <h2 className="font-inter-bold text-[#5e432f] text-sm">{title}</h2>
          <p className="text-xs text-[#a18e62]">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5 space-y-5">{children}</div>
    </div>
  );
}

interface FieldRowProps {
  label: string;
  hint?: string;
  children: React.ReactNode;
}
function FieldRow({ label, hint, children }: FieldRowProps) {
  return (
    <div className="flex items-start justify-between gap-6">
      <div className="flex-1">
        <p className="text-sm font-inter-medium text-[#5e432f]">{label}</p>
        {hint && <p className="text-xs text-[#a18e62] mt-0.5">{hint}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}

interface NumberInputProps {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
  prefix?: string;
  step?: number;
}
function NumberInput({ value, onChange, min = 0, max, suffix, prefix, step = 1 }: NumberInputProps) {
  return (
    <div className="flex items-center border border-[#d27d3f]/20 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#eb6935]/20 focus-within:border-[#eb6935]/50 transition-all">
      {prefix && (
        <span className="px-3 py-2 text-xs text-[#a18e62] bg-[#d27d3f]/5 border-r border-[#d27d3f]/15">
          {prefix}
        </span>
      )}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-24 px-3 py-2 text-sm text-[#5e432f] bg-transparent focus:outline-none text-center"
      />
      {suffix && (
        <span className="px-3 py-2 text-xs text-[#a18e62] bg-[#d27d3f]/5 border-l border-[#d27d3f]/15">
          {suffix}
        </span>
      )}
    </div>
  );
}

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
}
function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
        checked ? "bg-[#eb6935]" : "bg-zinc-200"
      }`}
    >
      <span
        className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

//  Toast 

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}
function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-inter-medium border ${
        type === "success"
          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
          : "bg-red-50 text-red-600 border-red-200"
      }`}
    >
      {type === "success" ? (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {message}
      <button onClick={onClose} className="ml-1 opacity-60 hover:opacity-100">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}

//  Main Page 

export default function KonfigurasiPage() {
  const [config, setConfig] = useState<KonfigurasiData>(DEFAULT_CONFIG);
  const [saved, setSaved] = useState<KonfigurasiData>(DEFAULT_CONFIG);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const isDirty = JSON.stringify(config) !== JSON.stringify(saved);

  function update<K extends keyof KonfigurasiData>(key: K, value: KonfigurasiData[K]) {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }

  function handleReset() {
    setConfig(saved);
  }

  async function handleSave() {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    setSaved(config);
    setIsSaving(false);
    setToast({ message: "Konfigurasi berhasil disimpan.", type: "success" });
    setTimeout(() => setToast(null), 3500);
  }

  return (
    <div className="min-h-screen bg-[#fdfcfb] px-6 py-8 font-primary">
      {/* ── Header ── */}
      <div className="flex items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-inter-bold text-[#5e432f]">Konfigurasi Sistem</h1>
          <p className="text-sm text-[#a18e62] mt-1">
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {isDirty && (
            <button
              onClick={handleReset}
              className="px-4 py-2 text-sm text-[#814524] border border-[#d27d3f]/30 rounded-xl hover:bg-[#d27d3f]/5 transition-all font-inter-medium"
            >
              Reset
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={!isDirty || isSaving}
            className={`px-5 py-2 text-sm rounded-xl font-inter-medium transition-all flex items-center gap-2 ${
              isDirty && !isSaving
                ? "bg-[#eb6935] text-white hover:bg-[#e05128]"
                : "bg-[#d27d3f]/15 text-[#a18e62] cursor-not-allowed"
            }`}
          >
            {isSaving && (
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            )}
            {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>

      {/* ── Dirty Banner ── */}
      {isDirty && (
        <div className="flex items-center gap-2 px-4 py-3 mb-6 bg-[#eb6935]/8 border border-[#eb6935]/20 rounded-xl text-sm text-[#814524]">
          <svg className="w-4 h-4 text-[#eb6935] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
          Ada perubahan yang belum disimpan.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Seksi Peminjaman ── */}
        <SectionCard
          title="Aturan Peminjaman"
          description="Durasi, perpanjangan, dan batas aktif"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          }
        >
          <FieldRow label="Durasi pinjam default" hint="Jumlah hari setiap satu periode peminjaman">
            <NumberInput
              value={config.durasiPinjamDefault}
              onChange={(v) => update("durasiPinjamDefault", v)}
              min={1}
              max={30}
              suffix="hari"
            />
          </FieldRow>
          <div className="border-t border-[#d27d3f]/8" />
          <FieldRow label="Maks. perpanjangan" hint="Berapa kali anggota boleh memperpanjang (PRD: maks 2x)">
            <NumberInput
              value={config.maksimalPerpanjangan}
              onChange={(v) => update("maksimalPerpanjangan", v)}
              min={0}
              max={2}
              suffix="kali"
            />
          </FieldRow>
          <div className="border-t border-[#d27d3f]/8" />
          <FieldRow label="Maks. pinjaman aktif" hint="Jumlah buku yang bisa dipinjam sekaligus (PRD: maks 2 buku)">
            <NumberInput
              value={config.maksimalPinjamAktif}
              onChange={(v) => update("maksimalPinjamAktif", v)}
              min={1}
              max={2}
              suffix="buku"
            />
          </FieldRow>
        </SectionCard>

        {/* ── Seksi Denda ── */}
        <SectionCard
          title="Aturan Denda"
          description="Tarif, batas maksimal, dan toleransi"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        >
          <FieldRow label="Tarif denda per hari" hint={`Saat ini: ${formatRupiah(config.tarifDendaPerHari)}`}>
            <NumberInput
              value={config.tarifDendaPerHari}
              onChange={(v) => update("tarifDendaPerHari", v)}
              min={0}
              step={500}
              prefix="Rp"
            />
          </FieldRow>
          <div className="border-t border-[#d27d3f]/8" />
          <FieldRow label="Denda maksimal" hint={`Isi 0 jika tidak ada batas. Saat ini: ${config.dendaMaksimal === 0 ? "tak terbatas" : formatRupiah(config.dendaMaksimal)}`}>
            <NumberInput
              value={config.dendaMaksimal}
              onChange={(v) => update("dendaMaksimal", v)}
              min={0}
              step={5000}
              prefix="Rp"
            />
          </FieldRow>
          <div className="border-t border-[#d27d3f]/8" />
          <FieldRow label="Toleransi keterlambatan" hint="Hari grace period sebelum denda mulai dihitung">
            <NumberInput
              value={config.toleransiKeterlambatan}
              onChange={(v) => update("toleransiKeterlambatan", v)}
              min={0}
              max={7}
              suffix="hari"
            />
          </FieldRow>

          {/* Simulasi denda */}
          <div className="bg-[#d27d3f]/5 rounded-xl px-4 py-3 border border-[#d27d3f]/10">
            <p className="text-xs font-inter-medium text-[#814524] mb-2">Simulasi Denda</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[3, 7, 14].map((hari) => {
                const efektif = Math.max(0, hari - config.toleransiKeterlambatan);
                let total = efektif * config.tarifDendaPerHari;
                if (config.dendaMaksimal > 0) total = Math.min(total, config.dendaMaksimal);
                return (
                  <div key={hari} className="bg-white rounded-lg px-2 py-2 border border-[#d27d3f]/10">
                    <p className="text-xs text-[#a18e62]">{hari} hari</p>
                    <p className="text-sm font-inter-bold text-[#d33a27] mt-0.5">
                      {formatRupiah(total)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>

        {/* ── Seksi Katalog ── */}
        <SectionCard
          title="Pengaturan Katalog"
          description="Stok dan kebijakan peminjaman buku"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          }
        >
          <FieldRow label="Maks. stok per judul" hint="Jumlah eksemplar maksimal satu judul buku">
            <NumberInput
              value={config.maksimalStokPerBuku}
              onChange={(v) => update("maksimalStokPerBuku", v)}
              min={1}
              max={50}
              suffix="eks."
            />
          </FieldRow>
          <div className="border-t border-[#d27d3f]/8" />
          <FieldRow label="Buku bisa dipinjam" hint="Nonaktifkan jika semua buku hanya baca di tempat">
            <Toggle
              checked={config.bukuBiasaDipinjam}
              onChange={(v) => update("bukuBiasaDipinjam", v)}
            />
          </FieldRow>
        </SectionCard>

        {/* ── Seksi Sistem ── */}
        <SectionCard
          title="Pengaturan Sistem"
          description="Nama aplikasi, email, dan notifikasi"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          <FieldRow label="Nama aplikasi" hint="Ditampilkan di header sistem">
            <input
              type="text"
              value={config.namaAplikasi}
              onChange={(e) => update("namaAplikasi", e.target.value)}
              className="w-52 border border-[#d27d3f]/20 rounded-xl px-3 py-2 text-sm text-[#5e432f] bg-white focus:outline-none focus:ring-2 focus:ring-[#eb6935]/20 focus:border-[#eb6935]/50 transition-all"
            />
          </FieldRow>

        </SectionCard>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}