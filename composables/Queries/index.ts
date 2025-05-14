import PocketBase from "pocketbase";
import { categories, type CategoryFormData } from "./categories";

export default (client: PocketBase) => {
  return {
    categories: categories(client),
  };
};

export { type CategoryFormData };
