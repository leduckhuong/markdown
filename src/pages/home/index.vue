<template src="./home.html"></template>
<script src="./home.js"></script>
<style scoped>
/* Giao diện trang DOCX */
.doc-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background: #f0f0f0;
  height: 100vh;
  overflow-y: auto;
}

.doc-page {
  width: 21cm;
  min-height: 29.7cm;
  padding: 2cm;
  background: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  line-height: 1.6;
  outline: none;
}

/* Mỗi block là một đoạn văn riêng */
.doc-block {
  min-height: 20px;
  padding: 5px;
  outline: none;
  border-bottom: 1px solid #ddd;
  margin-bottom: 5px;
  cursor: text;
  white-space: pre-wrap; /* Giữ xuống dòng */
}
.doc-block[data-placeholder]:empty::before {
  content: attr(data-placeholder);
  color: #aaa;
}
</style>