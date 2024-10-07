<template>
  <Gameboy>
    <div class="top-screen">
      <div class="speech-bubble">
        <vue-typer
          :text="['반가워!', '포켓몬 세계에 온 것을 환영한다!']"
          :repeat="Infinity"
          :shuffle="false"
          initial-action="erasing"
          :pre-type-delay="70"
          :type-delay="70"
          :pre-erase-delay="2000"
          :erase-delay="250"
          erase-style="clear"
          :erase-on-complete="false"
          caret-animation="blink"
        ></vue-typer>
      </div>
      <div class="mt-5"><img src="../../public/doctor.png" /></div>
    </div>
    <div class="bottom-screen">
      <p @click="startAdventure" class="speech-answer">▶ 포켓몬 세계로 ···</p>
    </div>
  </Gameboy>
</template>
<script setup>
import Gameboy from "@/components/Gameboy.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const startAdventure = async () => {
  window.location.href = "http://localhost:8090/oauth2/authorization/google";
};
</script>
