<<<<<<< HEAD
// TODO: denda service\nexport {}
=======
import prisma from "../../lib/prisma";
import { getPagination, getPaginationMeta } from "../../utils/pagination";

export const dendaService = {
  // Get semua denda dengan pagination & filter
  getAll: async (params: {
    page?: number;
    limit?: number;
    status?: string;
    userId?: string;
  }) => {
    const { page = 1, limit = 10, status, userId } = params;
    const { take, skip } = getPagination(page, limit);

    const where = {
      ...(status && { status: status as any }),
      ...(userId && {
        peminjaman: { userId },
      }),
    };

    const [data, total] = await Promise.all([
      prisma.denda.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: "desc" },
        include: {
          peminjaman: {
            include: {
              user: {
                select: {
                  id: true,
                  nama: true,
                  email: true,
                },
              },
              buku: {
                select: {
                  id: true,
                  judul: true,
                  cover: true,
                },
              },
            },
          },
        },
      }),
      prisma.denda.count({ where }),
    ]);

    return { data, meta: getPaginationMeta(total, page, limit) };
  },

  // Get denda by ID
  getById: async (id: string) => {
    return await prisma.denda.findUnique({
      where: { id },
      include: {
        peminjaman: {
          include: {
            user: {
              select: {
                id: true,
                nama: true,
                email: true,
              },
            },
            buku: {
              select: {
                id: true,
                judul: true,
                cover: true,
              },
            },
          },
        },
      },
    });
  },

  // Get denda by peminjaman
  getByPeminjaman: async (peminjamanId: string) => {
    return await prisma.denda.findUnique({
      where: { peminjamanId },
      include: {
        peminjaman: {
          include: {
            user: {
              select: {
                id: true,
                nama: true,
                email: true,
              },
            },
            buku: {
              select: {
                id: true,
                judul: true,
              },
            },
          },
        },
      },
    });
  },

  // Get denda by user
  getByUser: async (
    userId: string,
    params: {
      page?: number;
      limit?: number;
      status?: string;
    }
  ) => {
    const { page = 1, limit = 10, status } = params;
    const { take, skip } = getPagination(page, limit);

    const where = {
      peminjaman: { userId },
      ...(status && { status: status as any }),
    };

    const [data, total] = await Promise.all([
      prisma.denda.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: "desc" },
        include: {
          peminjaman: {
            include: {
              buku: {
                select: {
                  id: true,
                  judul: true,
                  cover: true,
                },
              },
            },
          },
        },
      }),
      prisma.denda.count({ where }),
    ]);

    return { data, meta: getPaginationMeta(total, page, limit) };
  },

  // Admin: tandai denda lunas
  lunas: async (id: string) => {
    const denda = await prisma.denda.findUnique({ where: { id } });
    if (!denda) throw new Error("NOT_FOUND");
    if (denda.status === "LUNAS") throw new Error("SUDAH_LUNAS");

    return await prisma.denda.update({
      where: { id },
      data: { status: "LUNAS" },
      include: {
        peminjaman: {
          include: {
            user: {
              select: {
                id: true,
                nama: true,
                email: true,
              },
            },
            buku: {
              select: {
                id: true,
                judul: true,
              },
            },
          },
        },
      },
    });
  },

  // Get total denda belum lunas by user
  getTotalBelumLunas: async (userId: string) => {
    const result = await prisma.denda.aggregate({
      where: {
        peminjaman: { userId },
        status: "BELUM_LUNAS",
      },
      _sum: { jumlah: true },
      _count: true,
    });

    return {
      total: result._sum.jumlah ?? 0,
      jumlahDenda: result._count,
    };
  },
};
>>>>>>> backend
