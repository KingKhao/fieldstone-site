const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const crypto = require("node:crypto");
const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.admin.findFirst();
  if (existing) {
    console.log("Admin already provisioned:", existing.username);
    return;
  }
  const username = "marcus";
  const password = crypto.randomBytes(9).toString("base64url");
  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.admin.create({ data: { username, passwordHash } });
  console.log("ADMIN_USERNAME=" + username);
  console.log("ADMIN_PASSWORD=" + password);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
