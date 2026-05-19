import { konfigurasiService } from "./konfigurasi.service";
import { successResponse, errorResponse } from "../../utils/response";

export const konfigurasiController = {
  // GET /api/konfigurasi
  get: async () => {
    try {
      const data = await konfigurasiService.get();
      return successResponse(data, "Berhasil mengambil konfigurasi");
    } catch (error) {
      return errorResponse("Gagal mengambil konfigurasi");
    }
  },

  // PUT /api/konfigurasi
  update: async ({
    body,
  }: {
    body: {
      tarifDenda?: number;
      durasiPinjam?: number;
      maxPerpanjangan?: number;
    };
  }) => {
    try {
      // Validasi nilai tidak boleh negatif
      if (body.tarifDenda !== undefined && body.tarifDenda < 0)
        return errorResponse("Tarif denda tidak boleh negatif", 400);
      if (body.durasiPinjam !== undefined && body.durasiPinjam < 1)
        return errorResponse("Durasi pinjam minimal 1 hari", 400);
      if (body.maxPerpanjangan !== undefined && body.maxPerpanjangan < 0)
        return errorResponse("Maksimal perpanjangan tidak boleh negatif", 400);

      const data = await konfigurasiService.update(body);
      return successResponse(data, "Konfigurasi berhasil diupdate");
    } catch (error) {
      return errorResponse("Gagal mengupdate konfigurasi");
    }
  },
};