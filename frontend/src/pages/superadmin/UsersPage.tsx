import { useState, useMemo } from "react";

// Type Role
type Role = "super_admin" | "admin" | "anggota";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: Role;
  status: "aktif" | "nonaktif";
  joinedAt: string;
}

// Data Dummy
const DUMMY_USERS: User[] = [
  {
    id: "1",
    name: "Rafli ",
    email: "rafli@tidurplus.id",
    role: "super_admin",
    status: "aktif",
    joinedAt: "2024-01-10",
  },
  {
    id: "2",
    name: "Cello",
    email: "marcel@tidurplus.id",
    role: "admin",
    status: "aktif",
    joinedAt: "2024-01-12",
  },
  {
    id: "3",
    name: "Nanad",
    email: "nadya@gmail.com",
    role: "admin",
    status: "aktif",
    joinedAt: "2024-02-01",
  },
  {
    id: "4",
    name: "Sheren",
    email: "sheren@gmail.com",
    role: "anggota",
    status: "aktif",
    joinedAt: "2024-02-14",
  },
  {
    id: "5",
    name: "Timo",
    email: "timo@gmail.com",
    role: "anggota",
    status: "aktif",
    joinedAt: "2024-03-01",
  },
  {
    id: "6",
    name: "Bila",
    email: "bila@gmail.com",
    role: "anggota",
    status: "nonaktif",
    joinedAt: "2024-03-05",
  },
  {
    id: "7",
    name: "Nomnom",
    email: "naomy@gmail.com",
    role: "anggota",
    status: "aktif",
    joinedAt: "2024-03-10",
  },
];

const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  anggota: "Anggota",
};

const ROLE_COLORS: Record<Role, string> = {
  super_admin:
    "bg-[#eb6935]/10 text-[#d33a27] border border-[#eb6935]/30",
  admin:
    "bg-[#a18e62]/15 text-[#5e432f] border border-[#a18e62]/40",
  anggota:
    "bg-[#838055]/10 text-[#5d583e] border border-[#838055]/30",
};

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Sub-components
interface RoleBadgeProps {
  role: Role;
}
function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-inter-medium ${ROLE_COLORS[role]}`}
    >
      {ROLE_LABELS[role]}
    </span>
  );
}

interface StatusBadgeProps {
  status: "aktif" | "nonaktif";
}
function StatusBadgeUser({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-inter-medium ${
        status === "aktif"
          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
          : "bg-zinc-100 text-zinc-500 border border-zinc-200"
      }`}>
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "aktif" ? "bg-emerald-500" : "bg-zinc-400"
        }`}
      />
      {status === "aktif" ? "Aktif" : "Nonaktif"}
    </span>
  );
}

// Modal Edit
interface EditModalProps {
  user: User;
  onClose: () => void;
  onSave: (updated: User) => void;
}

function EditModal({ user, onClose, onSave }: EditModalProps) {
  const [role, setRole] = useState<Role>(user.role);
  const [status, setStatus] = useState(user.status);

  function handleSave() {
    onSave({ ...user, role, status });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md border border-[#d27d3f]/20 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#d27d3f]/10 bg-[#fdfcfb]">
          <h2 className="font-inter-bold text-[#5e432f] text-base">Edit User</h2>
          <button
            onClick={onClose}
            className="text-[#a18e62] hover:text-[#5e432f] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* User info (read-only) */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#eb6935]/10 flex items-center justify-center text-[#d33a27] font-inter-bold text-sm flex-shrink-0">
              {getInitials(user.name)}
            </div>
            <div>
              <p className="font-inter-medium text-[#5e432f] text-sm">{user.name}</p>
              <p className="text-xs text-[#a18e62]">{user.email}</p>
            </div>
          </div>

          {/* Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-inter-medium text-[#814524]">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="w-full border border-[#d27d3f]/30 rounded-xl px-3 py-2 text-sm text-[#5e432f] bg-white focus:outline-none focus:ring-2 focus:ring-[#eb6935]/30 focus:border-[#eb6935] transition-all"
            >
              <option value="anggota">Anggota</option>
              <option value="admin">Admin</option>
              <option value="super_admin">Super Admin</option>
            </select>
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <label className="text-xs font-inter-medium text-[#814524]">Status</label>
            <div className="flex gap-3">
              {(["aktif", "nonaktif"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setStatus(s)}
                  className={`flex-1 py-2 rounded-xl text-sm font-inter-medium border transition-all ${
                    status === s
                      ? s === "aktif"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : "bg-zinc-100 text-zinc-600 border-zinc-300"
                      : "bg-white text-[#a18e62] border-[#d27d3f]/20 hover:border-[#d27d3f]/40"
                  }`}
                >
                  {s === "aktif" ? "Aktif" : "Nonaktif"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 py-4 bg-[#fdfcfb] border-t border-[#d27d3f]/10">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm text-[#814524] border border-[#d27d3f]/30 hover:bg-[#d27d3f]/5 transition-all font-inter-medium"
          >
            Batal
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2 rounded-xl text-sm text-white bg-[#eb6935] hover:bg-[#e05128] transition-all font-inter-medium"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

// Modal Konfirmasi Delete
interface DeleteModalProps {
  user: User;
  onClose: () => void;
  onConfirm: () => void;
}
function DeleteModal({ user, onClose, onConfirm }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm border border-red-100 overflow-hidden">
        <div className="px-6 py-5 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto">
            <svg className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <div>
            <h3 className="font-inter-bold text-[#5e432f] text-base">Hapus User?</h3>
            <p className="text-sm text-[#a18e62] mt-1">
              <span className="font-inter-medium text-[#814524]">{user.name}</span> akan dihapus dari sistem. Tindakan ini tidak bisa dibatalkan.
            </p>
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded-xl text-sm text-[#814524] border border-[#d27d3f]/30 hover:bg-[#d27d3f]/5 transition-all font-inter-medium"
          >
            Batal
          </button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 py-2 rounded-xl text-sm text-white bg-red-500 hover:bg-red-600 transition-all font-inter-medium"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Page
export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(DUMMY_USERS);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState<Role | "semua">("semua");
  const [filterStatus, setFilterStatus] = useState<"semua" | "aktif" | "nonaktif">("semua");
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  // Filter & Search
  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = filterRole === "semua" || u.role === filterRole;
      const matchStatus = filterStatus === "semua" || u.status === filterStatus;
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, search, filterRole, filterStatus]);

  // Stats
  const stats = useMemo(() => ({
    total: users.length,
    admin: users.filter((u) => u.role === "admin" || u.role === "super_admin").length,
    anggota: users.filter((u) => u.role === "anggota").length,
    nonaktif: users.filter((u) => u.status === "nonaktif").length,
  }), [users]);

  // Handlers
  function handleSaveEdit(updated: User) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
  }

  function handleDelete(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  // Render
  return (
    <div className="min-h-screen bg-[#fdfcfb] px-6 py-8 font-primary">
      {/* ── Header ── */}
      <div className="mb-8">
        <h1 className="text-2xl font-inter-bold text-[#5e432f]">Kelola User</h1>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total User", value: stats.total, color: "text-[#5e432f]", bg: "bg-[#d27d3f]/8" },
          { label: "Admin & Super Admin", value: stats.admin, color: "text-[#d33a27]", bg: "bg-[#eb6935]/8" },
          { label: "Anggota", value: stats.anggota, color: "text-[#5d583e]", bg: "bg-[#838055]/8" },
          { label: "Nonaktif", value: stats.nonaktif, color: "text-zinc-500", bg: "bg-zinc-50" },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} rounded-2xl px-5 py-4 border border-[#d27d3f]/10`}
          >
            <p className="text-xs text-[#a18e62] font-inter-medium">{stat.label}</p>
            <p className={`text-3xl font-inter-bold mt-1 ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* ── Filter Bar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a18e62]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#d27d3f]/20 rounded-xl bg-white text-[#5e432f] placeholder:text-[#a18e62]/60 focus:outline-none focus:ring-2 focus:ring-[#eb6935]/20 focus:border-[#eb6935]/50 transition-all"
          />
        </div>

        {/* Filter Role */}
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as Role | "semua")}
          className="px-4 py-2 text-sm border border-[#d27d3f]/20 rounded-xl bg-white text-[#5e432f] focus:outline-none focus:ring-2 focus:ring-[#eb6935]/20 focus:border-[#eb6935]/50 transition-all"
        >
          <option value="semua">Semua Role</option>
          <option value="super_admin">Super Admin</option>
          <option value="admin">Admin</option>
          <option value="anggota">Anggota</option>
        </select>

        {/* Filter Status */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as "semua" | "aktif" | "nonaktif")}
          className="px-4 py-2 text-sm border border-[#d27d3f]/20 rounded-xl bg-white text-[#5e432f] focus:outline-none focus:ring-2 focus:ring-[#eb6935]/20 focus:border-[#eb6935]/50 transition-all"
        >
          <option value="semua">Semua Status</option>
          <option value="aktif">Aktif</option>
          <option value="nonaktif">Nonaktif</option>
        </select>
      </div>

      {/*  Tabel  */}
      <div className="bg-white border border-[#d27d3f]/10 rounded-2xl overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-[#d27d3f]/10 bg-[#fdfcfb]">
          {["Pengguna", "Role", "Status", "Bergabung", "Aksi"].map((h) => (
            <span key={h} className="text-xs font-inter-medium text-[#a18e62] uppercase tracking-wide">
              {h}
            </span>
          ))}
        </div>

        {/* Table rows */}
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-sm text-[#a18e62]">
            Tidak ada user yang ditemukan.
          </div>
        ) : (
          filtered.map((user, idx) => (
            <div
              key={user.id}
              className={`grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-4 items-center transition-colors hover:bg-[#d27d3f]/3 ${
                idx !== filtered.length - 1 ? "border-b border-[#d27d3f]/8" : ""
              }`}
            >
              {/* User info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#eb6935]/10 flex items-center justify-center text-[#d33a27] font-inter-bold text-xs flex-shrink-0">
                  {getInitials(user.name)}
                </div>
                <div className="min-w-0">
                  <p className="font-inter-medium text-[#5e432f] text-sm truncate">{user.name}</p>
                  <p className="text-xs text-[#a18e62] truncate">{user.email}</p>
                </div>
              </div>

              {/* Role */}
              <div>
                <RoleBadge role={user.role} />
              </div>

              {/* Status */}
              <div>
                <StatusBadgeUser status={user.status} />
              </div>

              {/* Joined */}
              <div className="text-xs text-[#a18e62]">{formatDate(user.joinedAt)}</div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditUser(user)}
                  title="Edit user"
                  className="p-1.5 rounded-lg text-[#a18e62] hover:text-[#814524] hover:bg-[#d27d3f]/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button
                  onClick={() => setDeleteUser(user)}
                  title="Hapus user"
                  className="p-1.5 rounded-lg text-[#a18e62] hover:text-red-500 hover:bg-red-50 transition-all"
                  disabled={user.role === "super_admin"}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        )}

        {/* Footer info */}
        {filtered.length > 0 && (
          <div className="px-6 py-3 border-t border-[#d27d3f]/8 bg-[#fdfcfb]">
            <p className="text-xs text-[#a18e62]">
              Menampilkan <span className="font-inter-medium text-[#814524]">{filtered.length}</span> dari{" "}
              <span className="font-inter-medium text-[#814524]">{users.length}</span> user
            </p>
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {editUser && (
        <EditModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={handleSaveEdit}
        />
      )}
      {deleteUser && (
        <DeleteModal
          user={deleteUser}
          onClose={() => setDeleteUser(null)}
          onConfirm={() => handleDelete(deleteUser.id)}
        />
      )}
    </div>
  );
}