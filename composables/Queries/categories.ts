import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { Collections } from "~/lib/types";

import type { RecordListOptions, RecordOptions } from "pocketbase";
import type { TypedPocketBase, CategoriesRecord } from "~/lib/types";

export function categories(client: TypedPocketBase) {
  const queryClient = useQueryClient();

  const collection = Collections.Categories;

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

  const create = () =>
    useMutation({
      mutationFn: (data: CategoriesRecord) =>
        client.collection(collection).create(data),
    });

  const update = () =>
    useMutation({
      mutationFn: ({ id, data }: { id: string; data: CategoriesRecord }) =>
        client.collection(collection).update(id, data),
    });

  const destroy = () =>
    useMutation({
      mutationFn: (id: string) => client.collection(collection).delete(id),
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
    create,
    update,
    destroy,
    subscribe,
    unsubscribe,
    page,
    perPage,
  };
}
