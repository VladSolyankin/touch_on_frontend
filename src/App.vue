<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useContactStore } from "./store/contact";
import ContactList from "./components/ContactList.vue";
import ContactForm from "./components/ContactForm.vue";
import SearchBar from "./components/SearchBar.vue";
import { Contact } from "./types";

const contactStore = useContactStore();
const isBookOpen = ref(false);
const selectedContact = ref<Contact | null>(null);

onMounted(() => {
  contactStore
    .getContacts()
    .then((contacts: Contact[]) => {
      contacts.forEach((contact: Contact) => {
        contactStore.contacts.push(contact);
      });
    })
    .catch((error: Error) => {
      console.error("Не удалось получить контакты с api: ", error);
    });
});

const handleSearch = (query: string) => {
  contactStore.setSearchQuery(query);
};

const addContact = (contact: any) => {
  contactStore.addContact(contact);
};

const deleteContact = (id: number) => {
  contactStore.deleteContact(id);
};

const editContact = (editedContact: Contact) => {
  contactStore.editContact(editedContact);
  selectedContact.value = null;
};

const filteredContacts = computed(() => contactStore.filteredContacts);

const toggleBook = () => {
  isBookOpen.value = true;
};

const handleEditContact = (contact: Contact) => {
  selectedContact.value = contact;
};
</script>

<template>
  <div id="app">
    <SearchBar @search="handleSearch" v-if="isBookOpen" />
    <div class="book-wrapper" @click="toggleBook">
      <div :class="['book', { open: isBookOpen }]">
        <div class="cover grid place-content-center">
          <span class="text-3xl">😎📞</span>
          <h1 class="text-2xl mb-5">Contact Management<br />(клик)</h1>
        </div>
        <div class="content">
          <div class="flex flex-col">
            <ContactForm
              :contact="selectedContact"
              @addContact="addContact"
              @editContact="editContact"
            />
          </div>
          <ContactList
            class="grid place-content-center"
            :contacts="filteredContacts"
            @deleteContact="deleteContact"
            @editContact="handleEditContact"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#app {
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  color: black;

  display: grid;
  place-content: center;
  text-align: center;
  min-height: 100vh;
}

.book-wrapper {
  perspective: 1000px;
}

.book {
  position: relative;
  width: 600px;
  height: 400px;
  transform-style: preserve-3d;
  transition: transform 1s ease;
}

.cover {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 1px solid black;
  background-color: wheat;
  border-radius: 5px;
  backface-visibility: hidden;
  transform-origin: left;
  transition: transform 1s ease;
}

.content {
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  transform: rotateY(-180deg);
  backface-visibility: hidden;
  transform-origin: left;
}

.book.open .cover {
  transform: rotateY(-180deg);
}

.book.open .content {
  transform: rotateY(0deg);
}
</style>
