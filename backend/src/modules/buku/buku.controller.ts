import { bukuService } from "./buku.service";
import {
  successResponse,
  errorResponse,
  paginatedResponse,
} from "../../utils/response";

export const bukuController = {
  // GET /api/buku
  getAll: async ({
    query,
  }: {
    query: {
      page?: string;
      limit?: string;
      search?: string;
      kategoriId?: string;
    };
  }) => {
    try {
      const { data, meta } = await bukuService.getAll({
        page: query.page ? parseInt(query.page) : 1,
        limit: query.limit ? parseInt(query.limit) : 10,
        search: query.search,
        kategoriId: query.kategoriId,
      });
      return paginatedResponse(data, meta, "Berhasil mengambil semua buku");
    } catch (error) {
      return errorResponse("Gagal mengambil buku");
    }
  },

  // GET /api/buku/:id
  getById: async ({ params }: { params: { id: string } }) => {
    try {
      const data = await bukuService.getById(params.id);
      if (!data) return errorResponse("Buku tidak ditemukan", 404);
      return successResponse(data, "Berhasil mengambil buku");
    } catch (error) {
      return errorResponse("Gagal mengambil buku");
    }
  },

  // POST /api/buku
  create: async ({
    body,
  }: {
    body: {
      judul: string;
      penulis: string;
      penerbit?: string;
      tahunTerbit?: number;
      isbn?: string;
      stok: number;
      cover?: string;
      deskripsi?: string;
      kategoriId: string;
    };
  }) => {
    try {
      if (!body.judul) return errorResponse("Judul wajib diisi", 400);
      if (!body.penulis) return errorResponse("Penulis wajib diisi", 400);
      if (!body.kategoriId) return errorResponse("Kategori wajib diisi", 400);
      if (body.stok < 0) return errorResponse("Stok tidak boleh negatif", 400);

      const data = await bukuService.create(body);
      return successResponse(data, "Buku berhasil ditambahkan");
    } catch (error: any) {
      if (error.code === "P2002")
        return errorResponse("ISBN sudah terdaftar", 400);
      if (error.code === "P2003")
        return errorResponse("Kategori tidak ditemukan", 404);
      return errorResponse("Gagal menambahkan buku");
    }
  },

  // PUT /api/buku/:id
  update: async ({
    params,
    body,
  }: {
    params: { id: string };
    body: {
      judul?: string;
      penulis?: string;
      penerbit?: string;
      tahunTerbit?: number;
      isbn?: string;
      stok?: number;
      cover?: string;
      deskripsi?: string;
      kategoriId?: string;
    };
  }) => {
    try {
      const exists = await bukuService.getById(params.id);
      if (!exists) return errorResponse("Buku tidak ditemukan", 404);
      if (body.stok !== undefined && body.stok < 0)
        return errorResponse("Stok tidak boleh negatif", 400);

      const data = await bukuService.update(params.id, body);
      return successResponse(data, "Buku berhasil diupdate");
    } catch (error: any) {
      if (error.code === "P2002")
        return errorResponse("ISBN sudah terdaftar", 400);
      if (error.code === "P2003")
        return errorResponse("Kategori tidak ditemukan", 404);
      return errorResponse("Gagal mengupdate buku");
    }
  },

  // DELETE /api/buku/:id
  delete: async ({ params }: { params: { id: string } }) => {
    try {
      const exists = await bukuService.getById(params.id);
      if (!exists) return errorResponse("Buku tidak ditemukan", 404);
      await bukuService.delete(params.id);
      return successResponse(null, "Buku berhasil dihapus");
    } catch (error: any) {
      if (error.code === "P2003")
        return errorResponse("Buku masih memiliki peminjaman aktif", 400);
      return errorResponse("Gagal menghapus buku");
    }
  },
};