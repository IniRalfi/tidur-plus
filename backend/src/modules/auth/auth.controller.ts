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

  getMe: async ({ user, set }: any) => {
    try {
      if (!user?.id) throw new Error("UNAUTHORIZED");
      const data = await authService.getMe(user.id);
      return successResponse(data, "Profil berhasil dimuat");
    } catch (error: any) {
      set.status = 401;
      return errorResponse(error.message, 401);
    }
  },

  googleLogin: async ({ set }: any) => {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const redirectUri = process.env.GOOGLE_REDIRECT_URI;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email profile`;
    set.redirect = url;
  },

  googleCallback: async ({ query, set }: any) => {
    const { code } = query;
    if (!code) {
      set.redirect = `${process.env.FRONTEND_URL}/login?error=auth_failed`;
      return;
    }
    
    try {
      const tokensRes = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID!,
          client_secret: process.env.GOOGLE_CLIENT_SECRET!,
          code: code as string,
          grant_type: "authorization_code",
          redirect_uri: process.env.GOOGLE_REDIRECT_URI!,
        }),
      });
      const tokens: any = await tokensRes.json();

      if (!tokens.access_token) throw new Error("Gagal mendapat token");

      const userRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
        headers: { Authorization: `Bearer ${tokens.access_token}` },
      });
      const googleUser: any = await userRes.json();

      if (!googleUser.email) throw new Error("Gagal mendapat email");

      const data = await authService.handleGoogleUser({
        email: googleUser.email,
        nama: googleUser.name || googleUser.given_name || "User",
        googleId: googleUser.id,
        foto: googleUser.picture,
      });

      set.redirect = `${process.env.FRONTEND_URL}/auth/google/callback?accessToken=${data.accessToken}&refreshToken=${data.refreshToken}`;
    } catch (error) {
      console.error(error);
      set.redirect = `${process.env.FRONTEND_URL}/login?error=auth_failed`;
    }
  },
};
