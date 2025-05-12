// src/migrate.ts
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";

import { config } from "dotenv";
config({ path: ".env" });

const sqlite = new Database("database.sqlite");
const db = drizzle(sqlite);

const main = () => {
  try {
    migrate(db, { migrationsFolder: "server/database/migrations" });

    console.log("Migration completed");
  } catch (error) {
    console.error("Error during migration:", error);

    process.exit(1);
  }
};

main();
