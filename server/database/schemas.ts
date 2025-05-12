import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").unique().notNull(),
  oauthProvider: text("oauth_provider").notNull(),
  oauthId: text("oauth_id"),
  isAdmin: integer("is_admin").default(0),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const whitelist = sqliteTable("whitelist", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  isActive: integer("is_active").default(0),
  userId: integer("user_id").references(() => users.id),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const bookmarkCategories = sqliteTable("bookmark_categories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").unique().notNull(),
  name: text("name").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const bookmarks = sqliteTable("bookmarks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").unique().notNull(),
  name: text("name").notNull(),
  url: text("url").notNull(),
  icon: text("icon"),
  order: integer("order").notNull().default(0),
  bookmarkCategoryId: integer("bookmark_category_id").references(
    () => bookmarkCategories.id,
  ),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const teams = sqliteTable("teams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  uuid: text("uuid").unique().notNull(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
  deletedAt: integer("deleted_at", { mode: "timestamp" }),
});

export const teamMemberships = sqliteTable("team_memberships", {
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const categoryTeamAccess = sqliteTable("category_team_access", {
  groupId: integer("category_id")
    .notNull()
    .references(() => bookmarkCategories.id),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
});
