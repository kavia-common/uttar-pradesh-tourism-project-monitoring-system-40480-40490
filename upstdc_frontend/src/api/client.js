import axios from "axios";
import config from "../config";

// Simple in-memory token store with localStorage persistence
const TOKEN_KEY = "upstdc_access_token";
const REFRESH_KEY = "upstdc_refresh_token";

// PUBLIC_INTERFACE
export function getAccessToken() {
  /** Returns current access token from storage. */
  return localStorage.getItem(TOKEN_KEY);
}

// PUBLIC_INTERFACE
export function setTokens({ accessToken, refreshToken }) {
  /** Saves tokens to localStorage. Both keys optional for partial updates. */
  if (accessToken) localStorage.setItem(TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_KEY, refreshToken);
}

// PUBLIC_INTERFACE
export function clearTokens() {
  /** Clears all tokens from storage. */
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

const api = axios.create({
  baseURL: config.apiBaseUrl,
  withCredentials: false,
});

// Attach Authorization header on each request
api.interceptors.request.use((req) => {
  const token = getAccessToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Refresh handling
let isRefreshing = false;
let pendingQueue = [];

function onRefreshed(newToken) {
  pendingQueue.forEach((cb) => cb(newToken));
  pendingQueue = [];
}

function addPendingRequest(callback) {
  pendingQueue.push(callback);
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  if (!refreshToken) throw new Error("No refresh token");

  const res = await axios.post(`${config.apiBaseUrl}/api/auth/refresh`, {
    refresh_token: refreshToken,
  });
  const newAccess = res?.data?.access_token || res?.data?.accessToken;
  const newRefresh = res?.data?.refresh_token || res?.data?.refreshToken;
  setTokens({ accessToken: newAccess, refreshToken: newRefresh });
  return newAccess;
}

// Response interceptor to auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue request until refresh finished
        return new Promise((resolve) => {
          addPendingRequest((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }
      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const newToken = await refreshAccessToken();
        isRefreshing = false;
        onRefreshed(newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (e) {
        isRefreshing = false;
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

// PUBLIC_INTERFACE
export default api;
