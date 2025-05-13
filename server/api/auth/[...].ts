import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  // A secret string you define, to ensure correct encryption
  secret: useRuntimeConfig().authSecret,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: useRuntimeConfig().githubClientId,
      clientSecret: useRuntimeConfig().githubClientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      return await handleSignIn(user, account);
    },
  },
});

async function handleSignIn(user: any, account: any) {
  if (!user.email) return false;

  try {
    const whitelist = await findWhitelist(user.email);

    if (!whitelist) return false;

    const response = await updateOrCreateUser(user, account);

    await updateWhitelist(whitelist.id, response[0].id);
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
}

async function updateOrCreateUser(user: any, account: any) {
  return await $fetch("/api/users", {
    method: "POST",
    body: {
      name: user.name,
      email: user.email,
      oauth_provider: account.provider,
      oauth_id: user.id,
    },
  });
}

async function findWhitelist(email: string) {
  const whitelist = await $fetch("/api/whitelist");

  return whitelist.find((w) => w.email === email);
}

async function updateWhitelist(id: number, userId: number) {
  await $fetch(`/api/whitelist/${id}`, {
    method: "PUT",
    body: {
      userId,
    },
  });
}
