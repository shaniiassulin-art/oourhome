import { getStore } from "@netlify/blobs";
import SEED from "./seed.mjs";
import { IMPORT_FLAG, CATS as IMPORT_CATS, ITEMS as IMPORT_ITEMS } from "./shop-import.mjs";

// GET    /api/tasks      -> { tasks: { id: task } }
// PUT    /api/tasks/:id  -> save one task
// DELETE /api/tasks/:id  -> delete one task
// Each task is its own blob, so edits to different tasks from different devices never overwrite each other.

const ID = /^[A-Za-z0-9_-]{1,64}$/;
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

export default async (req, context) => {
  const store = getStore({ name: "house-tasks", consistency: "strong" });
  const id = context.params?.id;

  if (req.method === "GET" && !id) {
    const { blobs } = await store.list({ prefix: "t/" });
    if (!blobs.length && !(await store.get("meta/seeded"))) {
      await Promise.all(Object.entries(SEED).map(([k, v]) => store.setJSON("t/" + k, v)));
      await store.set("meta/seeded", new Date().toISOString());
      return json({ tasks: SEED });
    }
    const entries = await Promise.all(
      blobs.map(async (b) => [b.key.slice(2), await store.get(b.key, { type: "json" })])
    );
    const docs = Object.fromEntries(entries.filter(([, v]) => v));
    if (!(await store.get(IMPORT_FLAG))) await importShopping(store, docs);
    return json({ tasks: docs });
  }

  if (!id || !ID.test(id)) return json({ error: "מזהה משימה לא תקין" }, 400);

  if (req.method === "PUT") {
    let body;
    try { body = await req.json(); } catch { return json({ error: "גוף הבקשה אינו JSON" }, 400); }
    if (!body || typeof body.name !== "string" || !body.name.trim() || JSON.stringify(body).length > 20000)
      return json({ error: "משימה לא תקינה" }, 400);
    await store.setJSON("t/" + id, body);
    return json({ ok: true });
  }

  if (req.method === "DELETE") {
    await store.delete("t/" + id);
    return json({ ok: true });
  }

  return json({ error: "פעולה לא נתמכת" }, 405);
};

export const config = { path: ["/api/tasks", "/api/tasks/:id"] };

// One-time import of the shopping list: adds missing items (fixed ids, so a repeat run cannot duplicate)
// and puts its groups first in the shopping categories, keeping any category that already has items.
async function importShopping(store, docs) {
  for (const [id, item] of Object.entries(IMPORT_ITEMS)) {
    if (docs[id]) continue;
    await store.setJSON("t/" + id, item);
    docs[id] = item;
  }
  const settings = docs._settings || { name: "_settings" };
  const used = new Set(Object.values(docs).filter((d) => d && d.kind === "shop").map((d) => d.cat));
  const before = settings.cats?.shop || [];
  const shop = [...IMPORT_CATS, ...before.filter((k) => !IMPORT_CATS.includes(k) && used.has(k))];
  const next = { ...settings, name: "_settings", cats: { ...(settings.cats || {}), shop } };
  await store.setJSON("t/_settings", next);
  docs._settings = next;
  await store.set(IMPORT_FLAG, new Date().toISOString());
}
