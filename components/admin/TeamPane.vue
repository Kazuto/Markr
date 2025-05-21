<template>
  <a-tab-pane>
    <div class="flex justify-end">
      <a-button @click="openModal(undefined)">
        <fa icon="fas fa-plus" /> Add Team
      </a-button>
    </div>

    <table class="w-full text-left">
      <thead>
        <tr
          class="[&>th]:bg-gray-200 [&>th]:px-3 [&>th]:py-2 [&>th:first-child]:rounded-l-sm [&>th:last-child]:rounded-r-sm"
        >
          <th>Name</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="[&>tr:nth-child(even)]:bg-gray-100">
        <tr
          v-for="item in teams?.items"
          :key="item.id"
          class="[&>td]:px-3 [&>td]:py-2 [&>td:first-child]:rounded-l-sm [&>td:last-child]:rounded-r-sm"
        >
          <td>{{ item.name }}</td>
          <td>
            <div class="flex items-end justify-end space-x-1">
              <a-button icon @click="openModal(item)">
                <fa icon="fas fa-pencil" />
              </a-button>
              <a-button icon destructive @click="deleteTeam(item.id)">
                <fa icon="fas fa-trash" />
              </a-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <a-dialog v-model="open" :title @close="closeModal">
      <admin-team-form :team @cancel="closeModal" @success="closeModal" />
    </a-dialog>
  </a-tab-pane>
</template>

<script setup lang="ts">
import type { RecordModel } from "pocketbase";

const pb = usePocketBase();

const { data: teams } = pb.teams.list({
  sort: "name",
});

const open = ref(false);

const team = ref<RecordModel | undefined>();

const title = computed(() => {
  return team.value ? "Edit a category" : "Create a new category";
});

function openModal(item?: RecordModel) {
  open.value = true;
  team.value = item;
}

function closeModal() {
  open.value = false;
  team.value = undefined;
}

const { mutate: mutateDelete } = pb.teams.destroy();

const deleteTeam = (id: string) => {
  mutateDelete(id);
};
</script>

<style scoped></style>
