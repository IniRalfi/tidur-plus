import { Elysia, t } from "elysia";
import { konfigurasiController } from "./konfigurasi.controller";

export const konfigurasiRoutes = new Elysia()
  // Super Admin only
  .get("/superadmin/konfigurasi", konfigurasiController.get)
  .put("/superadmin/konfigurasi", konfigurasiController.update, {
    body: t.Object({
      tarifDenda: t.Optional(t.Number()),
      durasiPinjam: t.Optional(t.Number()),
      maxPerpanjangan: t.Optional(t.Number()),
    }),
  });
