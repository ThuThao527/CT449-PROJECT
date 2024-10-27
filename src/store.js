import { createStore } from "vuex";
import book from "./store/modules/book"; // Module cho book
import admin from "./store/modules/admin"; // Module cho admin

const store = createStore({
  modules: {
    book, // Module cho book
    admin, // Module cho admin
  },
});

export default store;
