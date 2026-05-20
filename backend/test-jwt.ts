import { PrismaClient } from "@prisma/client";
import { sign, verify } from "./src/utils/jwt";
const prisma = new PrismaClient();
async function main() {
  const user = await prisma.user.findFirst({ where: { email: "admin@tidurplus.id" } });
  const payload = { sub: user.id, email: user.email, roles: user.roles };
  const token = await sign(payload, process.env.JWT_SECRET, "15m");
  console.log("Token:", token);
  
  try {
    const decoded = await verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
  } catch (err) {
    console.log("Error verifying:", err);
  }
}
main();
