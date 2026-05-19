import { Elysia, t } from "elysia";
import { usersController } from "./users.controller";

export const usersRoutes = new Elysia()
  // Admin
  .get("/admin/anggota", usersController.getAll)
  .get("/admin/anggota/:id", usersController.getById)

  // Super Admin
  .get("/superadmin/users", usersController.getAll)
  .get("/superadmin/users/stats", usersController.getStats)
  .get("/superadmin/users/:id", usersController.getById)
  .patch("/superadmin/users/:id/role", usersController.updateRole, {
    body: t.Object({ role: t.String() }),
  })
  .patch("/superadmin/users/:id/toggle-aktif", usersController.toggleAktif)
  .delete("/superadmin/users/:id", usersController.delete)

  // User sendiri
  .put("/profil/:id", usersController.updateProfil, {
    body: t.Object({
      nama: t.Optional(t.String()),
      foto: t.Optional(t.String()),
    }),
  });