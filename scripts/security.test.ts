import test from "node:test";
import assert from "node:assert/strict";
process.env.SESSION_SECRET = "synthetic-test-secret-not-a-live-credential";
Object.assign(process.env, { NODE_ENV: "test" });
let credential = "synthetic-bcrypt-fingerprint";
let adminExists = true;
const records = new Map<string, { key: string; value: unknown; updatedAt: Date }>();
const fake = {
  admin: { findUnique: async () => adminExists ? { username: "fixtureadmin", passwordHash: credential } : null },
  setting: {
    create: async ({ data }: { data: { key: string; value: unknown } }) => { records.set(data.key, { ...data, updatedAt: new Date() }); return data; },
    findUnique: async ({ where }: { where: { key: string } }) => records.get(where.key) ?? null,
    deleteMany: async ({ where }: { where: { key?: string | object } }) => { if (typeof where.key === "string") records.delete(where.key); return { count: 1 }; },
  },
};
// Only in this test process: no database, cookies, API keys or network connection.
(globalThis as unknown as { prisma: unknown }).prisma = fake;
test("admin sessions enforce tamper, expiry, logout and credential boundaries", async t => {
 const { createSessionToken, authenticatedUsername, revokeSession } = await import("../src/lib/session");
 const { verifySessionToken, mintSessionToken } = await import("../src/lib/session-token");
 await t.test("fresh session works and forged legacy/signature cookies fail", async () => {
  const token = await createSessionToken("fixtureadmin");
  assert.equal(await authenticatedUsername(token), "fixtureadmin");
  assert.equal(await verifySessionToken(token + "bad"), null);
  assert.equal(await authenticatedUsername("fixtureadmin.9999999999999.fake"), null);
 });
 await t.test("logout invalidates a copied cookie, not just browser cookie storage", async () => {
  const token = await createSessionToken("fixtureadmin"); await revokeSession(token);
  assert.equal(await authenticatedUsername(token), null);
 });
 await t.test("password changes invalidate old sessions", async () => {
  const token = await createSessionToken("fixtureadmin"); credential = "a-different-synthetic-hash";
  assert.equal(await authenticatedUsername(token), null);
 });
 await t.test("deleted admin and deleted session cannot access protected data", async () => {
  const token = await createSessionToken("fixtureadmin"); adminExists = false;
  assert.equal(await authenticatedUsername(token), null); adminExists = true;
  records.clear(); assert.equal(await authenticatedUsername(token), null);
 });
 await t.test("expired and non-finite expiry tokens fail closed", async () => {
  assert.equal(await verifySessionToken(await mintSessionToken("fixtureadmin", "a".repeat(32), Date.now()-1)), null);
  assert.equal(await verifySessionToken(await mintSessionToken("fixtureadmin", "a".repeat(32), Infinity)), null);
 });
});

test("public lead and setup endpoints cannot create records", async () => {
 const lead = await import("../src/app/api/leads/route"); const setup = await import("../src/app/api/admin/bootstrap/route");
 const response = await lead.POST(); assert.deepEqual(await response.json(), { ok: true, demo: true, stored: false, message: "Demo complete. Nothing was saved or sent; no estimate or callback was requested." });
 assert.equal((await setup.POST()).status, 410);
});
