import PocketBase from "pocketbase";
import Queries from "./Queries";

export function usePocketBase() {
  const config = useRuntimeConfig();

  const client = new PocketBase(config.public.pocketbaseUrl);

  return {
    client,
    ...Queries(client),
  };
}
