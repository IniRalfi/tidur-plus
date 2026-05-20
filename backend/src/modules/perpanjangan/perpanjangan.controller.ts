<<<<<<< HEAD
// TODO: perpanjangan controller\nexport {}
=======
import { perpanjanganService } from "./perpanjangan.service";
import {
  successResponse,
  errorResponse,
  paginatedResponse,
} from "../../utils/response";

export const perpanjanganController = {
  // GET /admin/perpanjangan
  getAll: async ({
    query,
  }: {
    query: { page?: string; limit?: string; status?: string };
  }) => {
    try {
      const { data, meta } = await perpanjanganService.getAll({
        page: query.page ? parseInt(query.page) : 1,
        limit: query.limit ? parseInt(query.limit) : 10,
        status: query.status,
      });
      return paginatedResponse(data, meta, "Berhasil mengambil perpanjangan");
    } catch (error) {
      return errorResponse("Gagal mengambil perpanjangan");
    }
  },

  // GET /admin/perpanjangan/:id
  getById: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await perpanjanganService.getById(params.id);
      if (!data) return errorResponse("Perpanjangan tidak ditemukan", 404);
      return successResponse(data, "Berhasil mengambil perpanjangan");
    } catch (error) {
      return errorResponse("Gagal mengambil perpanjangan");
    }
  },

  // GET /peminjaman/:peminjamanId/perpanjangan
  getByPeminjaman: async ({
    params,
  }: {
    params: { peminjamanId: string };
  }) => {
    try {
      const data = await perpanjanganService.getByPeminjaman(
        params.peminjamanId
      );
      return successResponse(data, "Berhasil mengambil riwayat perpanjangan");
    } catch (error) {
      return errorResponse("Gagal mengambil perpanjangan");
    }
  },

  // POST /peminjaman/:peminjamanId/perpanjangan
  create: async ({
    params,
    body,
  }: {
    params: { peminjamanId: string };
    body: { jumlahHari: 1 | 2 | 3 };
  }) => {
    try {
      const data = await perpanjanganService.create(
        params.peminjamanId,
        body.jumlahHari
      );
      return successResponse(data, "Perpanjangan berhasil diajukan");
    } catch (error: any) {
      if (error.message === "NOT_FOUND")
        return errorResponse("Peminjaman tidak ditemukan", 404);
      if (error.message === "INVALID_STATUS")
        return errorResponse("Buku belum berstatus dipinjam", 400);
      if (error.message === "MAX_PERPANJANGAN")
        return errorResponse(
          "Sudah mencapai batas maksimal perpanjangan (2x)",
          400
        );
      if (error.message === "SUDAH_DIAJUKAN")
        return errorResponse(
          "Perpanjangan sudah diajukan, tunggu persetujuan admin",
          400
        );
      return errorResponse("Gagal mengajukan perpanjangan");
    }
  },

  // PATCH /admin/perpanjangan/:id/approve
  approve: async ({
    params,
    body,
  }: {
    params: { id: string };
    body: { adminId: string };  // ← adminId dari body bukan params
  }) => {
    try {
      if (!body.adminId)
        return errorResponse("Admin ID wajib diisi", 400);

      const data = await perpanjanganService.approve(
        params.id,
        body.adminId  // ← kirim ke service
      );
      return successResponse(data, "Perpanjangan berhasil disetujui");
    } catch (error: any) {
      if (error.message === "NOT_FOUND")
        return errorResponse("Perpanjangan tidak ditemukan", 404);
      if (error.message === "INVALID_STATUS")
        return errorResponse("Status perpanjangan tidak valid", 400);
      return errorResponse("Gagal menyetujui perpanjangan");
    }
  },

  // PATCH /admin/perpanjangan/:id/tolak
  tolak: async ({
    params,
    body,
  }: {
    params: { id: string };
    body: { adminId: string };  // ← adminId dari body
  }) => {
    try {
      if (!body.adminId)
        return errorResponse("Admin ID wajib diisi", 400);

      const data = await perpanjanganService.tolak(
        params.id,
        body.adminId  // ← kirim ke service
      );
      return successResponse(data, "Perpanjangan berhasil ditolak");
    } catch (error: any) {
      if (error.message === "NOT_FOUND")
        return errorResponse("Perpanjangan tidak ditemukan", 404);
      if (error.message === "INVALID_STATUS")
        return errorResponse("Status perpanjangan tidak valid", 400);
      return errorResponse("Gagal menolak perpanjangan");
    }
  },
};
>>>>>>> backend
