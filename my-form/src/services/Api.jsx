// services/Api.jsx

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // change to your backend URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ sends cookies automatically with every request
});

// ─── Response Interceptor ─────────────────────────────────────
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("inter runs")
//       window.location.href = "/login"; // redirect on unauthorized
//     }
//     return Promise.reject(error);
//   }
// );

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// ─── GET ───────────────────────────────────────────────────────
export const getRequest = async (url, params = {}) => {
  const response = await API.get(url, { params });
  return response.data;
};


// ─── POST ──────────────────────────────────────────────────────
export const postRequest = async (url, data = {}) => {
  console.log("postRequest",data)
  const response = await API.post(url, data);
  return response.data;
};

// ─── PUT ───────────────────────────────────────────────────────
export const putRequest = async (url, data = {}) => {
  const response = await API.put(url, data);
  return response.data;
};

// ─── DELETE ────────────────────────────────────────────────────
export const deleteRequest = async (url) => {
  const response = await API.delete(url);
  return response.data;
};

export default API;