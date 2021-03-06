import axios from "axios";

export const BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? "https://j6c202.q.ssafy.io"
    : "http://127.0.0.1:8000";

export const BACKEND_API_URL = `${BACKEND_URL}/api`;

function apiInstance() {
  const instance = axios.create({
    baseURL: BACKEND_API_URL,
    headers: {
      "Content-type": "application/json",
    },
  });

  return instance;
}

export { apiInstance };
