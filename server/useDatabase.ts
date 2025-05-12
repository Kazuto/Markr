import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "@/server/database/schemas";

export { sql, eq, and, or } from "drizzle-orm";

export const tables = schema;

export function db() {
  const sqlite = new Database("database.sqlite");

  return drizzle(sqlite, { schema });
}

export type User = typeof schema.users.$inferSelect;

export type Bookmark = typeof schema.bookmarks.$inferSelect;

export type BookmarkCategory = typeof schema.bookmarkCategories.$inferSelect;

export type Team = typeof schema.teams.$inferSelect;

export type Whitelist = typeof schema.whitelist.$inferSelect;
