<script setup lang="ts">
import { ref } from "vue";
import { useContactStore } from "../store/contact";

const contactStore = useContactStore();

const query = ref("");

const search = () => {
  contactStore.setSearchQuery(query.value);
};
</script>

<template>
  <input v-model="query" @input="search" placeholder="Поиск контакта" />
</template>

<style scoped>
input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: inherit;
  margin-bottom: 1rem;
  margin: 10px 0 10px 0px;
}
</style>
