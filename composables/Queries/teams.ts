import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { Collections } from "~/lib/types";

import type { RecordListOptions, RecordOptions } from "pocketbase";
import type { TypedPocketBase, TeamsRecord } from "~/lib/types";

export function teams(client: TypedPocketBase) {
  const queryClient = useQueryClient();

  const collection = Collections.Teams;

  const page = ref(1);
  const perPage = ref(10);

  const all = (client: TypedPocketBase, options?: RecordListOptions) =>
    useQuery({
      queryKey: [collection, options],
      queryFn: () => client.collection(collection).getFullList(options),
    });

  const list = (client: TypedPocketBase, options?: RecordListOptions) =>
    useQuery({
      queryKey: [collection, options, perPage.value, page.value],
      queryFn: () =>
        client
          .collection(collection)
          .getList(page.value, perPage.value, options),
    });

  const get = (client: TypedPocketBase, id: string, options?: RecordOptions) =>
    useQuery({
      queryKey: [collection, id, options],
      queryFn: () => client.collection(collection).getOne(id, options),
    });

  const create = (client: TypedPocketBase) =>
    useMutation({
      mutationFn: (data: TeamsRecord) =>
        client.collection(collection).create(data),
    });

  const update = (client: TypedPocketBase) =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: TeamsRecord }) =>
        client.collection(collection).update(id, data),
    });

  const destroy = (client: TypedPocketBase) =>
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
