<template>
  <Gameboy>
    <div class="top-screen">
      <div class="speech-bubble">
        <span class="typed-element"></span>
      </div>
      <div class="mt-5 sprite">
        <img
          :src="currentSprite"
          @mouseover="handleMouseOver"
          @mouseout="showFrontSprite"
          alt="Pokemon Sprite"
        />
      </div>
    </div>
    <div class="bottom-screen">
      <p @click="startAdventure" class="speech-answer">▶ 여행을 시작한다.</p>
    </div>
  </Gameboy>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Gameboy from "@/components/Gameboy.vue";
import Typed from "typed.js";
import { fetchPokemonData, sendPokemonDataToBackend } from "@/api/pokemonApi";
import router from "@/router";

const selectedNumber = 2; // 선택된 번호, 실제로는 사용자 입력에 따라 바뀝니다.
const pokemonData = ref(null);
const currentSprite = ref(""); // 현재 노출할 스프라이트 이미지
const audio = ref(null);

onMounted(async () => {
  try {
    // API 파일에서 데이터 가져오기
    pokemonData.value = await fetchPokemonData(selectedNumber);
    
    // 앞모습으로 초기 이미지 설정
    currentSprite.value = pokemonData.value.frontSprite;

    // 울음소리 오디오 객체 생성
    if (pokemonData.value.cry) {
      audio.value = new Audio(pokemonData.value.cry);
    }

    // Typed.js 설정
    const options = {
      strings: [
        `너의 파트너는 ${pokemonData.value.koreanName}`,
        `${pokemonData.value.koreanName}의 키는 ${pokemonData.value.height / 10} m, 몸무게는 ${
          pokemonData.value.weight / 10
        } kg`,
        `타입은 ${pokemonData.value.type}`,
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

// 마우스 오버 시 뒷모습 노출 및 울음소리 재생
const handleMouseOver = () => {
  showBackSprite();
  playCry();
};

// 마우스 오버 시 뒷모습 노출
const showBackSprite = () => {
  if (pokemonData.value?.backSprite) {
    currentSprite.value = pokemonData.value.backSprite;
  }
};

// 마우스 아웃 시 앞모습으로 복원
const showFrontSprite = () => {
  currentSprite.value = pokemonData.value.frontSprite;
};

// 울음소리 재생
const playCry = () => {
  if (audio.value) {
    audio.value.pause(); // 기존에 재생 중인 오디오가 있으면 일시 정지
    audio.value.currentTime = 0; // 오디오를 처음부터 재생
    audio.value.play();
  }
};

const startAdventure = async () => {
  router.push("/main");
};
</script>

<style scoped>
.sprite{
  width:350px;
}

.sprite img{
  max-width: 350px !important;
}
</style>