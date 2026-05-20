import { SignJWT, jwtVerify } from "jose";

export async function sign(payload: any, secret: string, expiresIn: string | number | Date) {
  const secretKey = new TextEncoder().encode(secret);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secretKey);
}

export async function verify(token: string, secret: string) {
  const secretKey = new TextEncoder().encode(secret);
  const { payload } = await jwtVerify(token, secretKey);
  return payload as any;
}
