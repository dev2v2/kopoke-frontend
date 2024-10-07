<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script setup></script>
<style>
.app {
  min-height: 100vh;
  background: linear-gradient(180deg, #ec9f19, #ecc519);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  /* color: #0275d8; */
  padding: 2rem;
}
</style>
