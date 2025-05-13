import { db, eq, and, tables } from "@/server/useDatabase";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");

  if (!id) return;

  const body = await readBody(event);

  await db()
    .update(tables.whitelist)
    .set({ isActive: 1, updatedAt: new Date(), userId: body.userId })
    .where(
      and(
        eq(tables.whitelist.id, Number(id)),
        eq(tables.whitelist.isActive, 0),
      ),
    );
});
