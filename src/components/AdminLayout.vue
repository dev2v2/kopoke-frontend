<template>
  <div class="admin-layout">
    <header>
      <h1>관리자 화면</h1>
      <nav>
        <router-link to="/admin/write">글 작성</router-link>
        <router-link to="/admin/posts">글 목록</router-link>
      </nav>
    </header>
    <main>
      <!-- 이 부분에 각 페이지가 렌더링됩니다 -->
      <router-view />
    </main>
  </div>
</template>

<script setup></script>

<style scoped>
.admin-layout {
  padding: 20px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  gap: 10px;
}
</style>
