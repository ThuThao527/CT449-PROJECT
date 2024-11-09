import createApiClient from "./api.service"; // Import hàm tạo API client

class AdminService {
  constructor(baseUrl = "/api/admin") {
    this.api = createApiClient(baseUrl); // Khởi tạo API client với base URL cho admin
  }

  // Phương thức để phê duyệt yêu cầu mượn sách theo requestId
  async approveRequest(requestId) {
    return (await this.api.put(`/approve/${requestId}`)).data;
  }

  // Phương thức để từ chối yêu cầu mượn sách theo requestId
  async rejectRequest(requestId) {
    return (await this.api.put(`/reject/${requestId}`)).data;
  }
}

export default new AdminService(); // Xuất thể hiện của lớp AdminService
