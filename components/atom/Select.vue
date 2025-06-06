<template>
  <div class="relative">
    <a-label :for="id" :disabled :aria-label="`listbox-label-${name}`">
      {{ name }}
    </a-label>

    <div />

    <div
      :aria-labelledby="`listbox-label-${name}`"
      role="listbox"
      class="mt-1 w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-700 focus:outline-2 focus:outline-offset-3 focus:outline-gray-500"
      :class="{
        'cursor-pointer': !disabled,
        'cursor-not-allowed bg-gray-100 opacity-50 focus:outline-none':
          disabled,
      }"
      :tabindex="disabled ? -1 : 0"
      @click="toggle"
    >
      <div class="flex w-full items-start gap-1">
        <div class="flex grow flex-wrap gap-1">
          <span v-if="!selectedText.length" class="text-gray-500">
            {{ placeholder }}
          </span>

          <span
            v-for="(text, index) in selectedText"
            v-else
            :key="index"
            class="group rounded bg-gray-200 px-1.5 py-0.5 text-xs transition-colors select-none hover:bg-gray-300"
            :class="{
              'pointer-events-none': disabled,
            }"
            @click.stop="clear(index)"
          >
            {{ text }}
            <fa
              icon="fas fa-xmark"
              class="ml-1 cursor-pointer group-hover:text-red-500"
            />
          </span>
        </div>

        <span class="flex items-center p-0.5">
          <fa
            icon="fas fa-chevron-down"
            class="transition-transform"
            :class="{ '-scale-y-100': open }"
          />
        </span>
      </div>
    </div>

    <div
      v-if="open"
      class="absolute z-100 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-300 bg-gray-50"
    >
      <div
        v-for="(option, index) in options"
        :key="index"
        class="cursor-pointer px-3 py-2 hover:bg-gray-200"
        :class="{ 'bg-blue-100 hover:bg-blue-200!': isSelected(option) }"
        tabindex="0"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Option {
  label: string;
  value: unknown;
}

const model = defineModel<unknown[]>();

const props = withDefaults(
  defineProps<{
    id: string;
    name: string;
    placeholder?: string;
    options: Option[];
    disabled?: boolean;
    multiple?: boolean;
  }>(),
  {
    placeholder: "Select...",
    multiple: false,
  },
);

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);

function toggle() {
  if (props.disabled) return;

  open.value = !open.value;
}

const isSelected = (option: Option) => {
  return Array.isArray(model.value) && model.value.includes(option.value);
};

const selectOption = (option: Option) => {
  if (!props.multiple) {
    emit("update:modelValue", [option.value]);
    open.value = false;

    return;
  }

  const selected = Array.isArray(model.value) ? [...model.value] : [];
  const index = selected.indexOf(option.value);

  if (index > -1) {
    selected.splice(index, 1);
  } else {
    selected.push(option.value);
  }

  emit("update:modelValue", selected);
};

const clear = (index: number) => {
  if (props.disabled) return;

  const selected = Array.isArray(model.value) ? [...model.value] : [];

  selected.splice(index, 1);

  emit("update:modelValue", selected);
};

const selectedText = computed(() => {
  return props.options
    .filter((opt) => model.value?.includes(opt.value))
    .map((opt) => opt.label);
});
</script>
