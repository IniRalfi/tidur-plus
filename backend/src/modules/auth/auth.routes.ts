import { Elysia, t } from "elysia";
import { authController } from "./auth.controller";
import { requireAuth } from "../../middlewares/auth.middleware";

export const authRoutes = new Elysia({ prefix: "/auth" })
  .post("/register", authController.register, {
    body: t.Object({
      nama: t.String(),
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 6 }),
    }),
  })
  .post("/login", authController.login, {
    body: t.Object({
      email: t.String({ format: "email" }),
      password: t.String(),
    }),
  })
  .post("/refresh", authController.refresh, {
    body: t.Object({
      refreshToken: t.String(),
    }),
  })
  .get("/google", authController.googleLogin)
  .get("/google/callback", authController.googleCallback)
  .use(requireAuth)
  .get("/me", authController.getMe);
