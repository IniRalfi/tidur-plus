<<<<<<< HEAD
// TODO: konfigurasi service\nexport {}
=======
import prisma from "../../lib/prisma";

export const konfigurasiService = {
  // Get konfigurasi (selalu hanya 1 data)
  get: async () => {
    let config = await prisma.konfigurasi.findFirst();

    // Kalau belum ada, buat default
    if (!config) {
      config = await prisma.konfigurasi.create({
        data: {
          tarifDenda: 1000,
          durasiPinjam: 14,
          maxPerpanjangan: 2,
        },
      });
    }

    return config;
  },

  // Update konfigurasi
  update: async (body: {
    tarifDenda?: number;
    durasiPinjam?: number;
    maxPerpanjangan?: number;
  }) => {
    let config = await prisma.konfigurasi.findFirst();

    // Kalau belum ada, buat dulu
    if (!config) {
      return await prisma.konfigurasi.create({
        data: {
          tarifDenda: body.tarifDenda ?? 1000,
          durasiPinjam: body.durasiPinjam ?? 14,
          maxPerpanjangan: body.maxPerpanjangan ?? 1,
        },
      });
    }

    return await prisma.konfigurasi.update({
      where: { id: config.id },
      data: {
        ...(body.tarifDenda !== undefined && {
          tarifDenda: body.tarifDenda,
        }),
        ...(body.durasiPinjam !== undefined && {
          durasiPinjam: body.durasiPinjam,
        }),
        ...(body.maxPerpanjangan !== undefined && {
          maxPerpanjangan: body.maxPerpanjangan,
        }),
      },
    });
  },
};
>>>>>>> backend
