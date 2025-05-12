import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";

const sqlite = new Database("database.sqlite");
const db = drizzle(sqlite);

// Drop all existing tables
const dropAllTables = () => {
  const tables: unknown[] = sqlite
    .prepare(
      `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`,
    )
    .all();

  for (const table of tables) {
    const t = table as { name: string };

    console.log(`Dropping table: ${t.name}`);
    sqlite.prepare(`DROP TABLE IF EXISTS "${t.name}";`).run();
  }
};

const main = () => {
  try {
    dropAllTables();

    migrate(db, { migrationsFolder: "server/database/migrations" });
    console.log("Migration completed");
  } catch (error) {
    console.error("Error during migration:", error);
    process.exit(1);
  }
};

main();
