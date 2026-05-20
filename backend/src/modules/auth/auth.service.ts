import prisma from "../../lib/prisma";

// ─── Helper: Hash & Compare Password (menggunakan Bun built-in) ───────────────

export async function hashPassword(plain: string): Promise<string> {
  return await Bun.password.hash(plain, { algorithm: "bcrypt", cost: 10 });
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return await Bun.password.verify(plain, hash);
}

// ─── Helper: Sign & Verify JWT (menggunakan @elysiajs/jwt pattern) ───────────

import { sign, verify } from "../../utils/jwt";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthPayload {
  sub: string;  // user ID
  email: string;
  roles: string[];
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  nama: string;
  email: string;
  password: string;
}

// ─── Service ─────────────────────────────────────────────────────────────────

export const authService = {
  // POST /auth/register — daftar user baru (role ANGGOTA)
  register: async (body: RegisterBody) => {
    const existing = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existing) throw new Error("EMAIL_TAKEN");

    const hashed = await hashPassword(body.password);

    const user = await prisma.user.create({
      data: {
        nama: body.nama,
        email: body.email,
        password: hashed,
        roles: ["ANGGOTA"],
      },
      select: {
        id: true,
        nama: true,
        email: true,
        roles: true,
        foto: true,
        aktif: true,
        createdAt: true,
      },
    });

    const { accessToken, refreshToken } = await signTokens({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });

    return { user, accessToken, refreshToken };
  },

  // POST /auth/login — login dengan email + password
  login: async (body: LoginBody) => {
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) throw new Error("INVALID_CREDENTIALS");
    if (!user.aktif) throw new Error("ACCOUNT_INACTIVE");
    if (!user.password) throw new Error("USE_GOOGLE_LOGIN");

    const valid = await verifyPassword(body.password, user.password);
    if (!valid) throw new Error("INVALID_CREDENTIALS");

    const { accessToken, refreshToken } = await signTokens({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });

    return {
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        roles: user.roles,
        foto: user.foto,
        aktif: user.aktif,
      },
      accessToken,
      refreshToken,
    };
  },

  // POST /auth/refresh — perbarui access token dengan refresh token
  refresh: async (refreshToken: string) => {
    let payload: AuthPayload;
    try {
      payload = await verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    } catch {
      throw new Error("INVALID_REFRESH_TOKEN");
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: { id: true, email: true, roles: true, aktif: true },
    });

    if (!user || !user.aktif) throw new Error("USER_NOT_FOUND");

    const { accessToken } = await signTokens({
      sub: user.id,
      email: user.email,
      roles: user.roles,
    });

    return { accessToken };
  },

  // GET /auth/me — ambil profil dari token
  getMe: async (userId: string) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        nama: true,
        email: true,
        roles: true,
        foto: true,
        aktif: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) throw new Error("NOT_FOUND");
    return user;
  },
};

// ─── Internal: sign access + refresh token ────────────────────────────────────

async function signTokens(payload: AuthPayload) {
  const accessToken = await sign(payload, process.env.JWT_SECRET!, "15m");
  const refreshToken = await sign(payload, process.env.JWT_REFRESH_SECRET!, "7d");
  return { accessToken, refreshToken };
}
