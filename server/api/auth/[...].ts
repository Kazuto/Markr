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
    async signIn({ user }) {
      return await handleSignIn(user);
    },
  },
});

async function handleSignIn(user: any) {
  if (!user.email) return false;

  try {
    const whitelist = await findWhitelist(user.email);

    if (!whitelist) return false;
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
}

async function findWhitelist(email: string) {
  const whitelist = await $fetch("/api/whitelist");

  return whitelist.find((w) => w.email === email);
}
