import type PocketBase from "pocketbase";
import type { RecordListOptions, RecordOptions } from "pocketbase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

export type UserData = {
  id: string;
  name: string;
  username: string;
  email?: string;
  avatar?: string;
};

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

  const update = (client: PocketBase) =>
    useMutation({
      mutationFn: (data: UserData) =>
        client.collection(collection).update(data.id, data),
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
    update: () => update(client),
    page,
    perPage,
  };
}
