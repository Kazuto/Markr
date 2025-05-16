import type PocketBase from "pocketbase";
import type { RecordListOptions, RecordOptions } from "pocketbase";
import { useQuery, useQueryClient } from "@tanstack/vue-query";

export function users(client: PocketBase) {
  const queryClient = useQueryClient();

  const collection = "users";

  const page = ref(1);
  const perPage = ref(10);

  const list = (client: PocketBase, options?: RecordListOptions) =>
    useQuery({
      queryKey: [collection, options, perPage.value, page.value],
      queryFn: () =>
        client
          .collection(collection)
          .getList(page.value, perPage.value, options),
    });

  const get = (client: PocketBase, id: string, options?: RecordOptions) =>
    useQuery({
      queryKey: [collection, id, options],
      queryFn: () => client.collection(collection).getOne(id, options),
    });

  onMounted(() => {
    client.collection(collection).subscribe("*", function () {
      queryClient.invalidateQueries({ queryKey: [collection] });
    });
  });

  onUnmounted(() => {
    client.collection(collection).unsubscribe("*");
  });

  return {
    list: (options?: RecordListOptions) => list(client, options),
    get: (id: string, options?: RecordOptions) => get(client, id, options),
    page,
    perPage,
  };
}
