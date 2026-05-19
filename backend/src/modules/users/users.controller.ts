import { usersService } from "./users.service";
import {
  successResponse,
  errorResponse,
  paginatedResponse,
} from "../../utils/response";

// Placeholder middleware
const checkAuth = () => true;
const checkRole = (_role: string) => true;

export const usersController = {
  // GET /admin/anggota & /superadmin/users
  getAll: async ({
    query,
  }: {
    query: {
      page?: string;
      limit?: string;
      search?: string;
      role?: string;
    };
  }) => {
    try {
      // Placeholder: checkAuth() & checkRole("ADMIN")
      const { data, meta } = await usersService.getAll({
        page: query.page ? parseInt(query.page) : 1,
        limit: query.limit ? parseInt(query.limit) : 10,
        search: query.search,
        role: query.role,
      });
      return paginatedResponse(data, meta, "Berhasil mengambil semua user");
    } catch (error) {
      return errorResponse("Gagal mengambil user");
    }
  },

  // GET /superadmin/users/stats
  getStats: async () => {
    try {
      // Placeholder: checkRole("SUPER_ADMIN")
      const data = await usersService.getStats();
      return successResponse(data, "Berhasil mengambil statistik user");
    } catch (error) {
      return errorResponse("Gagal mengambil statistik");
    }
  },

  // GET /superadmin/users/:id
  getById: async ({ params }: { params: { id: string } }) => {
    try {
      // Placeholder: checkRole("SUPER_ADMIN")
      const data = await usersService.getById(params.id);
      if (!data) return errorResponse("User tidak ditemukan", 404);
      return successResponse(data, "Berhasil mengambil user");
    } catch (error) {
      return errorResponse("Gagal mengambil user");
    }
  },

  // PUT /profil/:id
  updateProfil: async ({
    params,
    body,
  }: {
    params: { id: string };
    body: { nama?: string; foto?: string };
  }) => {
    try {
      // Placeholder: checkAuth() → hanya bisa update profil sendiri
      const exists = await usersService.getById(params.id);
      if (!exists) return errorResponse("User tidak ditemukan", 404);

      const data = await usersService.updateProfil(params.id, body);
      return successResponse(data, "Profil berhasil diupdate");
    } catch (error) {
      return errorResponse("Gagal mengupdate profil");
    }
  },

  // PATCH /superadmin/users/:id/toggle-role
  toggleRole: async ({
    params,
    body,
  }: {
    params: { id: string };
    body: { role: string };
  }) => {
    try {
      // Placeholder: checkRole("SUPER_ADMIN")
      if (!body.role)
        return errorResponse("Role wajib diisi", 400);

      const data = await usersService.toggleRole(params.id, body.role);

      const sudahAda = data.roles.includes(body.role as any);
      return successResponse(
        data,
        `Role ${body.role} berhasil ${sudahAda ? "ditambahkan" : "dilepas"}`
      );
    } catch (error: any) {
      if (error.message === "NOT_FOUND")
        return errorResponse("User tidak ditemukan", 404);
      if (error.message === "CANNOT_TOGGLE_ANGGOTA")
        return errorResponse(
          "Role ANGGOTA adalah role default dan tidak bisa dilepas",
          400
        );
      if (error.message === "INVALID_ROLE")
        return errorResponse(
          "Role tidak valid. Pilihan: ADMIN, SUPER_ADMIN",
          400
        );
      return errorResponse("Gagal toggle role");
    }
  },

  // PATCH /superadmin/users/:id/toggle-aktif
  toggleAktif: async ({ params }: { params: { id: string } }) => {
    try {
      // Placeholder: checkRole("SUPER_ADMIN")
      const data = await usersService.toggleAktif(params.id);
      return successResponse(
        data,
        `User berhasil ${data.aktif ? "diaktifkan" : "dinonaktifkan"}`
      );
    } catch (error: any) {
      if (error.message === "NOT_FOUND")
        return errorResponse("User tidak ditemukan", 404);
      return errorResponse("Gagal mengubah status user");
    }
  },

  // DELETE /superadmin/users/:id
  delete: async ({ params }: { params: { id: string } }) => {
    try {
      // Placeholder: checkRole("SUPER_ADMIN")
      await usersService.delete(params.id);
      return successResponse(null, "User berhasil dihapus");
    } catch (error: any) {
      if (error.message === "NOT_FOUND")
        return errorResponse("User tidak ditemukan", 404);
      return errorResponse("Gagal menghapus user");
    }
  },
};