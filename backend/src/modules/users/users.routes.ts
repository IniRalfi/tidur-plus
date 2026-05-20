import { Elysia, t } from "elysia";
import { usersController } from "./users.controller";

export const usersRoutes = new Elysia()
  // ADMIN
  .get("/admin/anggota", usersController.getAll)
  .get("/admin/anggota/:id", usersController.getById)

  // SUPER ADMIN
  .get("/superadmin/users", usersController.getAll)
  .get("/superadmin/users/stats", usersController.getStats)
  .get("/superadmin/users/:id", usersController.getById)
  .patch("/superadmin/users/:id/toggle-role", usersController.toggleRole, {
    body: t.Object({
      role: t.String(),
    }),
  })
  .patch("/superadmin/users/:id/toggle-aktif", usersController.toggleAktif)
  .delete("/superadmin/users/:id", usersController.delete)

  // USER SENDIRI
  .put("/profil/:id", usersController.updateProfil, {
    body: t.Object({
      nama: t.Optional(t.String()),
      foto: t.Optional(t.String()),
    }),
  });
