import prisma from "../../lib/prisma";

export const kategoriService = {
  // Get semua kategori
  getAll: async () => {
    return await prisma.kategori.findMany({
      orderBy: { nama: "asc" },
      include: {
        _count: {
          select: { buku: true },
        },
      },
    });
  },

  // Get kategori by ID
  getById: async (id: string) => {
    return await prisma.kategori.findUnique({
      where: { id },
      include: {
        buku: true,
        _count: {
          select: { buku: true },
        },
      },
    });
  },

  // Buat kategori baru
  create: async (nama: string) => {
    return await prisma.kategori.create({
      data: { nama },
    });
  },

  // Update kategori
  update: async (id: string, nama: string) => {
    return await prisma.kategori.update({
      where: { id },
      data: { nama },
    });
  },

  // Hapus kategori
  delete: async (id: string) => {
    return await prisma.kategori.delete({
      where: { id },
    });
  },
};