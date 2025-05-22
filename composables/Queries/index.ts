import { bookmarks } from "./bookmarks";
import { categories } from "./categories";
import { teams } from "./teams";
import { users } from "./users";
import type { TypedPocketBase } from "~/lib/types";

export default (client: TypedPocketBase) => {
  return {
    bookmarks: bookmarks(client),
    categories: categories(client),
    teams: teams(client),
    users: users(client),
  };
};
