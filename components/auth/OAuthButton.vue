<template>
  <div>
    <input type="hidden" name="provider" :value="provider.name" />
    <atoms-button @click="oAuthSignIn(provider.name)">
      <fa-icon :icon="['fab', provider.name]" />
      {{ provider.displayName }}
    </atoms-button>
  </div>
</template>

<script setup lang="ts">
import type { AuthProviderInfo } from "pocketbase";

const { oAuthSignIn } = useAuth();

defineProps<{
  provider: AuthProviderInfo;
}>();
</script>
