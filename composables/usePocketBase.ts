import PocketBase from "pocketbase";
import Queries from "./Queries";

export const usePocketBase = () => {
  const config = useRuntimeConfig();

  const client = new PocketBase(config.public.pocketbaseUrl);

  return {
    client,
    ...Queries(client),
  };
};
