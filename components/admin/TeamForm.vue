<template>
  <div class="flex flex-col gap-4">
    <div class="space-y-2">
      <m-input id="name" v-model="form.name" name="name" />

      <div class="flex justify-end">
        <a-button @click="submit">{{ buttonText }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecordModel } from "pocketbase";
import type { TeamData } from "~/composables/Queries";

const props = defineProps<{
  team?: RecordModel;
}>();

const emit = defineEmits<{
  (e: "success" | "cancel"): void;
}>();

const pb = usePocketBase();

const initialState = {
  name: "",
};

const form = reactive<TeamData>(initialState);

watch(
  () => props.team,
  (value: RecordModel | undefined) => {
    if (value === undefined) {
      resetForm();

      return;
    }

    setForm({
      name: value.name,
    });
  },
);

const buttonText = computed(() => {
  return props.team ? "Update" : "Create";
});

const { mutate: mutateCreate } = pb.teams.create();

const create = () => {
  mutateCreate(form, {
    onSuccess: () => resetForm(),
  });
};

const { mutate: updateMutate } = pb.teams.update();

const update = () => {
  if (!props.team) return;

  updateMutate(
    {
      id: props.team.id,
      data: form,
    },
    {
      onSuccess: () => resetForm(),
    },
  );
};

function submit() {
  if (props.team) {
    update();
  } else {
    create();
  }
}

function setForm(values: TeamData) {
  Object.assign(form, {
    ...values,
  });
}

const resetForm = () => {
  Object.assign(form, initialState);

  emit("success");
};
</script>
