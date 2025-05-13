import { type RecordModel, type ClientResponseError } from "pocketbase";

export function useAuth() {
  const pb = usePocketBase();

  const data = computed(() => pb.authStore.model as RecordModel);
  const isAdmin = computed(() => pb.authStore.isAdmin);
  const authenticated = computed(() => pb.authStore.isValid);
  const unauthenticated = computed(() => !authenticated.value);

  const authProviders = async () => {
    const auth = await pb.collection("users").listAuthMethods();

    return auth.authProviders ?? [];
  };

  const oAuthSignIn = async (provider: string) => {
    try {
      await pb.collection("users").authWithOAuth2({ provider });

      reloadNuxtApp();
    } catch (e) {
      const error = e as ClientResponseError;
      console.log(error);
    }
  };

  const credentialSignIn = async (username: string, password: string) => {
    console.log(username, password);
    try {
      await pb.collection("users").authWithPassword(username, password);

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
