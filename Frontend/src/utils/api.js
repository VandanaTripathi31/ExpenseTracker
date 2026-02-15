import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-api-ti4u.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = token;
  }

  return req;
});

export default API;
