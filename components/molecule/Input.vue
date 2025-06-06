<template>
  <div>
    <a-label :for="id" :aria-label="`input-label-${name}`" :disabled>
      {{ name }}
    </a-label>
    <a-input
      v-bind="$attrs"
      :id
      v-model="model"
      :disabled
      class="mt-1"
      :aria-labelledby="`input-label-${name}`"
    />
  </div>
</template>

<script setup lang="ts">
const model = defineModel<string | number | undefined>();

defineProps<{
  id: string;
  name: string;
  disabled?: boolean;
}>();

defineOptions({
  inheritAttrs: false,
});
</script>
