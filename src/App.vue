<template>
  <div class="app">
    <router-view />
  </div>
</template>
<script setup></script>
<style>
@font-face {
  font-family: "DungGeunMo";
  src: url("/src/assets/fonts/DungGeunMo.eot") format("eot"),
    url("/src/assets/fonts/DungGeunMo.woff") format("woff"),
    url("/src/assets/fonts/DungGeunMo.woff2") format("woff2");
}

* {
  font-family: "DungGeunMo", sans-serif !important;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app {
  min-height: 100vh;
  background: linear-gradient(180deg, #ec9f19, #ecc519);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #444;
  position: relative;
  /* color: #0275d8; */
}

ul {
  list-style: none;
}
</style>
