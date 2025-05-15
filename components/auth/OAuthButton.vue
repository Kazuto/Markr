<template>
  <div>
    <input type="hidden" name="provider" :value="provider.name" />
    <a-button @click="oAuthSignIn(provider.name)">
      <component :is="icon" size="2x" />
      {{ provider.displayName }}
    </a-button>
  </div>
</template>

<script setup lang="ts">
import type { AuthProviderInfo } from "pocketbase";

const { oAuthSignIn } = useAuth();

const props = defineProps<{
  provider: AuthProviderInfo;
}>();

const icon = computed(() => {
  let name = props.provider.name;
  name = name.charAt(0).toUpperCase() + name.slice(1);

  return resolveComponent(`${name}Icon`);
});
</script>
