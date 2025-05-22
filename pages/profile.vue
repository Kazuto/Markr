<template>
  <div class="mx-auto flex h-full max-w-md items-center justify-center">
    <m-card title="Profile">
      <div class="flex flex-col gap-4">
        <m-input id="name" v-model="data.name" name="name" />
        <a-button @click="updateUser">Update</a-button>
      </div>
    </m-card>
  </div>
</template>

<script setup lang="ts">
const pb = usePocketBase();

useHead({
  title: "Profile",
});

const { data } = useAuth();

const { mutate } = pb.users.update();

function updateUser() {
  mutate({
    id: data.value.id,
    data: {
      name: data.value.name,
    },
  });
}
</script>

<style scoped></style>
