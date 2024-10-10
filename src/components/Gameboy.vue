<template>
  <div class="gameboy">
    <span class="logo">P o k é m o n</span>
    <span class="kdj">KIM DAJEONG</span>
    <div class="screen">
      <slot></slot>
      <!-- 여기에 각 화면의 내용이 들어감 -->
    </div>
    <div class="d-pad"></div>
    <div class="button a" @click="goToGithub"></div>
    <div class="button b"></div>
    <div class="small-button select"></div>
    <div class="small-button start"></div>
  </div>
</template>

<script setup></script>

<style src="../assets/css/gameboy.css"></style>