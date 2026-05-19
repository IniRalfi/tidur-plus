import { kategoriService } from "./kategori.service";
import { successResponse, errorResponse } from "../../utils/response";

export const kategoriController = {
  // GET /api/kategori
  getAll: async () => {
    try {
      const data = await kategoriService.getAll();
      return successResponse(data, "Berhasil mengambil semua kategori");
    } catch (error) {
      return errorResponse("Gagal mengambil kategori");
    }
  },

  // GET /api/kategori/:id
  getById: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await kategoriService.getById(params.id);
      if (!data) return errorResponse("Kategori tidak ditemukan", 404);
      return successResponse(data, "Berhasil mengambil kategori");
    } catch (error) {
      return errorResponse("Gagal mengambil kategori");
    }
  },

  // POST /api/kategori
  create: async ({ body }: { body: { nama: string } }) => {
    try {
      if (!body.nama) return errorResponse("Nama kategori wajib diisi", 400);
      const data = await kategoriService.create(body.nama);
      return successResponse(data, "Kategori berhasil dibuat");
    } catch (error: any) {
      if (error.code === "P2002")
        return errorResponse("Nama kategori sudah ada", 400);
      return errorResponse("Gagal membuat kategori");
    }
  },

  // PUT /api/kategori/:id
  update: async ({
    params,
    body,
  }: {
    params: { id: string };
    body: { nama: string };
  }) => {
    try {
      if (!body.nama) return errorResponse("Nama kategori wajib diisi", 400);
      const exists = await kategoriService.getById(params.id);
      if (!exists) return errorResponse("Kategori tidak ditemukan", 404);
      const data = await kategoriService.update(params.id, body.nama);
      return successResponse(data, "Kategori berhasil diupdate");
    } catch (error: any) {
      if (error.code === "P2002")
        return errorResponse("Nama kategori sudah ada", 400);
      return errorResponse("Gagal mengupdate kategori");
    }
  },

  // DELETE /api/kategori/:id
  delete: async ({ params }: { params: { id: string } }) => {
    try {
      const exists = await kategoriService.getById(params.id);
      if (!exists) return errorResponse("Kategori tidak ditemukan", 404);
      await kategoriService.delete(params.id);
      return successResponse(null, "Kategori berhasil dihapus");
    } catch (error: any) {
      if (error.code === "P2003")
        return errorResponse("Kategori masih dipakai oleh buku", 400);
      return errorResponse("Gagal menghapus kategori");
    }
  },
};