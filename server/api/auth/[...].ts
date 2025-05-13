import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";
import type { Account, Profile } from "next-auth";

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
    async signIn({ account, profile }) {
      return await handleSignIn(account, profile);
    },
  },
});

async function handleSignIn(
  account: Account | null,
  profile: Profile | undefined,
) {
  if (!account) return false;
  if (!profile || !profile.email) return false;

  try {
    const whitelist = await findWhitelist(profile.email);
    if (!whitelist) return false;

    const user = await updateOrCreateUser(account, profile);
    if (!user) return false;

    await updateWhitelist(whitelist.id, user.id);
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
}

async function updateOrCreateUser(account: Account, profile: Profile) {
  const response = await $fetch("/api/users", {
    method: "POST",
    body: {
      name: profile.name,
      email: profile.email,
      oauth_provider: account.provider,
      oauth_id: account.providerAccountId,
    },
  });

  return response.find((u) => u.email === profile.email);
}

async function findWhitelist(email: string) {
  const response = await $fetch("/api/whitelist");

  return response.find((w) => w.email === email);
}

async function updateWhitelist(id: number, userId: number) {
  await $fetch(`/api/whitelist/${id}`, {
    method: "PUT",
    body: {
      userId,
    },
  });
}
