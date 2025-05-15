<template>
  <div>
    <input type="hidden" name="provider" :value="provider.name" />
    <a-button @click="oAuthSignIn(provider.name)">
      <fa :icon="icon" />
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

const icon = computed(() => "fab fa-" + props.provider.name);
</script>
