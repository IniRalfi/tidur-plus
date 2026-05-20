import { Elysia } from "elysia";
import { kategoriRoutes } from "./modules/kategori/kategori.routes";
import { bukuRoutes } from "./modules/buku/buku.routes";
import { peminjamanRoutes } from "./modules/peminjaman/peminjaman.routes";
import { perpanjanganRoutes } from "./modules/perpanjangan/perpanjangan.routes";
import { dendaRoutes } from "./modules/denda/denda.routes";
import { usersRoutes } from "./modules/users/users.routes";
import { konfigurasiRoutes } from "./modules/konfigurasi/konfigurasi.routes";

const app = new Elysia()
  .get("/", () => ({
    message: "Tidur Plus API is running! 🚀",
    version: "1.0.0",
  }))
  .use(kategoriRoutes)
  .use(bukuRoutes)
  .use(peminjamanRoutes)
  .use(perpanjanganRoutes)
  .use(dendaRoutes)
  .use(usersRoutes)
  .use(konfigurasiRoutes)
  .listen(process.env.PORT ?? 3000);

console.log(`🚀 Server running at http://localhost:${app.server?.port}`);

export type App = typeof app;
