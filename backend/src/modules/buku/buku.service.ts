<<<<<<< HEAD
// TODO: buku service\nexport {}
=======
import prisma from "../../lib/prisma";
import { getPagination, getPaginationMeta } from "../../utils/pagination";

export const bukuService = {
  // Get semua buku dengan pagination & filter
  getAll: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    kategoriId?: string;
  }) => {
    const { page = 1, limit = 10, search, kategoriId } = params;
    const { take, skip } = getPagination(page, limit);

    const where = {
      ...(search && {
        OR: [
          { judul: { contains: search, mode: "insensitive" as const } },
          { penulis: { contains: search, mode: "insensitive" as const } },
          { isbn: { contains: search, mode: "insensitive" as const } },
        ],
      }),
      ...(kategoriId && { kategoriId }),
    };

    const [data, total] = await Promise.all([
      prisma.buku.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: "desc" },
        include: {
          kategori: true,
        },
      }),
      prisma.buku.count({ where }),
    ]);

    return { data, meta: getPaginationMeta(total, page, limit) };
  },

  // Get buku by ID
  getById: async (id: string) => {
    return await prisma.buku.findUnique({
      where: { id },
      include: {
        kategori: true,
        _count: {
          select: { peminjaman: true },
        },
      },
    });
  },

  // Buat buku baru
  create: async (body: {
    judul: string;
    penulis: string;
    penerbit?: string;
    tahunTerbit?: number;
    isbn?: string;
    stok: number;
    cover?: string;
    deskripsi?: string;
    kategoriId: string;
  }) => {
    return await prisma.buku.create({
      data: body,
      include: { kategori: true },
    });
  },

  // Update buku
  update: async (
    id: string,
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
    }
  ) => {
    return await prisma.buku.update({
      where: { id },
      data: body,
      include: { kategori: true },
    });
  },

  // Hapus buku
  delete: async (id: string) => {
    return await prisma.buku.delete({
      where: { id },
    });
  },

  // Update stok buku
  updateStok: async (id: string, jumlah: number) => {
    return await prisma.buku.update({
      where: { id },
      data: { stok: { increment: jumlah } },
    });
  },
};
>>>>>>> backend
