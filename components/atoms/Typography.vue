<template>
  <component
    :is
    :class="{
      'text-md': size === 'small',
      'text-xl tracking-tight': size === 'medium',
      'text-4xl font-medium tracking-tighter': size === 'large',
    }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    is?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
    size?: "small" | "medium" | "large";
  }>(),
  {
    is: "h1",
    size: "medium",
  },
);
</script>
