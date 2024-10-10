<template>
  <img class="main-logo" src="../assets/img/main_logo.png" alt="main logo" />
  <div class="main-container">
    <div class="welcome">sss, 포켓몬 세계에 온 것을 환영한다!</div>
    <div class="pokemon">
      <div class="sprites">
        <div class="balls">
          <span>01</span>
          <span>02</span>
          <span>03</span>
          <span>04</span>
          <span>05</span>
          <span>06</span>
        </div>
        <div class="sprite">
          <div><img src="" alt="" /></div>
          <div>포켓몬 설명</div>
        </div>
      </div>
      <div class="chatbot">
        <div class="message-container">
          <div
            v-for="(message, index) in messages"
            :key="index"
            :class="['message', message.type]"
          >
            {{ message.text }}
          </div>
        </div>
        <div class="input-container">
          <input
            type="text"
            v-model="userInput"
            placeholder="질문을 입력하세요..."
            @keydown.enter="sendMessage"
          />
          <button @click="sendMessage">전송</button>
        </div>
      </div>
    </div>
    <div class="community">
      <div class="chat">
        <div class="chat-messages-container">
          <div class="chat-messages">
            <div v-for="(chat, index) in chatMessages" :key="index" class="chat-message">
              <strong>{{ chat.user }}:</strong> {{ chat.text }}
            </div>
          </div>
          <div class="user-list">
            <ul>
              <li v-for="(user, index) in users" :key="index">{{ user }}</li>
            </ul>
          </div>
        </div>
        <div class="chat-input">
          <input
            type="text"
            v-model="chatInput"
            placeholder="메시지를 입력하세요..."
            @keydown.enter="sendChatMessage"
          />
          <button @click="sendChatMessage">전송</button>
        </div>
      </div>
      <div class="timeline">
        <h3>타임라인</h3>
        <ul>
          <li v-for="(log, index) in timelineLogs" :key="index">
            {{ log.time }} - {{ log.event }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const messages = ref([
  { text: "안녕하세요! 포켓몬에 대해 무엇이든 물어보세요.", type: "bot" },
]);

const userInput = ref("");

// 챗봇 메시지 전송 함수
const sendMessage = () => {
  if (userInput.value.trim() !== "") {
    messages.value.push({ text: userInput.value, type: "user" });
    setTimeout(() => {
      messages.value.push({ text: `${userInput.value}에 대한 답변입니다.`, type: "bot" });
    }, 1000);
    userInput.value = "";
  }
};

// 채팅 관련 데이터 및 함수
const users = ref(["사용자1", "사용자2", "사용자3"]);
const chatMessages = ref([
  { user: "사용자1", text: "안녕하세요!" },
  { user: "사용자2", text: "반갑습니다!" },
]);

const chatInput = ref("");

// 채팅 메시지 전송 함수
const sendChatMessage = () => {
  if (chatInput.value.trim() !== "") {
    chatMessages.value.push({ user: "나", text: chatInput.value });
    chatInput.value = "";
  }
};

// 타임라인 데이터
const timelineLogs = ref([
  { time: "10:00", event: "사용자1이 접속했습니다." },
  { time: "10:05", event: "사용자2가 접속했습니다." },
  { time: "10:10", event: "사용자3이 접속했습니다." },
]);
</script>

<style src="../assets/css/main.css"></style>
