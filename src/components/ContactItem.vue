<script setup lang="ts">
import Button from "../ui/Button.vue";
import { defineProps, defineEmits } from "vue";
import { Contact } from "../types";

const props = defineProps<{
  contact: Contact;
}>();

const emit = defineEmits(["delete", "edit"]);

const remove = () => {
  emit("delete", props.contact.id!);
};

const edit = () => {
  emit("edit", props.contact);
};
</script>

<template>
  <transition name="fade">
    <div class="contact-item">
      <span>{{ contact.name }}</span>
      <span>{{ contact.phone }}</span>
      <span>{{ contact.email }}</span>
      <Button @click="edit">Редактировать</Button>
      <Button @click="remove">Удалить</Button>
    </div>
  </transition>
</template>

<style>
.contact-item {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
}

button {
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  color: black;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;

  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: black;
    color: white;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
