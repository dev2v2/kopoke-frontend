<template>
  <Gameboy>
    <div class="top-screen">
      <div class="speech-bubble">
        <span class="typed-element"></span>
      </div>
      <div class="mt-5"><img src="../assets/img/doctor.png" /></div>
    </div>
    <div class="bottom-screen">
      <p @click="startAdventure" class="speech-answer">▶ 포켓몬 세계로 ···</p>
      <a href="/select">dev</a>
    </div>
  </Gameboy>
</template>
<script setup>
import Gameboy from "@/components/Gameboy.vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import Typed from "typed.js";

onMounted(() => {
  const options = {
    strings: ["반가워!", "포켓몬 세계에 온 것을 환영한다!"],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
    fadeOut: false,
    startDelay: 500,
    smartBackspace: false,
  };

  new Typed(".typed-element", options);
});

const router = useRouter();
const startAdventure = async () => {
  window.location.href = "http://localhost:8090/oauth2/authorization/google";
};
</script>