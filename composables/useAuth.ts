import type { RecordModel, ClientResponseError } from "pocketbase";

export function useAuth() {
  const pb = usePocketBase();

  const currentAuth = useLocalStorage("pocketbase_auth", null);
  const userAuth = useLocalStorage("pocketbase_user", null);

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
    try {
      userAuth.value = currentAuth.value;

      await pb.client.admins.authWithPassword(username, password);

      reloadNuxtApp();
    } catch (e) {
      const error = e as ClientResponseError;
      console.log(error);
    }
  };

  const signOut = () => {
    currentAuth.value = userAuth.value;
    userAuth.value = null;

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
