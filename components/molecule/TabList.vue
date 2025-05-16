<template>
  <div
    class="grid h-full gap-4"
    :class="{
      'grid-cols-[minmax(auto,300px)_1fr] justify-center': !horizontal,
      'grid-rows-[auto_1fr]': horizontal,
    }"
  >
    <ul
      class="h-full"
      :class="{
        'flex space-x-2': horizontal,
        'space-y-1': !horizontal,
      }"
    >
      <li
        v-for="(_, tab) in tabs"
        :key="tab"
        class="cursor-pointer rounded-lg px-3 py-2 capitalize transition-colors hover:bg-gray-200"
        :class="{
          'bg-gray-300 font-bold text-gray-800 hover:bg-gray-300':
            model === tab,
        }"
        @click="model = tab"
      >
        {{ tab }}
      </li>
    </ul>

    <component :is="tabs[model as keyof Tabs]" />
  </div>
</template>

<script setup lang="ts">
export type Tabs = Record<string, unknown>;

const model = defineModel<keyof Tabs>();

defineProps<{
  tabs: Tabs;
  horizontal?: boolean;
}>();
</script>
