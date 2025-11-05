import api, { setTokens, clearTokens } from "./client";

// PUBLIC_INTERFACE
export async function signup({ name, email, password, role }) {
  /** Signup a new user. Returns backend response. */
  const { data } = await api.post("/api/auth/signup", { name, email, password, role });
  return data;
}

// PUBLIC_INTERFACE
export async function login({ email, password }) {
  /** Login, store tokens, return user/session info if available. */
  const { data } = await api.post("/api/auth/login", { email, password });
  const access = data?.access_token || data?.accessToken;
  const refresh = data?.refresh_token || data?.refreshToken;
  if (access || refresh) setTokens({ accessToken: access, refreshToken: refresh });
  return data;
}

// PUBLIC_INTERFACE
export function logout() {
  /** Clears stored tokens and redirects to login. */
  clearTokens();
  window.location.href = "/login";
}
