<template>
  <Gameboy>
    <div class="top-screen">
      <div class="speech-bubble">
        <span class="typed-element"></span>
      </div>
    </div>
    <div class="bottom-screen">
    </div>
  </Gameboy>
</template>

<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import Gameboy from "@/components/Gameboy.vue";
import Typed from "typed.js";
import { fetchPokemonData, sendPokemonDataToBackend } from "@/api/pokemonApi";

const selectedNumber = 35; // 선택된 번호, 실제로는 사용자 입력에 따라 바뀝니다.
const pokemonData = ref(null);

onMounted(async () => {
  try {
    // API 파일에서 데이터 가져오기
    pokemonData.value = await fetchPokemonData(selectedNumber);

    // 가져온 데이터를 가공하여 Typed.js로 출력
    const options = {
      strings: [
        `너의 파트너는 ${pokemonData.value.koreanName || pokemonData.value.name}`,
        `${pokemonData.value.koreanName || pokemonData.value.name}의 키는 ${
          pokemonData.value.height
        } m, 몸무게는 ${pokemonData.value.weight} kg`,
      ],
      typeSpeed: 80,
      backSpeed: 50,
      loop: true,
      fadeOut: false,
      startDelay: 500,
      smartBackspace: false,
    };

    new Typed(".typed-element", options);

    // 백엔드로 데이터 전송
    await sendPokemonDataToBackend(pokemonData.value);
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
  }
});
</script>
