<template>
  <Gameboy>
    <div class="top-screen">
      <div class="speech-bubble">
        <span class="typed-element"></span>
      </div>
      <div class="mt-5"><img src="../assets/img/doctor.png" /></div>
    </div>
    <div class="bottom-screen">
      <ul>
        <li
          v-for="(number, index) in randomNumbers"
          :key="index"
          :class="{ selected: index === selectedIndex }"
          @click="selectNumber(index)"
        >
          {{ number }}
        </li>
      </ul>
    </div>
  </Gameboy>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { generateRandomNickname } from "@/utils/randomNickname";
import { generateRandomNumbers } from "@/utils/randomNumbers";
import Gameboy from "@/components/Gameboy.vue";
import Typed from "typed.js";

const router = useRouter();
const nickname = ref("");
const randomNumbers = ref([]);
const selectedIndex = ref(0);

// 닉네임 설정
const setNickname = () => {
  nickname.value = generateRandomNickname();
};

// 랜덤 숫자 설정
const setRandomNumbers = () => {
  randomNumbers.value = generateRandomNumbers();
};

// 숫자를 선택할 때 호출되는 함수
const selectNumber = (index) => {
  selectedIndex.value = index;
  // 숫자를 선택한 후, 백엔드에 데이터를 보내고 이동
  handleNumberSelection(randomNumbers.value[index]);
};

// 키보드 이벤트 핸들러
const handleKeydown = (event) => {
  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    selectedIndex.value =
      (selectedIndex.value - 1 + randomNumbers.value.length) % randomNumbers.value.length;
  } else if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    selectedIndex.value = (selectedIndex.value + 1) % randomNumbers.value.length;
  } else if (event.key === "Enter") {
    selectNumber(selectedIndex.value);
  }
};

// 숫자를 선택한 후 백엔드로 전송하는 함수
const handleNumberSelection = async (number) => {
  try {
    const response = await axios.post("http://localhost:8090/api/save-number", {
      nickname: nickname.value,
      number,
    });

    if (response.status === 200) {
      router.push("/result");
    }
  } catch (error) {
    console.error("데이터 저장 중 오류 발생:", error);
    alert("데이터 저장에 실패했습니다. 다시 시도해주세요.");
  }
};

// 컴포넌트가 마운트될 때 호출
onMounted(() => {
  setNickname();
  setRandomNumbers();
  window.addEventListener("keydown", handleKeydown);

  const options = {
    strings: [
      `포켓몬 세상에서 너의 이름은 <span class="nickname">${nickname.value}</span>.`,
      `숫자 중 하나를 선택하면 함께할 파트너를 소개할게.`,
    ],
    typeSpeed: 80,
    backSpeed: 50,
    loop: true,
    fadeOut: false,
    startDelay: 500,
    smartBackspace: false,
  };

  new Typed(".typed-element", options);
});

window.removeEventListener("keydown", handleKeydown);
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  cursor: pointer;
  margin: 10px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
}

li.selected {
  color: blue;
  background-color: lightgray;
}

li:hover {
  color: blue;
}
</style>
