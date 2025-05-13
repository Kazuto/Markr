import { db, type Whitelist } from "@/server/useDatabase";

export default defineEventHandler(
  async (): Promise<Whitelist[]> => await db().query.whitelist.findMany(),
);
