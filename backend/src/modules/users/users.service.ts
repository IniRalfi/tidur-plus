import prisma from "../../lib/prisma";
import { getPagination, getPaginationMeta } from "../../utils/pagination";

export const usersService = {
  // Get semua user dengan pagination & filter
  getAll: async (params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
  }) => {
    const { page = 1, limit = 10, search, role } = params;
    const { take, skip } = getPagination(page, limit);

    const where = {
      ...(search && {
        OR: [
          { nama: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      }),
      ...(role && { role: role as any }),
    };

    const [data, total] = await Promise.all([
      prisma.user.findMany({
        where,
        take,
        skip,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          nama: true,
          email: true,
          foto: true,
          role: true,
          aktif: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: { peminjaman: true },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return { data, meta: getPaginationMeta(total, page, limit) };
  },

  // Get user by ID
  getById: async (id: string) => {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        nama: true,
        email: true,
        foto: true,
        role: true,
        aktif: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: { peminjaman: true },
        },
      },
    });
  },

  // Get user by email
  getByEmail: async (email: string) => {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  // Update profil user (oleh user sendiri)
  updateProfil: async (
    id: string,
    body: {
      nama?: string;
      foto?: string;
    }
  ) => {
    return await prisma.user.update({
      where: { id },
      data: body,
      select: {
        id: true,
        nama: true,
        email: true,
        foto: true,
        role: true,
        aktif: true,
        updatedAt: true,
      },
    });
  },

  // Super Admin: update role user
  updateRole: async (id: string, role: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("NOT_FOUND");

    return await prisma.user.update({
      where: { id },
      data: { role: role as any },
      select: {
        id: true,
        nama: true,
        email: true,
        role: true,
        aktif: true,
      },
    });
  },

  // Super Admin: toggle aktif/nonaktif user
  toggleAktif: async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("NOT_FOUND");

    return await prisma.user.update({
      where: { id },
      data: { aktif: !user.aktif },
      select: {
        id: true,
        nama: true,
        email: true,
        role: true,
        aktif: true,
      },
    });
  },

  // Super Admin: hapus user
  delete: async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("NOT_FOUND");

    return await prisma.user.delete({
      where: { id },
    });
  },

  // Get statistik user (untuk dashboard)
  getStats: async () => {
    const [total, anggota, admin, superAdmin, aktif] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "ANGGOTA" } }),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.count({ where: { role: "SUPER_ADMIN" } }),
      prisma.user.count({ where: { aktif: true } }),
    ]);

    return { total, anggota, admin, superAdmin, aktif };
  },
};