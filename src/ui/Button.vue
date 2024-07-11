<template>
  <button>
    <slot />
  </button>
</template>

<style>
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
</style>
