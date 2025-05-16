import type PocketBase from "pocketbase";
import { bookmarks, type BookmarkData } from "./bookmarks";
import { categories, type CategoryData } from "./categories";
import { teams, type TeamData } from "./teams";
import { users } from "./users";

export default (client: PocketBase) => {
  return {
    bookmarks: bookmarks(client),
    categories: categories(client),
    teams: teams(client),
    users: users(client),
  };
};

export { type BookmarkData, type CategoryData, type TeamData };
