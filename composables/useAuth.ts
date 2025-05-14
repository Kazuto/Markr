import { type RecordModel, type ClientResponseError } from "pocketbase";

export function useAuth() {
  const pb = usePocketBase();

  const data = computed(() => pb.client.authStore.model as RecordModel);
  const isAdmin = computed(() => pb.client.authStore.isAdmin);
  const authenticated = computed(() => pb.client.authStore.isValid);
  const unauthenticated = computed(() => !authenticated.value);

  const authProviders = async () => {
    const auth = await pb.client.collection("users").listAuthMethods();

    return auth.authProviders ?? [];
  };

  const oAuthSignIn = async (provider: string) => {
    try {
      await pb.client.collection("users").authWithOAuth2({ provider });

      reloadNuxtApp();
    } catch (e) {
      const error = e as ClientResponseError;
      console.log(error);
    }
  };

  const credentialSignIn = async (username: string, password: string) => {
    console.log(username, password);
    try {
      await pb.client.collection("users").authWithPassword(username, password);

      reloadNuxtApp();
    } catch (e) {
      const error = e as ClientResponseError;
      console.log(error);
    }
  };

  const signOut = () => {
    pb.client.authStore.clear();

    reloadNuxtApp();
  };

  return {
    oAuthSignIn,
    credentialSignIn,
    signOut,
    authProviders,
    authenticated,
    unauthenticated,
    isAdmin,
    data,
  };
}
