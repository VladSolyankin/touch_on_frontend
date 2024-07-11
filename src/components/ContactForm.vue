<script setup lang="ts">
import { reactive, computed, watch, defineProps, defineEmits } from "vue";
import { Contact } from "../types";
import { useContactStore } from "../store/contact";

const props = defineProps<{ contact?: Contact | null }>();
const emit = defineEmits(["addContact", "editContact"]);

const contactStore = useContactStore();

const form = reactive<Contact>({
  id: undefined,
  name: "",
  phone: "",
  email: "",
});

const isEdit = computed(() => !!form.id);

watch(
  () => props.contact,
  (newContact) => {
    if (newContact) {
      Object.assign(form, newContact);
    }
  },
  { immediate: true }
);

const submitForm = () => {
  if (isEdit.value) {
    contactStore.editContact({ ...form });
    emit("editContact", { ...form });
  } else {
    form.id = Date.now();
    contactStore.addContact({ ...form });
    emit("addContact", { ...form });
    resetForm();
  }
};

const resetForm = () => {
  form.id = undefined;
  form.name = "";
  form.phone = "";
  form.email = "";
};
</script>

<template>
  <h2>{{ isEdit ? "Редактировать контакт" : "Добавить контакт" }}</h2>
  <form @submit.prevent="submitForm" class="contacts__form">
    <input v-model="form.name" placeholder="Имя" required />
    <input
      v-model="form.phone"
      type="tel"
      pattern="+7[0-9]{10}"
      placeholder="Телефон"
      required
    />
    <input v-model="form.email" type="email" placeholder="Email" required />
    <button type="submit">{{ isEdit ? "Редактировать" : "Добавить" }}</button>
  </form>
</template>

<style scoped>
.contacts__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  max-width: 400px;
  margin: 0 auto;
  padding: 1rem;
}

.contacts__form input {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;

  font-size: 1rem;
  font-family: inherit;

  width: 100%;
}
</style>
