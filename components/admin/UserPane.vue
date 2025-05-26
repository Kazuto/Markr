<template>
  <a-tab-pane>
    <table class="w-full text-left">
      <thead>
        <tr
          class="[&>th]:bg-gray-200 [&>th]:px-3 [&>th]:py-2 [&>th:first-child]:rounded-l-sm [&>th:last-child]:rounded-r-sm"
        >
          <th>Name</th>
          <th>Username</th>
          <th>E-Mail</th>
          <th>Admin</th>
          <th>Teams</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody class="[&>tr:nth-child(even)]:bg-gray-100">
        <tr
          v-for="item in users?.items as ExpandedUsersResponse[]"
          :key="item.id"
          class="[&>td]:px-3 [&>td]:py-2 [&>td:first-child]:rounded-l-sm [&>td:last-child]:rounded-r-sm"
        >
          <td>{{ item.name }}</td>
          <td>{{ item.username }}</td>
          <td>{{ item.email }}</td>
          <td>
            <fa
              v-if="item.is_admin"
              icon="fas fa-circle-check"
              class="text-green-500"
            />
          </td>
          <td>
            {{
              item.expand?.teams.map((t: TeamsResponse) => t.name).join(", ")
            }}
          </td>
          <td>
            <div class="flex items-end justify-end space-x-1">
              <a-button icon @click="openModal(item as ExpandedUsersResponse)">
                <fa icon="fas fa-pencil" />
              </a-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <a-dialog v-model="open" :title @close="closeModal">
      <admin-user-form :user @cancel="closeModal" @success="closeModal" />
    </a-dialog>
  </a-tab-pane>
</template>

<script setup lang="ts">
import type { TeamsResponse, UsersResponse } from "~/lib/types";

const pb = usePocketBase();

const { data: users } = pb.users.list({
  sort: "name",
  expand: "teams",
});

type ExpandedUsersResponse = UsersResponse<{
  teams: TeamsResponse[];
}>;

const open = ref(false);

const user = ref<ExpandedUsersResponse | undefined>();

const title = computed(() => {
  return user.value ? `Edit user: ${user.value.name}` : "";
});

function openModal(item?: ExpandedUsersResponse) {
  open.value = true;
  user.value = item;
}

function closeModal() {
  open.value = false;
  user.value = undefined;
}

onMounted(() => {
  pb.users.subscribe();
  pb.teams.subscribe();
});

onUnmounted(() => {
  pb.users.unsubscribe();
  pb.teams.unsubscribe();
});
</script>
