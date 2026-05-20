import { Elysia } from "elysia";
import { verify } from "../utils/jwt";
import { errorResponse } from "../utils/response";

export const authMiddleware = new Elysia({ name: "auth" }).derive({ as: 'global' }, async ({ request }) => {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return { user: null };
  }

  const token = authHeader.split(" ")[1];
  if (!token) return { user: null };

  const payload = await verify(token, process.env.JWT_SECRET!);
  return {
    user: {
      id: payload.sub as string,
      email: payload.email as string,
      roles: payload.roles as string[],
    },
  };
});

export const requireAuth = new Elysia({ name: "require-auth" })
  .use(authMiddleware)
  .onBeforeHandle({ as: 'global' }, ({ user, set }: any) => {
    if (!user) {
      set.status = 401;
      return errorResponse("Unauthorized", 401);
    }
  });
