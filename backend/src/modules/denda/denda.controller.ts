import { dendaService } from "./denda.service";
import { successResponse, errorResponse, paginatedResponse } from "../../utils/response";

export const dendaController = {
  // GET /api/denda
  getAll: async ({
    query,
  }: {
    query: {
      page?: string;
      limit?: string;
      status?: string;
      userId?: string;
    };
  }) => {
    try {
      const { data, meta } = await dendaService.getAll({
        page: query.page ? parseInt(query.page) : 1,
        limit: query.limit ? parseInt(query.limit) : 10,
        status: query.status,
        userId: query.userId,
      });
      return paginatedResponse(data, meta, "Berhasil mengambil semua denda");
    } catch (error) {
      return errorResponse("Gagal mengambil denda");
    }
  },

  // GET /api/denda/:id
  getById: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await dendaService.getById(params.id);
      if (!data) return errorResponse("Denda tidak ditemukan", 404);
      return successResponse(data, "Berhasil mengambil denda");
    } catch (error) {
      return errorResponse("Gagal mengambil denda");
    }
  },

  // GET /api/denda/peminjaman/:id
  getByPeminjaman: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await dendaService.getByPeminjaman(params.id);
      if (!data) return errorResponse("Denda tidak ditemukan", 404);
      return successResponse(data, "Berhasil mengambil denda");
    } catch (error) {
      return errorResponse("Gagal mengambil denda");
    }
  },

  // GET /api/denda/user/:userId
  getByUser: async ({
    params,
    query,
  }: {
    params: { userId: string };
    query: { page?: string; limit?: string; status?: string };
  }) => {
    try {
      const { data, meta } = await dendaService.getByUser(params.userId, {
        page: query.page ? parseInt(query.page) : 1,
        limit: query.limit ? parseInt(query.limit) : 10,
        status: query.status,
      });
      return paginatedResponse(data, meta, "Berhasil mengambil denda user");
    } catch (error) {
      return errorResponse("Gagal mengambil denda user");
    }
  },

  // GET /api/denda/user/:userId/total
  getTotalBelumLunas: async ({ params }: { params: { userId: string } }) => {
    try {
      const data = await dendaService.getTotalBelumLunas(params.userId);
      return successResponse(data, "Berhasil mengambil total denda");
    } catch (error) {
      return errorResponse("Gagal mengambil total denda");
    }
  },

  // PATCH /api/denda/:id/lunas
  lunas: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await dendaService.lunas(params.id);
      return successResponse(data, "Denda berhasil ditandai lunas");
    } catch (error: any) {
      if (error.message === "NOT_FOUND") return errorResponse("Denda tidak ditemukan", 404);
      if (error.message === "SUDAH_LUNAS") return errorResponse("Denda sudah lunas", 400);
      return errorResponse("Gagal menandai denda lunas");
    }
  },
};
