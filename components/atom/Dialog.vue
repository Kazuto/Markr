<template>
  <dialog
    ref="dialog"
    class="relative m-auto w-full max-w-xl space-y-4 rounded-2xl bg-gray-50 p-8 shadow-xl backdrop:bg-black/50 backdrop:backdrop-blur"
  >
    <a-typography is="h4" medium class="font-bold dark:text-gray-700">
      {{ title }}
    </a-typography>

    <button
      class="absolute top-4 right-4 aspect-square cursor-pointer rounded-md px-2 transition-colors hover:bg-black/10"
      @click="$emit('close')"
    >
      <fa icon="fas fa-times" />
    </button>

    <slot />
  </dialog>
</template>

<script setup lang="ts">
const dialog = useTemplateRef("dialog");

const open = defineModel<boolean>();

defineProps<{
  title: string;
}>();

defineEmits<{
  (e: "close"): void;
}>();

watchEffect(() => {
  if (!dialog.value) return;

  if (open.value) {
    dialog.value.showModal();

    return;
  }

  dialog.value.close();
});
</script>
