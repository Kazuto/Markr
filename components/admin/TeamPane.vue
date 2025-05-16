<template>
  <a-tab-pane>
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
          v-for="team in teams?.items"
          :key="team.id"
          class="[&>td]:px-3 [&>td]:py-2 [&>td:first-child]:rounded-l-sm [&>td:last-child]:rounded-r-sm"
        >
          <td>{{ team.name }}</td>
          <td>
            <div class="flex items-end justify-end space-x-1">
              <a-button icon><fa icon="fas fa-pencil" /></a-button>
              <a-button icon destructive @click="deleteteam(team.id)">
                <fa icon="fas fa-trash" />
              </a-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex flex-col gap-4">
      <a-typography
        is="p"
        size="small"
        class="text-gray-700 dark:text-gray-700"
      >
        Create a new team
      </a-typography>

      <div class="max-w-sm space-y-2">
        <m-input id="name" v-model="name" name="name" class="grow" />

        <a-button @click="createteam"> Create </a-button>
      </div>
    </div>
  </a-tab-pane>
</template>

<script setup lang="ts">
const pb = usePocketBase();

const { data: teams } = pb.teams.list({
  sort: "name",
});

const name = ref("");

const { mutate: mutateCreate } = pb.teams.create();

const createteam = () => {
  mutateCreate(
    {
      name: name.value,
    },
    {
      onSuccess: () => {
        name.value = "";
      },
    },
  );
};

const { mutate: mutateDelete } = pb.teams.destroy();

const deleteteam = (id: string) => {
  mutateDelete(id);
};
</script>

<style scoped></style>
