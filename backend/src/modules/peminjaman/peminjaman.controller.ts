import { peminjamanService } from "./peminjaman.service";
import { successResponse, errorResponse, paginatedResponse } from "../../utils/response";

export const peminjamanController = {
  // GET /api/peminjaman
  getAll: async ({
    query,
  }: {
    query: { page?: string; limit?: string; status?: string; userId?: string };
  }) => {
    try {
      const { data, meta } = await peminjamanService.getAll({
        page: query.page ? parseInt(query.page) : 1,
        limit: query.limit ? parseInt(query.limit) : 10,
        status: query.status,
        userId: query.userId,
      });
      return paginatedResponse(data, meta, "Berhasil mengambil semua peminjaman");
    } catch (error) {
      return errorResponse("Gagal mengambil peminjaman");
    }
  },

  // GET /api/peminjaman/:id
  getById: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await peminjamanService.getById(params.id);
      if (!data) return errorResponse("Peminjaman tidak ditemukan", 404);
      return successResponse(data, "Berhasil mengambil peminjaman");
    } catch (error) {
      return errorResponse("Gagal mengambil peminjaman");
    }
  },

  // GET /api/peminjaman/user/:userId
  getByUser: async ({
    params,
    query,
  }: {
    params: { userId: string };
    query: { page?: string; limit?: string; status?: string };
  }) => {
    try {
      const { data, meta } = await peminjamanService.getByUser(params.userId, {
        page: query.page ? parseInt(query.page) : 1,
        limit: query.limit ? parseInt(query.limit) : 10,
        status: query.status,
      });
      return paginatedResponse(data, meta, "Berhasil mengambil peminjaman user");
    } catch (error) {
      return errorResponse("Gagal mengambil peminjaman user");
    }
  },

  // POST /api/peminjaman
  create: async ({ body }: { body: { userId: string; bukuId: string } }) => {
    try {
      if (!body.userId) return errorResponse("User wajib diisi", 400);
      if (!body.bukuId) return errorResponse("Buku wajib diisi", 400);

      const data = await peminjamanService.create(body.userId, body.bukuId);
      return successResponse(data, "Peminjaman berhasil diajukan");
    } catch (error: any) {
      if (error.message === "BUKU_NOT_FOUND") return errorResponse("Buku tidak ditemukan", 404);
      if (error.message === "STOK_HABIS") return errorResponse("Stok buku habis", 400);
      if (error.message === "SUDAH_DIPINJAM")
        return errorResponse("Kamu sudah meminjam buku ini", 400);
      if (error.message === "ADA_DENDA")
        return errorResponse(
          "Kamu masih memiliki denda yang belum lunas, selesaikan dulu sebelum meminjam",
          400
        );
      return errorResponse("Gagal mengajukan peminjaman");
    }
  },

  // PATCH /api/peminjaman/:id/approve
  approve: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await peminjamanService.approve(params.id);
      return successResponse(data, "Peminjaman berhasil disetujui");
    } catch (error: any) {
      if (error.message === "NOT_FOUND") return errorResponse("Peminjaman tidak ditemukan", 404);
      if (error.message === "INVALID_STATUS")
        return errorResponse("Status peminjaman tidak valid", 400);
      return errorResponse("Gagal menyetujui peminjaman");
    }
  },

  // PATCH /api/peminjaman/:id/tolak
  tolak: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await peminjamanService.tolak(params.id);
      return successResponse(data, "Peminjaman berhasil ditolak");
    } catch (error: any) {
      if (error.message === "NOT_FOUND") return errorResponse("Peminjaman tidak ditemukan", 404);
      if (error.message === "INVALID_STATUS")
        return errorResponse("Status peminjaman tidak valid", 400);
      return errorResponse("Gagal menolak peminjaman");
    }
  },

  // PATCH /api/peminjaman/:id/kembalikan
  kembalikan: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await peminjamanService.kembalikan(params.id);
      return successResponse(data, "Buku berhasil dikembalikan");
    } catch (error: any) {
      if (error.message === "NOT_FOUND") return errorResponse("Peminjaman tidak ditemukan", 404);
      if (error.message === "INVALID_STATUS") return errorResponse("Buku belum dipinjam", 400);
      return errorResponse("Gagal mengembalikan buku");
    }
  },
};
