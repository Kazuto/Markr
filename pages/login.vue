<template>
  <div
    class="mx-auto flex h-full w-full max-w-md flex-col justify-center space-y-4"
  >
    <m-card title="Sign In">
      <div v-if="providers" class="flex flex-col gap-4">
        <a-typography is="p" small class="dark:text-gray-700">
          Choose a sign-in method:
        </a-typography>

        <div class="flex flex-col gap-2">
          <auth-o-auth-button
            v-for="provider in providers"
            :key="provider.name"
            :provider="provider"
          >
            Sign in with {{ provider.displayName }}
          </auth-o-auth-button>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script setup lang="ts">
const { authProviders } = useAuth();

const providers = await authProviders();
</script>
