<template>
  <div class="flex flex-col gap-4">
    <div class="space-y-2">
      <m-input id="name" v-model="form.name" name="name" />
      <m-input id="username" v-model="form.username" name="username" />
      <m-input id="email" v-model="form.email" name="email" type="email" />

      <a-select
        v-if="teams?.items"
        id="teams"
        v-model="form.teams"
        multiple
        name="teams"
        :options="dropdownOptions"
      />

      <div class="flex justify-end">
        <a-button @click="submit">{{ buttonText }}</a-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecordModel } from "pocketbase";
import type { UserData } from "~/composables/Queries";

const props = defineProps<{
  user?: RecordModel;
}>();

const emit = defineEmits<{
  (e: "success" | "cancel"): void;
}>();

const pb = usePocketBase();

const { data: teams } = pb.teams.list();

const dropdownOptions = computed(() => {
  if (!teams.value?.items.length) return [];

  return teams.value?.items.map((c: RecordModel) => ({
    label: c.name,
    value: c.id,
  }));
});

const { form, fillForm, resetForm } = useForm<UserData>({
  name: "",
  username: "",
  email: "",
  teams: [],
});

watch(
  () => props.user,
  (value: RecordModel | undefined) => {
    if (value === undefined) {
      resetForm();

      return;
    }

    fillForm({
      name: value.name,
      username: value.username,
      email: value.email,
      teams: value.teams,
    });
  },
);

const buttonText = computed(() => {
  return props.user ? "Update" : "";
});

const { mutate: updateMutate } = pb.users.update();

function submit() {
  if (!props.user) return;

  updateMutate(
    {
      id: props.user.id,
      data: form.value,
    },
    {
      onSuccess: () => resetForm(() => emit("success")),
    },
  );
}
</script>
