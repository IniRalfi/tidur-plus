import prisma from "../../lib/prisma";
import { getPagination, getPaginationMeta } from "../../utils/pagination";

// Placeholder auth - akan diisi Rafli
const checkAuth = () => true;
const checkRole = (_role: string) => true;

export const usersService = {
  // Get semua user
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
      // Filter by role → cek apakah role ada di array roles
      ...(role && {
        roles: { has: role as any },
      }),
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
          roles: true,      // ← array of role
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
        roles: true,
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

  // Update profil user
  updateProfil: async (
    id: string,
    body: { nama?: string; foto?: string }
  ) => {
    return await prisma.user.update({
      where: { id },
      data: body,
      select: {
        id: true,
        nama: true,
        email: true,
        foto: true,
        roles: true,
        aktif: true,
        updatedAt: true,
      },
    });
  },

  // Toggle role — ANGGOTA tidak bisa dihapus
  toggleRole: async (userId: string, role: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new Error("NOT_FOUND");

    // ANGGOTA adalah role default — tidak bisa di-toggle
    if (role === "ANGGOTA") throw new Error("CANNOT_TOGGLE_ANGGOTA");

    const validRoles = ["ADMIN", "SUPER_ADMIN"];
    if (!validRoles.includes(role)) throw new Error("INVALID_ROLE");

    const sudahPunyaRole = user.roles.includes(role as any);

    if (sudahPunyaRole) {
      // Hapus role dari array
      return await prisma.user.update({
        where: { id: userId },
        data: {
          roles: {
            set: user.roles.filter((r) => r !== role),
          },
        },
        select: {
          id: true,
          nama: true,
          email: true,
          roles: true,
          aktif: true,
        },
      });
    } else {
      // Tambah role ke array
      return await prisma.user.update({
        where: { id: userId },
        data: {
          roles: {
            push: role as any,
          },
        },
        select: {
          id: true,
          nama: true,
          email: true,
          roles: true,
          aktif: true,
        },
      });
    }
  },

  // Toggle aktif/nonaktif user
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
        roles: true,
        aktif: true,
      },
    });
  },

  // Hapus user
  delete: async (id: string) => {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) throw new Error("NOT_FOUND");

    return await prisma.user.delete({ where: { id } });
  },

  // Statistik user
  getStats: async () => {
    const [total, aktif, anggota, admin, superAdmin] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { aktif: true } }),
      prisma.user.count({ where: { roles: { has: "ANGGOTA" } } }),
      prisma.user.count({ where: { roles: { has: "ADMIN" } } }),
      prisma.user.count({ where: { roles: { has: "SUPER_ADMIN" } } }),
    ]);

    return { total, aktif, anggota, admin, superAdmin };
  },

  // Helper: cek apakah user punya role tertentu
  hasRole: async (userId: string, role: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { roles: true },
    });
    return user?.roles.includes(role as any) ?? false;
  },
};