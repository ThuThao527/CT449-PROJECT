import AdminService from "@/services/admin.service";

const state = {
  adminActions: [], // Mảng lưu các hành động hoặc trạng thái có thể cần thiết
};

const mutations = {
  // Bạn có thể thêm mutation để cập nhật trạng thái adminActions nếu cần
  setAdminActions(state, actions) {
    state.adminActions = actions;
  },
};

const actions = {
  async approveRequest({ commit }, requestId) {
    try {
      const response = await AdminService.approveRequest(requestId);
      console.log("Request approved:", response);
      // Bạn có thể thêm commit nếu muốn lưu trạng thái nào đó trong state
    } catch (error) {
      console.error("Error approving request:", error);
    }
  },

  async rejectRequest({ commit }, requestId) {
    try {
      const response = await AdminService.rejectRequest(requestId);
      console.log("Request rejected:", response);
      // Bạn có thể thêm commit nếu muốn lưu trạng thái nào đó trong state
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  },
};

const getters = {
  // Các getter để truy cập state nếu cần
  adminActions: (state) => state.adminActions,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
