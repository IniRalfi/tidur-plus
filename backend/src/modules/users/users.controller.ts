<<<<<<< HEAD
// TODO: users controller\nexport {}
=======
import { usersService } from "./users.service";
import {
  successResponse,
  errorResponse,
  paginatedResponse,
} from "../../utils/response";

export const usersController = {
  // GET /api/users
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

  // GET /api/users/stats
  getStats: async () => {
    try {
      const data = await usersService.getStats();
      return successResponse(data, "Berhasil mengambil statistik user");
    } catch (error) {
      return errorResponse("Gagal mengambil statistik user");
    }
  },

  // GET /api/users/:id
  getById: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await usersService.getById(params.id);
      if (!data) return errorResponse("User tidak ditemukan", 404);
      return successResponse(data, "Berhasil mengambil user");
    } catch (error) {
      return errorResponse("Gagal mengambil user");
    }
  },

  // PUT /api/users/:id/profil
  updateProfil: async ({
    params,
    body,
  }: {
    params: { id: string };
    body: { nama?: string; foto?: string };
  }) => {
    try {
      const exists = await usersService.getById(params.id);
      if (!exists) return errorResponse("User tidak ditemukan", 404);

      const data = await usersService.updateProfil(params.id, body);
      return successResponse(data, "Profil berhasil diupdate");
    } catch (error) {
      return errorResponse("Gagal mengupdate profil");
    }
  },

  // PATCH /api/users/:id/role
  updateRole: async ({
    params,
    body,
  }: {
    params: { id: string };
    body: { role: string };
  }) => {
    try {
      if (!body.role) return errorResponse("Role wajib diisi", 400);

      const validRoles = ["ANGGOTA", "ADMIN", "SUPER_ADMIN"];
      if (!validRoles.includes(body.role))
        return errorResponse("Role tidak valid", 400);

      const data = await usersService.updateRole(params.id, body.role);
      return successResponse(data, "Role berhasil diupdate");
    } catch (error: any) {
      if (error.message === "NOT_FOUND")
        return errorResponse("User tidak ditemukan", 404);
      return errorResponse("Gagal mengupdate role");
    }
  },

  // PATCH /api/users/:id/toggle-aktif
  toggleAktif: async ({ params }: { params: { id: string } }) => {
    try {
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

  // DELETE /api/users/:id
  delete: async ({ params }: { params: { id: string } }) => {
    try {
      await usersService.delete(params.id);
      return successResponse(null, "User berhasil dihapus");
    } catch (error: any) {
      if (error.message === "NOT_FOUND")
        return errorResponse("User tidak ditemukan", 404);
      return errorResponse("Gagal menghapus user");
    }
  },
};
>>>>>>> backend
