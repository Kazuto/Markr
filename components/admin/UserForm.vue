<template>
  <div class="flex flex-col gap-4">
    <div class="space-y-2">
      <m-input id="name" v-model="form.name" name="name" />

      <a-toggle id="admin" v-model="form.is_admin" name="admin">
        Is Admin
      </a-toggle>

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
import type { UsersRecord, UsersResponse } from "~/lib/types";

const props = defineProps<{
  user?: UsersResponse;
}>();

const emit = defineEmits<{
  (e: "success" | "cancel"): void;
}>();

const pb = usePocketBase();

const { data: teams } = pb.teams.list();

const dropdownOptions = computed(() => {
  if (!teams.value?.items.length) return [];

  return teams.value?.items.map((c) => ({
    label: c.name,
    value: c.id,
  }));
});

const { form, fillForm, resetForm } = useForm<UsersRecord>({
  name: "",
  is_admin: false,
  teams: [],
});

watch(
  () => props.user,
  (value: UsersResponse | undefined) => {
    if (value === undefined) {
      resetForm();

      return;
    }

    fillForm({
      name: value.name,
      is_admin: value.is_admin,
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
