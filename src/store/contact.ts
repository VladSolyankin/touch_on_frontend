import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Contact } from "../types";
import * as api from "../api/contacts";

export const useContactStore = defineStore("contact", () => {
  const contacts = ref<Contact[]>(
    JSON.parse(localStorage.getItem("contacts") || "[]")
  );

  const searchQuery = ref("");

  const filteredContacts = computed(() =>
    contacts.value.filter((contact) =>
      contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  );

  const addContact = (contact: Contact) => {
    contacts.value.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacts.value));
  };

  const deleteContact = (id: number) => {
    contacts.value = contacts.value.filter((contact) => contact.id !== id);
    localStorage.setItem("contacts", JSON.stringify(contacts.value));
  };

  const editContact = (editedContact: Contact) => {
    const index = contacts.value.findIndex(
      (contact) => contact.id === editedContact.id
    );
    if (index !== -1) {
      contacts.value[index] = editedContact;
      localStorage.setItem("contacts", JSON.stringify(contacts.value));
    }
  };

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const getContacts = () => api.getContacts();

  return {
    contacts,
    searchQuery,
    filteredContacts,
    addContact,
    deleteContact,
    editContact,
    setSearchQuery,
    getContacts,
  };
});
