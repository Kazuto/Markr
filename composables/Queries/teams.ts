import type PocketBase from "pocketbase";
import type { RecordListOptions, RecordOptions } from "pocketbase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";

export type TeamData = {
  name: string;
  categories?: string[];
};

export function teams(client: PocketBase) {
  const queryClient = useQueryClient();

  const collection = "teams";

  const page = ref(1);
  const perPage = ref(10);

  const all = (client: PocketBase, options?: RecordListOptions) =>
    useQuery({
      queryKey: [collection, options],
      queryFn: () => client.collection(collection).getFullList(options),
    });

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
      mutationFn: (data: TeamData) =>
        client.collection(collection).create(data),
    });

  const update = (client: PocketBase) =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: TeamData }) =>
        client.collection(collection).update(id, data),
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
    all: (options?: RecordListOptions) => all(client, options),
    list: (options?: RecordListOptions) => list(client, options),
    get: (id: string, options?: RecordOptions) => get(client, id, options),
    create: () => create(client),
    update: () => update(client),
    destroy: () => destroy(client),
    page,
    perPage,
  };
}
