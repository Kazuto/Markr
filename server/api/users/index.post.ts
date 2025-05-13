import { db, tables, type User } from "@/server/useDatabase";
import { v4 as uuid } from "uuid";

export default defineEventHandler(async (event): Promise<User[]> => {
  const body = await readBody(event);

  return await db()
    .insert(tables.users)
    .values({
      uuid: uuid(),
      name: body.name,
      email: body.email,
      oauthProvider: body.oauth_provider,
      oauthId: body.oauth_id,
      createdAt: new Date(),
    })
    .onConflictDoUpdate({
      target: tables.users.email,
      set: { name: body.name, email: body.email, updatedAt: new Date() },
    })
    .returning();
});
