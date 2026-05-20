<<<<<<< HEAD
// TODO: perpanjangan routes\nexport {}
=======
import { Elysia, t } from "elysia";
import { perpanjanganController } from "./perpanjangan.controller";

export const perpanjanganRoutes = new Elysia()
  // ===========================
  // ANGGOTA
  // ===========================
  .get(
    "/peminjaman/perpanjangan/:peminjamanId",
    perpanjanganController.getByPeminjaman
  )
  .post(
    "/peminjaman/perpanjangan/:peminjamanId",
    perpanjanganController.create,
    {
      body: t.Object({
        jumlahHari: t.Union([
          t.Literal(1),
          t.Literal(2),
          t.Literal(3),
        ]),
      }),
    }
  )

  // ===========================
  // ADMIN
  // ===========================
  .get("/admin/perpanjangan", perpanjanganController.getAll)
  .get("/admin/perpanjangan/:id", perpanjanganController.getById)
  .patch("/admin/perpanjangan/:id/approve", perpanjanganController.approve, {
    body: t.Object({
      adminId: t.String(),
    }),
  })
  .patch("/admin/perpanjangan/:id/tolak", perpanjanganController.tolak, {
    body: t.Object({
      adminId: t.String(), 
    }),
  });
>>>>>>> backend
