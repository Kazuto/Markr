import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { Collections } from "~/lib/pocketbase";

import type { RecordListOptions, RecordOptions } from "pocketbase";
import type { TypedPocketBase, UsersRecord } from "~/lib/pocketbase";

export function users(client: TypedPocketBase) {
  const queryClient = useQueryClient();

  const collection = Collections.Users;

  const page = ref(1);
  const perPage = ref(10);

  const all = (options?: RecordListOptions) =>
    useQuery({
      queryKey: [collection, options],
      queryFn: () => client.collection(collection).getFullList(options),
    });

  const list = (options?: RecordListOptions) =>
    useQuery({
      queryKey: [collection, options, perPage.value, page.value],
      queryFn: () =>
        client
          .collection(collection)
          .getList(page.value, perPage.value, options),
    });

  const get = (id: string, options?: RecordOptions) =>
    useQuery({
      queryKey: [collection, id, options],
      queryFn: () => client.collection(collection).getOne(id, options),
    });

  const update = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: UsersRecord }) =>
        client.collection(collection).update(id, data),
    });

  const subscribe = () => {
    client.collection(collection).subscribe("*", function () {
      queryClient.invalidateQueries({ queryKey: [collection] });
    });
  };

  const unsubscribe = () => {
    client.collection(collection).unsubscribe("*");
  };

  return {
    all,
    list,
    get,
    update,
    subscribe,
    unsubscribe,
    page,
    perPage,
  };
}
