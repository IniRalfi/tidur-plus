import { useState, useMemo } from "react";

//  Types
type LogAction =
  | "login"
  | "logout"
  | "user.create"
  | "user.update"
  | "user.delete"
  | "buku.create"
  | "buku.update"
  | "buku.delete"
  | "peminjaman.create"
  | "peminjaman.approve"
  | "peminjaman.reject"
  | "peminjaman.return"
  | "perpanjangan.approve"
  | "perpanjangan.reject"
  | "denda.lunas"
  | "konfigurasi.update";

interface AuditLog {
  id: string;
  timestamp: string;
  actor: {
    name: string;
    role: "super_admin" | "admin" | "anggota";
  };
  action: LogAction;
  target?: string;
  detail?: string;
  ip?: string;
}

//  Dummy Data 
const DUMMY_LOGS: AuditLog[] = [
  {
    id: "1",
    timestamp: "2024-05-15T08:23:11Z",
    actor: { name: "Rafli ", role: "super_admin" },
    action: "konfigurasi.update",
    detail: "Mengubah tarif denda dari Rp500 → Rp1.000/hari",
    ip: "192.168.1.10",
  },
  {
    id: "2",
    timestamp: "2024-05-15T09:05:44Z",
    actor: { name: "Nadya ", role: "admin" },
    action: "peminjaman.approve",
    target: "Pinjam #P-0042 — Sheren ",
    detail: "Disetujui: Laskar Pelangi",
    ip: "192.168.1.22",
  },
  {
    id: "3",
    timestamp: "2024-05-15T09:30:00Z",
    actor: { name: "Sheren ", role: "anggota" },
    action: "login",
    ip: "10.0.0.55",
  },
  {
    id: "4",
    timestamp: "2024-05-15T10:12:33Z",
    actor: { name: "Nadya", role: "admin" },
    action: "buku.create",
    target: "Buku: Bumi Manusia",
    detail: "Stok awal: 3 eksemplar",
    ip: "192.168.1.22",
  },
  {
    id: "5",
    timestamp: "2024-05-15T11:00:00Z",
    actor: { name: "Rafli", role: "super_admin" },
    action: "user.update",
    target: "Bila",
    detail: "Status diubah: aktif → nonaktif",
    ip: "192.168.1.10",
  },
  {
    id: "6",
    timestamp: "2024-05-15T11:45:19Z",
    actor: { name: "Nadya", role: "admin" },
    action: "peminjaman.reject",
    target: "Pinjam #P-0043 — Budi",
    detail: "Alasan: stok habis",
    ip: "192.168.1.22",
  },
  {
    id: "7",
    timestamp: "2024-05-15T13:20:05Z",
    actor: { name: "Timo", role: "anggota" },
    action: "peminjaman.create",
    target: "Pinjam #P-0044",
    detail: "Mengajukan pinjam: Harry Potter",
    ip: "10.0.0.77",
  },
  {
    id: "8",
    timestamp: "2024-05-15T14:00:00Z",
    actor: { name: "Nadya", role: "admin" },
    action: "denda.lunas",
    target: "Denda #D-0018 — Budi",
    detail: "Denda Rp7.000 ditandai lunas",
    ip: "192.168.1.22",
  },
  {
    id: "9",
    timestamp: "2024-05-15T14:30:00Z",
    actor: { name: "Nadya", role: "admin" }, // PRD: hanya Admin yang bisa approve perpanjangan
    action: "perpanjangan.approve",
    target: "Perpanjang #X-0011 — Naomy",
    detail: "Diperpanjang 3 hari, disetujui Admin",
    ip: "192.168.1.22",
  },
  {
    id: "10",
    timestamp: "2024-05-15T15:10:00Z",
    actor: { name: "Rafli", role: "super_admin" },
    action: "user.delete",
    target: "User: guest_test_01",
    detail: "Akun test dihapus permanen",
    ip: "192.168.1.10",
  },
  {
    id: "11",
    timestamp: "2024-05-14T08:00:00Z",
    actor: { name: "Sheren", role: "anggota" },
    action: "peminjaman.return",
    target: "Pinjam #P-0039",
    detail: "Buku dikembalikan tepat waktu",
    ip: "10.0.0.55",
  },
  {
    id: "12",
    timestamp: "2024-05-14T09:45:00Z",
    actor: { name: "Nadya", role: "admin" },
    action: "buku.update",
    target: "Buku: Dilan 1990",
    detail: "Stok diupdate: 2 → 4 eksemplar",
    ip: "192.168.1.22",
  },
  {
    id: "13",
    timestamp: "2024-05-14T16:00:00Z",
    actor: { name: "Timo", role: "anggota" },
    action: "logout",
    ip: "10.0.0.77",
  },
];

// Helpers 

const ACTION_LABELS: Record<LogAction, string> = {
  login: "Login",
  logout: "Logout",
  "user.create": "Tambah User",
  "user.update": "Edit User",
  "user.delete": "Hapus User",
  "buku.create": "Tambah Buku",
  "buku.update": "Edit Buku",
  "buku.delete": "Hapus Buku",
  "peminjaman.create": "Ajukan Pinjam",
  "peminjaman.approve": "Setujui Pinjam",
  "peminjaman.reject": "Tolak Pinjam",
  "peminjaman.return": "Kembalikan Buku",
  "perpanjangan.approve": "Setujui Perpanjangan",
  "perpanjangan.reject": "Tolak Perpanjangan",
  "denda.lunas": "Tandai Denda Lunas",
  "konfigurasi.update": "Ubah Konfigurasi",
};

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  anggota: "Anggota",
};

function formatDateTime(iso: string) {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }),
    time: d.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }),
  };
}

function getInitials(name: string) {
  return name.split(" ").slice(0, 2).map((n) => n[0]).join("").toUpperCase();
}

// Kategorisasi modul dari action
function getModule(action: LogAction): string {
  if (action.startsWith("user")) return "User";
  if (action.startsWith("buku")) return "Buku";
  if (action.startsWith("peminjaman")) return "Peminjaman";
  if (action.startsWith("perpanjangan")) return "Perpanjangan";
  if (action.startsWith("denda")) return "Denda";
  if (action.startsWith("konfigurasi")) return "Konfigurasi";
  return "Auth";
}

//  Main Page 
const MODULES = ["semua", "Auth", "User", "Buku", "Peminjaman", "Perpanjangan", "Denda", "Konfigurasi"];
const PAGE_SIZE = 8;

export default function AuditLogPage() {
  const [search, setSearch] = useState("");
  const [filterModule, setFilterModule] = useState("semua");
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<string | null>(null);

  //  Filter 
  const filtered = useMemo(() => {
    return DUMMY_LOGS.filter((log) => {
      const q = search.toLowerCase();
      const matchSearch =
        log.actor.name.toLowerCase().includes(q) ||
        ACTION_LABELS[log.action].toLowerCase().includes(q) ||
        (log.target ?? "").toLowerCase().includes(q) ||
        (log.detail ?? "").toLowerCase().includes(q);
      const matchModule = filterModule === "semua" || getModule(log.action) === filterModule;
      return matchSearch && matchModule;
    });
  }, [search, filterModule]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // reset page on filter change
  function handleSearch(v: string) { setSearch(v); setPage(1); }
  function handleModule(v: string) { setFilterModule(v); setPage(1); }

  return (
    <div className="min-h-screen bg-[#fdfcfb] px-6 py-8 font-primary">
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-inter-bold text-[#5e432f]">Audit Log</h1>
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a18e62]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari nama, aksi, atau detail..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#d27d3f]/20 rounded-xl bg-white text-[#5e432f] placeholder:text-[#a18e62]/60 focus:outline-none focus:ring-2 focus:ring-[#eb6935]/20 focus:border-[#eb6935]/50 transition-all"
          />
        </div>

        {/* Filter Modul */}
        <select
          value={filterModule}
          onChange={(e) => handleModule(e.target.value)}
          className="px-4 py-2 text-sm border border-[#d27d3f]/20 rounded-xl bg-white text-[#5e432f] focus:outline-none focus:ring-2 focus:ring-[#eb6935]/20 transition-all"
        >
          {MODULES.map((m) => (
            <option key={m} value={m}>{m === "semua" ? "Semua Modul" : m}</option>
          ))}
        </select>
      </div>

      {/* ── Log List ── */}
      <div className="bg-white border border-[#d27d3f]/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-[#d27d3f]/10 bg-[#fdfcfb]">
          {["Waktu", "Aktor", "Aksi", ""].map((h, i) => (
            <span key={i} className="text-xs font-inter-medium text-[#a18e62] uppercase tracking-wide">{h}</span>
          ))}
        </div>

        {paginated.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#a18e62]">
            Tidak ada log yang cocok dengan filter.
          </div>
        ) : (
          paginated.map((log, idx) => {
            const { date, time } = formatDateTime(log.timestamp);
            const isExpanded = expanded === log.id;

            return (
              <div
                key={log.id}
                className={idx !== paginated.length - 1 ? "border-b border-[#d27d3f]/8" : ""}
              >
                {/* Row utama */}
                <div
                  className="grid grid-cols-[1fr_1.5fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center hover:bg-[#d27d3f]/3 transition-colors cursor-pointer"
                  onClick={() => setExpanded(isExpanded ? null : log.id)}
                >
                  {/* Waktu */}
                  <div>
                    <p className="text-xs font-inter-medium text-[#5e432f]">{time}</p>
                    <p className="text-xs text-[#a18e62]">{date}</p>
                  </div>

                  {/* Aktor */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-[#eb6935]/10 flex items-center justify-center text-[#d33a27] font-inter-bold text-xs flex-shrink-0">
                      {getInitials(log.actor.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-inter-medium text-[#5e432f] truncate">{log.actor.name}</p>
                      <p className="text-xs text-[#a18e62]">{ROLE_LABELS[log.actor.role]}</p>
                    </div>
                  </div>

                  {/* Aksi */}
                  <div>
                    <p className="text-sm text-[#5e432f]">{ACTION_LABELS[log.action]}</p>
                    <p className="text-xs text-[#a18e62]">{getModule(log.action)}</p>
                  </div>

                  {/* Expand toggle */}
                  <div className="flex items-center">
                    <svg
                      className={`w-4 h-4 text-[#a18e62] transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Detail expandable */}
                {isExpanded && (
                  <div className="px-6 pb-4 bg-[#d27d3f]/3 border-t border-[#d27d3f]/8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
                      {log.target && (
                        <div>
                          <p className="text-xs font-inter-medium text-[#a18e62] mb-1">Target</p>
                          <p className="text-sm text-[#5e432f]">{log.target}</p>
                        </div>
                      )}
                      {log.detail && (
                        <div className={log.target ? "" : "sm:col-span-2"}>
                          <p className="text-xs font-inter-medium text-[#a18e62] mb-1">Detail</p>
                          <p className="text-sm text-[#5e432f]">{log.detail}</p>
                        </div>
                      )}
                      {log.ip && (
                        <div>
                          <p className="text-xs font-inter-medium text-[#a18e62] mb-1">IP Address</p>
                          <p className="text-sm font-mono text-[#5e432f]">{log.ip}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs font-inter-medium text-[#a18e62] mb-1">Timestamp lengkap</p>
                        <p className="text-sm font-mono text-[#5e432f]">{log.timestamp}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-[#d27d3f]/8 bg-[#fdfcfb]">
            <p className="text-xs text-[#a18e62]">
              Menampilkan <span className="font-inter-medium text-[#814524]">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)}</span> dari{" "}
              <span className="font-inter-medium text-[#814524]">{filtered.length}</span> log
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg text-[#a18e62] hover:text-[#5e432f] hover:bg-[#d27d3f]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-inter-medium transition-all ${
                    p === page
                      ? "bg-[#eb6935] text-white"
                      : "text-[#a18e62] hover:bg-[#d27d3f]/10 hover:text-[#5e432f]"
                  }`}
                >
                  {p}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg text-[#a18e62] hover:text-[#5e432f] hover:bg-[#d27d3f]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}