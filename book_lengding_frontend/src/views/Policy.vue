<template>
  <div class="policy-container">
    <h2>Chính sách mượn sách của thư viện</h2>
    <ul>
      <li>Thời gian mượn tối đa: 14 ngày.</li>
      <li>Số lượng sách tối đa: 5 quyển mỗi lần.</li>
      <li>Phí phạt: 1.000 VNĐ/ngày nếu trả trễ.</li>
      <li>Gia hạn: Có thể gia hạn thêm 7 ngày nếu không có người mượn tiếp.</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Policy',
};
</script>

<style scoped>
.policy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  font-size: 16px;
  line-height: 1.5;
  color: #555;
}

li::before {
  content: '•';
  color: #007bff;
  margin-right: 8px;
}
</style>
