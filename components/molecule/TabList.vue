<template>
  <ul
    :class="{
      'flex space-x-2': horizontal,
      'space-y-1': !horizontal,
    }"
  >
    <li
      v-for="(_, tab) in tabs"
      :key="tab"
      class="cursor-pointer rounded-lg px-3 py-2 capitalize transition-colors hover:bg-primary-500 hover:text-gray-800"
      :class="{
        'bg-primary-500 font-bold text-gray-800 hover:bg-primary-500':
          model === tab,
      }"
      @click="model = tab"
    >
      {{ tab }}
    </li>
  </ul>

  <component :is="tabs[model as keyof Tabs]" />
</template>

<script setup lang="ts">
export type Tabs = Record<string, unknown>;

const model = defineModel<keyof Tabs>();

defineProps<{
  tabs: Tabs;
  horizontal?: boolean;
}>();
</script>
