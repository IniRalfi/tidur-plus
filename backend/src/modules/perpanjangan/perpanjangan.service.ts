import prisma from "../../lib/prisma";
import { getPagination, getPaginationMeta } from "../../utils/pagination";

export const perpanjanganService = {
  // Get semua perpanjangan
  getAll: async (params: {
    page?: number;
    limit?: number;
    status?: string;
  }) => {
    const { page = 1, limit = 10, status } = params;
    const { take, skip } = getPagination(page, limit);

    const where = {
      ...(status && { status: status as any }),
    };

    const [data, total] = await Promise.all([
      prisma.perpanjangan.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: "desc" },
        include: {
          peminjaman: {
            include: {
              user: {
                select: { id: true, nama: true, email: true },
              },
              buku: true,
            },
          },
        },
      }),
      prisma.perpanjangan.count({ where }),
    ]);

    return { data, meta: getPaginationMeta(total, page, limit) };
  },

  // Get perpanjangan by ID
  getById: async (id: string) => {
    return await prisma.perpanjangan.findUnique({
      where: { id },
      include: {
        peminjaman: {
          include: {
            user: {
              select: { id: true, nama: true, email: true },
            },
            buku: true,
          },
        },
      },
    });
  },

  // Get perpanjangan by peminjaman
  getByPeminjaman: async (peminjamanId: string) => {
    return await prisma.perpanjangan.findMany({
      where: { peminjamanId },
      orderBy: { createdAt: "desc" },
    });
  },

  // Anggota: ajukan perpanjangan
  create: async (peminjamanId: string, jumlahHari: 1 | 2 | 3) => {
    const peminjaman = await prisma.peminjaman.findUnique({
      where: { id: peminjamanId },
      include: { perpanjangan: true },
    });

    if (!peminjaman) throw new Error("NOT_FOUND");

    if (peminjaman.status !== "DIPINJAM")
      throw new Error("INVALID_STATUS");

    const config = await prisma.konfigurasi.findFirst();
    const maxPerpanjangan = config?.maxPerpanjangan ?? 2;

    // Cek counter perpanjangan
    if (peminjaman.counterPerpanjangan >= maxPerpanjangan) {
      throw new Error("MAX_PERPANJANGAN");
    }

    // Cek ada yang masih MENUNGGU
    const adaMenunggu = peminjaman.perpanjangan.some(
      (p) => p.status === "MENUNGGU"
    );

    if (adaMenunggu) throw new Error("SUDAH_DIAJUKAN");

    return await prisma.perpanjangan.create({
      data: {
        peminjamanId,
        jumlahHari,
        status: "MENUNGGU",
      },
      include: {
        peminjaman: {
          include: {
            buku: true,
          },
        },
      },
    });
  },

  // Admin: setujui perpanjangan
  approve: async (id: string, adminId: string) => {
    const perpanjangan = await prisma.perpanjangan.findUnique({
      where: { id },
      include: { peminjaman: true },
    });

    if (!perpanjangan) throw new Error("NOT_FOUND");

    if (perpanjangan.status !== "MENUNGGU")
      throw new Error("INVALID_STATUS");

    const batasKembaliLama =
      perpanjangan.peminjaman.batasKembali ?? new Date();

    const batasKembaliBaru = new Date(batasKembaliLama);

    batasKembaliBaru.setDate(
      batasKembaliBaru.getDate() + perpanjangan.jumlahHari
    );

    const [updated] = await prisma.$transaction([
      prisma.perpanjangan.update({
        where: { id },
        data: {
          status: "DISETUJUI",
          adminId,
          tglDiproses: new Date(),
        },
        include: {
          peminjaman: {
            include: {
              user: {
                select: { id: true, nama: true, email: true },
              },
              buku: true,
            },
          },
        },
      }),

      prisma.peminjaman.update({
        where: { id: perpanjangan.peminjamanId },
        data: {
          batasKembali: batasKembaliBaru,
          counterPerpanjangan: {
            increment: 1,
          },
        },
      }),
    ]);

    return updated;
  },

  // Admin: tolak perpanjangan
  tolak: async (id: string, adminId: string) => {
    const perpanjangan = await prisma.perpanjangan.findUnique({
      where: { id },
    });

    if (!perpanjangan) throw new Error("NOT_FOUND");

    if (perpanjangan.status !== "MENUNGGU")
      throw new Error("INVALID_STATUS");

    return await prisma.perpanjangan.update({
      where: { id },
      data: { status: "DITOLAK", adminId, tglDiproses: new Date() },
      include: {
        peminjaman: {
          include: {
            user: {
              select: { id: true, nama: true, email: true },
            },
            buku: true,
          },
        },
      },
    });
  },
};