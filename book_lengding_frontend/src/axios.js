import axios from 'axios';

// Tạo một instance của axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Đảm bảo cookie (session) được gửi kèm trong mọi yêu cầu
});



export default apiClient;
