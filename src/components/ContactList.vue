<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import ContactItem from "./ContactItem.vue";
import { Contact } from "../types";

defineProps<{
  contacts: Contact[];
}>();

const emit = defineEmits(["deleteContact", "editContact"]);

const handleDelete = (id: number) => {
  emit("deleteContact", id);
};

const handleEdit = (contact: Contact) => {
  emit("editContact", contact);
};
</script>

<template>
  <div class="contact-item__container">
    <ContactItem
      class="contact-item"
      v-for="contact in contacts"
      :key="contact.id"
      :contact="contact"
      @delete="handleDelete"
      @edit="handleEdit"
    />
  </div>
</template>

<style scoped>
.contact-item__container {
  display: grid;
  place-content: center;

  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  text-align: center;
  margin: 10px 0 10px 0;
}

@media (max-width: 900px) {
  .contact-item__container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .contact-item__container {
    grid-template-columns: repeat(1, 1fr);
  }
}

.contact-item {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-family: inherit;

  margin: 10px 0 10px 0px;
}
</style>
