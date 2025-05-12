import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .default(sql`(current_timestamp)`),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
};

export const bookmarkGroups = sqliteTable("bookmark_groups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid")
    .unique()
    .notNull()
    .default(sql`(uuid())`),
  name: text("name").notNull(),
  order: integer("order").notNull().default(0),
  ...timestamps,
});

export const bookmarks = sqliteTable("bookmarks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid")
    .unique()
    .notNull()
    .default(sql`(uuid())`),
  name: text("name").notNull(),
  url: text("url").notNull(),
  icon: text("icon"),
  order: integer("order").notNull().default(0),
  groupId: integer("group_id")
    .notNull()
    .references(() => bookmarkGroups.id),
  ...timestamps,
});
