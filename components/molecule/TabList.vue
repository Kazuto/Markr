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
          'pointer-events-none bg-gray-300 font-bold': activeTab === tab,
        }"
        @click="setActiveTab(tab)"
      >
        {{ tab }}
      </li>
    </ul>

    <component :is="tabs[activeTab as keyof Tabs]" :id="activeTab" />
  </div>
</template>

<script setup lang="ts">
export type Tabs = Record<string, unknown>;

defineProps<{
  tabs: Tabs;
  horizontal?: boolean;
}>();

const router = useRouter();

const activeTab = defineModel<string>();

onMounted(() => {
  if (router.currentRoute.value.hash) {
    const hash = router.currentRoute.value.hash.slice(1);

    activeTab.value = hash as keyof Tabs;
  }
});

const setActiveTab = (tab: keyof Tabs) => {
  activeTab.value = tab;

  router.push({
    hash: `#${tab.toLowerCase()}`,
  });
};
</script>
