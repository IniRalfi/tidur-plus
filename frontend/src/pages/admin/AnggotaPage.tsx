// frontend/src/pages/admin/AnggotaPage.tsx
import { useQuery } from "@tanstack/react-query";
import { usersService } from "../../lib/users.service";
import { Role } from "@tidur-plus/shared";

export default function AnggotaPage() {
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: usersService.getAll,
  });

  // Filter hanya untuk anggota (bukan super admin) - admin biasa mungkin bisa liat admin lain atau cuma anggota
  const anggota = users.filter((user) => user.roles.includes(Role.ANGGOTA as Role));

  return (
    <main className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">AnggotaPage</h1>
        <p className="text-sm text-gray-500">Daftar pengguna dengan hak akses sebagai Anggota perpustakaan.</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
              <th className="p-4">Nama Anggota</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">Memuat data anggota...</td>
              </tr>
            ) : anggota.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-gray-400">Belum ada anggota yang terdaftar</td>
              </tr>
            ) : (
              anggota.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/40 transition-colors">
                  <td className="p-4 font-medium text-gray-900">{user.nama}</td>
                  <td className="p-4 text-gray-500">{user.email}</td>
                  <td className="p-4">
                    <span className={`text-xs px-2 py-1 rounded-sm font-medium ${user.aktif ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                      {user.aktif ? 'Aktif' : 'Non-aktif'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                      Lihat Detail
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}