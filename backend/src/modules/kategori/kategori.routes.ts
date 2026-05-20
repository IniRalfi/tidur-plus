<<<<<<< HEAD
// TODO: kategori routes\nexport {}
=======
import { Elysia, t } from "elysia";
import { kategoriController } from "./kategori.controller";

export const kategoriRoutes = new Elysia({ prefix: "/api/kategori" })
  // Public - semua bisa akses
  .get("/", kategoriController.getAll)
  .get("/:id", kategoriController.getById)

// di .post()
  .post("/", kategoriController.create, {
    body: t.Object({
      nama: t.String(),
    }),
  })
  // di .put()
  .put("/:id", kategoriController.update, {
    body: t.Object({
      nama: t.String(),
    }),
  })
  .delete("/:id", kategoriController.delete);
>>>>>>> backend
