import { type RecordModel, type ClientResponseError } from "pocketbase";

export function useAuth() {
  const pb = usePocketBase();

  const data = computed(() => pb.authStore.model as RecordModel);
  const authenticated = computed(() => pb.authStore.isValid);
  const unauthenticated = computed(() => !authenticated.value);

  const signIn = async (provider: string) => {
    try {
      await pb.collection("users").authWithOAuth2({ provider });

      reloadNuxtApp();
    } catch (e) {
      const error = e as ClientResponseError;
      console.log(error);
    }
  };

  const signOut = () => {
    pb.authStore.clear();

    reloadNuxtApp();
  };

  return {
    signIn,
    signOut,
    authenticated,
    unauthenticated,
    data,
  };
}
