import { Elysia, t } from "elysia";
import { peminjamanController } from "./peminjaman.controller";

export const peminjamanRoutes = new Elysia()
  // ===========================
  // ANGGOTA
  // ===========================
  .get("/peminjaman", peminjamanController.getAll)
  .get("/peminjaman/:id/perpanjangan", peminjamanController.getById)
  .post("/peminjaman", peminjamanController.create, {
    body: t.Object({
      userId: t.String(),
      bukuId: t.String(),
    }),
  })

  // ===========================
  // ADMIN
  // ===========================
  .get("/admin/peminjaman", peminjamanController.getAll)
  .get("/admin/peminjaman/:id", peminjamanController.getById)
  .patch("/admin/peminjaman/:id/approve", peminjamanController.approve)
  .patch("/admin/peminjaman/:id/tolak", peminjamanController.tolak)
  .patch("/admin/peminjaman/:id/kembalikan", peminjamanController.kembalikan);
