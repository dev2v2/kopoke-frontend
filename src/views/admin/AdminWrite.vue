<template>
  <div>
    <h2>공지 작성</h2>

    <!-- 제목 입력 필드 -->
    <input v-model="title" type="text" placeholder="제목을 입력하세요" />

    <!-- CKEditor5 에디터 -->
    <div id="editor"></div>

    <button @click="submitNotice">공지 등록</button>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let editorInstance = null; // 일반 변수로 CKEditor 인스턴스를 관리

const title = ""; // 제목 데이터

onMounted(() => {
  ClassicEditor.create(document.querySelector("#editor"))
    .then((editor) => {
      editorInstance = editor;
    })
    .catch((error) => {
      console.error("There was a problem initializing the editor.", error);
    });
});

const submitNotice = async () => {
  if (!editorInstance) return;

  const editorContent = editorInstance.getData(); // 에디터에서 입력한 데이터 가져오기

  // 로컬스토리지에서 access_token 가져오기
  const token = localStorage.getItem("access_token");

  try {
    const response = await fetch("/api/adminNotice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Authorization 헤더에 Bearer 토큰 추가
      },
      body: JSON.stringify({
        title: title.value,
        content: editorContent,
      }),
    });

    if (response.ok) {
      alert("공지 등록 성공!");
    } else {
      alert("공지 등록 실패!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("서버 오류 발생!");
  }
};
</script>

<style scoped>
#editor {
  min-height: 300px;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
}
</style>
