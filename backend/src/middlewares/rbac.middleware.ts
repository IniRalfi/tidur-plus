import { Elysia } from "elysia";
import { Role } from "@tidur-plus/shared";
import { errorResponse } from "../utils/response";
import { authMiddleware } from "./auth.middleware";

// Guard berdasarkan role
// Contoh penggunaan: .use(requireRole(Role.ADMIN))
export function requireRole(...allowedRoles: Role[]) {
  return new Elysia()
    .use(authMiddleware)
    .onBeforeHandle(({ user, set }) => {
      if (!user) {
        set.status = 401;
        return errorResponse("Unauthorized", 401);
      }

      const hasRole = user.roles.some((role) => allowedRoles.includes(role as Role));
      if (!hasRole) {
        set.status = 403;
        return errorResponse("Forbidden: Akses ditolak", 403);
      }
    });
}
