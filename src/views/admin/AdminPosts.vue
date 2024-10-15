<!-- src/views/AdminPosts.vue -->
<template>
  <AdminLayout>
    <div class="admin-posts">
      <h2>글 목록</h2>
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(post, index) in posts" :key="post.id">
            <td>{{ index + 1 }}</td>
            <td>{{ post.title }}</td>
            <td>{{ post.date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from "@/components/AdminLayout.vue";

// 샘플 데이터 (실제 API 연동 필요)
const posts = ref([
  { id: 1, title: "첫 번째 글", date: "2024-10-15" },
  { id: 2, title: "두 번째 글", date: "2024-10-16" },
]);
</script>

<style scoped>
.admin-posts {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}
</style>
