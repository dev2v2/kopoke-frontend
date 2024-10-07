<template>
  <Gameboy>
    <div class="top-screen">
      <div class="speech-bubble">
        <vue-typer
          :text="typerText"
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
      <div class="mt-5"><img src="../assets/img/doctor.png"/></div>
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
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import Gameboy from '@/components/Gameboy.vue';
import { generateRandomNickname } from '@/utils/randomNickname';
import { generateRandomNumbers } from '@/utils/randomNumbers';

const router = useRouter();
const nickname = ref('');
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

// vue-typer에 사용할 텍스트를 설정
const typerText = computed(() => [
  `포켓몬 세상에서 너의 이름은 ${nickname.value}.`,
  '숫자 중 하나를 선택하면 함께할 파트너를 소개해줄게'
]);

// 숫자를 선택할 때 호출되는 함수
const selectNumber = (index) => {
  selectedIndex.value = index;
  // 숫자를 선택한 후, 백엔드에 데이터를 보내고 이동
  handleNumberSelection(randomNumbers.value[index]);
};

// 키보드 이벤트 핸들러
const handleKeydown = (event) => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
    selectedIndex.value = (selectedIndex.value - 1 + randomNumbers.value.length) % randomNumbers.value.length;
  } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    selectedIndex.value = (selectedIndex.value + 1) % randomNumbers.value.length;
  } else if (event.key === 'Enter') {
    selectNumber(selectedIndex.value);
  }
};

// 숫자를 선택한 후 백엔드로 전송하는 함수
const handleNumberSelection = async (number) => {
  try {
    const response = await axios.post('http://localhost:8090/api/save-number', {
      nickname: nickname.value,
      number,
    });

    if (response.status === 200) {
      router.push('/result');
    }
  } catch (error) {
    console.error('데이터 저장 중 오류 발생:', error);
    alert('데이터 저장에 실패했습니다. 다시 시도해주세요.');
  }
};

// 컴포넌트가 마운트될 때 호출
onMounted(() => {
  setNickname();
  setRandomNumbers();
  window.addEventListener('keydown', handleKeydown);
});

// 컴포넌트가 언마운트될 때 호출
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
});
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
