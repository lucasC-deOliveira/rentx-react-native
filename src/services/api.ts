import axios from "axios";

const api = axios.create({
  baseURL: "http://172.23.208.1:3333"
})

export default api;