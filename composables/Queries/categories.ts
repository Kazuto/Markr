import PocketBase from "pocketbase";
import type { RecordListOptions, RecordOptions } from "pocketbase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

export type CategoryFormData = {
  name: string;
  order: number;
  color?: string;
  icon?: string;
};

export function categories(client: PocketBase) {
  const queryClient = useQueryClient();

  const collection = "categories";

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

  const create = (client: PocketBase) =>
    useMutation({
      mutationFn: (data: CategoryFormData) =>
        client.collection(collection).create(data),
    });

  const destroy = (client: PocketBase) =>
    useMutation({
      mutationFn: (id: string) => client.collection(collection).delete(id),
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
    create: () => create(client),
    destroy: () => destroy(client),
    page,
    perPage,
  };
}
