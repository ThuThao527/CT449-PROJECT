import axios from "axios";
import BookService from "@/services/book.service";

const commonConfig = {
headers: {
"Content-Type": "application/json",
Accept: "application/json",
},
};
export default function createApiClient(baseURL) {
  return axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

