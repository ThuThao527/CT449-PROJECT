import BookService from "@/services/book.service"; // Import service để gọi API

// Khai báo state, mutations, actions và getters
const state = {
  books: [], // Khởi tạo state cho danh sách sách
};

const mutations = {
  setBooks(state, books) {
    state.books = books; // Mutation để cập nhật state books
  },
};

const actions = {
  async fetchBooks({ commit }) {
    try {
      const books = await BookService.getAll(); // Gọi API để lấy danh sách sách
      commit("setBooks", books); // Gọi mutation để cập nhật state
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },
};

const getters = {
  books: (state) => state.books, // Getter để truy xuất dữ liệu books từ state
};

// Xuất module với namespaced
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
