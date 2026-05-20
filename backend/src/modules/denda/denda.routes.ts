import { Elysia } from "elysia";
import { dendaController } from "./denda.controller";

export const dendaRoutes = new Elysia()
  // Anggota
  .get("/peminjaman/:id/denda", dendaController.getByPeminjaman)

  // Admin
  .get("/admin/denda", dendaController.getAll)
  .get("/admin/denda/:id", dendaController.getById)
  .patch("/admin/denda/:id/lunas", dendaController.lunas);
