import prisma from "../../lib/prisma";
import { getPagination, getPaginationMeta } from "../../utils/pagination";

export const peminjamanService = {
  // Get semua peminjaman
  getAll: async (params: { page?: number; limit?: number; status?: string; userId?: string }) => {
    const { page = 1, limit = 10, status, userId } = params;
    const { take, skip } = getPagination(page, limit);

    const where = {
      ...(status && { status: status as any }),
      ...(userId && { userId }),
    };

    const [data, total] = await Promise.all([
      prisma.peminjaman.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { id: true, nama: true, email: true, foto: true },
          },
          buku: { include: { kategori: true } },
          perpanjangan: true,
          denda: true,
        },
      }),
      prisma.peminjaman.count({ where }),
    ]);

    return { data, meta: getPaginationMeta(total, page, limit) };
  },

  // Get peminjaman by ID
  getById: async (id: string) => {
    return await prisma.peminjaman.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, nama: true, email: true, foto: true },
        },
        buku: { include: { kategori: true } },
        perpanjangan: true,
        denda: true,
      },
    });
  },

  // Get peminjaman by user
  getByUser: async (userId: string, params: { page?: number; limit?: number; status?: string }) => {
    const { page = 1, limit = 10, status } = params;
    const { take, skip } = getPagination(page, limit);

    const where = {
      userId,
      ...(status && { status: status as any }),
    };

    const [data, total] = await Promise.all([
      prisma.peminjaman.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: "desc" },
        include: {
          buku: { include: { kategori: true } },
          perpanjangan: true,
          denda: true,
        },
      }),
      prisma.peminjaman.count({ where }),
    ]);

    return { data, meta: getPaginationMeta(total, page, limit) };
  },

  // Anggota: ajukan peminjaman
  create: async (userId: string, bukuId: string) => {
    // Cek buku ada
    const buku = await prisma.buku.findUnique({ where: { id: bukuId } });
    if (!buku) throw new Error("BUKU_NOT_FOUND");
    if (buku.stok <= 0) throw new Error("STOK_HABIS");

    // Cek apakah user sudah pinjam buku yang sama dan masih aktif
    const existingBuku = await prisma.peminjaman.findFirst({
      where: {
        userId,
        bukuId,
        status: { in: ["MENUNGGU", "DIPINJAM"] },
      },
    });
    if (existingBuku) throw new Error("SUDAH_DIPINJAM");

    // Cek batas 2 buku aktif per user
    const totalAktif = await prisma.peminjaman.count({
      where: {
        userId,
        status: { in: ["MENUNGGU", "DIPINJAM"] },
      },
    });
    if (totalAktif >= 2) throw new Error("BATAS_PINJAM");

    const dendaBelumLunas = await prisma.denda.findFirst({
      where: {
        peminjaman: { userId },
        status: "BELUM_LUNAS",
      },
    });
    if (dendaBelumLunas) throw new Error("ADA_DENDA");

    // Ambil konfigurasi durasi pinjam
    const config = await prisma.konfigurasi.findFirst();
    const durasiPinjam = config?.durasiPinjam ?? 14;

    // Hitung batas kembali
    const batasKembali = new Date();
    batasKembali.setDate(batasKembali.getDate() + durasiPinjam);

    return await prisma.peminjaman.create({
      data: {
        userId,
        bukuId,
        batasKembali,
        status: "MENUNGGU",
      },
      include: {
        buku: true,
        user: { select: { id: true, nama: true, email: true } },
      },
    });
  },

  // Admin: setujui peminjaman
  approve: async (id: string) => {
    const peminjaman = await prisma.peminjaman.findUnique({ where: { id } });
    if (!peminjaman) throw new Error("NOT_FOUND");
    if (peminjaman.status !== "MENUNGGU") throw new Error("INVALID_STATUS");

    await prisma.buku.update({
      where: { id: peminjaman.bukuId },
      data: { stok: { decrement: 1 } },
    });

    return await prisma.peminjaman.update({
      where: { id },
      data: {
        status: "DIPINJAM",
        tanggalPinjam: new Date(),
      },
      include: {
        buku: true,
        user: { select: { id: true, nama: true, email: true } },
      },
    });
  },

  // Admin: tolak peminjaman
  tolak: async (id: string) => {
    const peminjaman = await prisma.peminjaman.findUnique({ where: { id } });
    if (!peminjaman) throw new Error("NOT_FOUND");
    if (peminjaman.status !== "MENUNGGU") throw new Error("INVALID_STATUS");

    return await prisma.peminjaman.update({
      where: { id },
      data: { status: "DITOLAK" },
    });
  },

  // Admin: kembalikan buku
  kembalikan: async (id: string) => {
    const peminjaman = await prisma.peminjaman.findUnique({
      where: { id },
      include: { denda: true },
    });
    if (!peminjaman) throw new Error("NOT_FOUND");
    if (peminjaman.status !== "DIPINJAM") throw new Error("INVALID_STATUS");

    const tanggalKembali = new Date();

    await prisma.buku.update({
      where: { id: peminjaman.bukuId },
      data: { stok: { increment: 1 } },
    });

    // Hitung denda kalau terlambat
    let denda = null;
    if (peminjaman.batasKembali && tanggalKembali > peminjaman.batasKembali) {
      const config = await prisma.konfigurasi.findFirst();
      const tarifPerHari = config?.tarifDenda ?? 1000;
      const selisihMs = tanggalKembali.getTime() - peminjaman.batasKembali.getTime();
      const selisihHari = Math.ceil(selisihMs / (1000 * 60 * 60 * 24));
      const jumlahDenda = selisihHari * tarifPerHari;

      denda = await prisma.denda.create({
        data: {
          peminjamanId: id,
          jumlah: jumlahDenda,
          jumlahHariTelat: selisihHari,
          tarifPerHari: tarifPerHari,
          status: "BELUM_LUNAS",
        },
      });
    }

    const updated = await prisma.peminjaman.update({
      where: { id },
      data: { status: "DIKEMBALIKAN", tanggalKembali },
      include: { buku: true, denda: true },
    });

    return { peminjaman: updated, denda };
  },
};
