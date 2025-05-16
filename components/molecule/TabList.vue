<template>
  <m-card class="px-2 py-2">
    <ul
      :class="{
        'flex space-x-2': horizontal,
        'space-y-1': !horizontal,
      }"
    >
      <li
        v-for="(_, tab) in tabs"
        :key="tab"
        class="cursor-pointer rounded-lg px-3 py-2 capitalize transition-colors hover:bg-gray-200"
        :class="{ 'bg-gray-200 font-bold': model === tab }"
        @click="model = tab"
      >
        {{ tab }}
      </li>
    </ul>
  </m-card>

  <component :is="tabs[model as keyof Tabs]" />
</template>

<script setup lang="ts">
type Tabs = Record<string, unknown>;

const model = defineModel<keyof Tabs>();

defineProps<{
  tabs: Tabs;
  horizontal?: boolean;
}>();
</script>
