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

// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (
//       error.response?.status === 401 &&
//       window.location.pathname !== "/login"
//     ) {
//       window.location.href = "/login";
//     }

//     return Promise.reject(error);
//   }
// );

API.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;
        console.log("interceptors running after token deleted")
        console.log("originalRequest",originalRequest)
// error.config contains the configuration of the original failed request.
// (error.response?.status === 401 || error.response?.status === 500)
        if (
          error.response?.status === 401
             &&
            !originalRequest._retry &&
            window.location.pathname !== "/login"
        ) {
            originalRequest._retry = true;

            try {
                // Get a new access token
                await API.post("/auth/refresh");
                console.log("/auth/refresh running")

                // Retry the original request
                return API(originalRequest);

            } catch (refreshError) {
                // Refresh token is also invalid/expired
                window.location.href = "/login";

                return Promise.reject(refreshError);
            }
        }

        else{
          console.log("no /auth/refresh running")
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




// API.interceptors.response.use(
//     (response) => response,

//     async (error) => {
//         const originalRequest = error.config;
// error.config contains the configuration of the original failed request.

//         if (
//             error.response?.status === 401 &&
//             !originalRequest._retry &&
//             window.location.pathname !== "/login"
//         ) {
//             originalRequest._retry = true;

//             try {
//                 // Get a new access token
//                 await API.post("/auth/refresh");

//                 // Retry the original request
//                 return API(originalRequest);

//             } catch (refreshError) {
//                 // Refresh token is also invalid/expired
//                 window.location.href = "/login";

//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );