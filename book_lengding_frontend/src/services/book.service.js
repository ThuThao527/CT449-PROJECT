import createApiClient from "./api.service"; //import hàm tạo api client

class BookService{
    constructor(baseUrl = '/api/books'){
        this.api = createApiClient(baseUrl); //khởi tạo api client với base url cho sách
    }

    //phương thức lấy danh sách tất cả các sách
    async getAll(){
        return (await this.api.get("/all")).data;
    }

    // Phương thức để thêm sách mới
  async addBook(data) {
    return (await this.api.post("/add", data)).data;
  }

  // Phương thức để mượn sách theo ID
  async borrowBook(id) {
    return (await this.api.post(`/borrow/${id}`)).data;
  }

  // Phương thức để trả sách theo ID
  async returnBook(id) {
    return (await this.api.post(`/return/${id}`)).data;
  }
}

export default new BookService(); // Xuất thể hiện của lớp BookService
