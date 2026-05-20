import { authService, type RegisterBody, type LoginBody } from "./auth.service";
import { successResponse, errorResponse } from "../../utils/response";

export const authController = {
  register: async ({ body, set }: { body: RegisterBody; set: any }) => {
    try {
      const data = await authService.register(body);
      set.status = 201;
      return successResponse(data, "Registrasi berhasil");
    } catch (error: any) {
      set.status = 400;
      return errorResponse(error.message, 400);
    }
  },

  login: async ({ body, set }: { body: LoginBody; set: any }) => {
    try {
      const data = await authService.login(body);
      return successResponse(data, "Login berhasil");
    } catch (error: any) {
      set.status = 401;
      return errorResponse(error.message, 401);
    }
  },

  refresh: async ({ body, set }: { body: { refreshToken: string }; set: any }) => {
    try {
      const data = await authService.refresh(body.refreshToken);
      return successResponse(data, "Token berhasil diperbarui");
    } catch (error: any) {
      set.status = 401;
      return errorResponse(error.message, 401);
    }
  },

  getMe: async ({ user, set }: { user: any; set: any }) => {
    try {
      if (!user?.id) throw new Error("UNAUTHORIZED");
      const data = await authService.getMe(user.id);
      return successResponse(data, "Profil berhasil dimuat");
    } catch (error: any) {
      set.status = 401;
      return errorResponse(error.message, 401);
    }
  },
};
