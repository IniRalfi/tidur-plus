import { Elysia, t } from "elysia";
import { bukuController } from "./buku.controller";

export const bukuRoutes = new Elysia()
  // Public - Guest & Anggota
  .get("/katalog", bukuController.getAll)
  .get("/katalog/:id", bukuController.getById)

  // Admin only
  .post("/admin/buku", bukuController.create, {
    body: t.Object({
      judul: t.String(),
      penulis: t.String(),
      penerbit: t.Optional(t.String()),
      tahunTerbit: t.Optional(t.Number()),
      isbn: t.Optional(t.String()),
      stok: t.Number(),
      cover: t.Optional(t.String()),
      deskripsi: t.Optional(t.String()),
      kategoriId: t.String(),
    }),
  })
  .put("/admin/buku/:id", bukuController.update, {
    body: t.Object({
      judul: t.Optional(t.String()),
      penulis: t.Optional(t.String()),
      penerbit: t.Optional(t.String()),
      tahunTerbit: t.Optional(t.Number()),
      isbn: t.Optional(t.String()),
      stok: t.Optional(t.Number()),
      cover: t.Optional(t.String()),
      deskripsi: t.Optional(t.String()),
      kategoriId: t.Optional(t.String()),
    }),
  })
  .delete("/admin/buku/:id", bukuController.delete);