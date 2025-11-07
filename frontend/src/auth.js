import { api } from "./api";

export async function login(username, password) {
  const res = await api.post("/auth/login", { username, password });
  const { token, name } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("name", name);
  return { token, name };
}

export async function getMe() {
  const res = await api.get("/auth/me");
  return res.data;
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("name");
}

export function isAuthed() {
  return !!localStorage.getItem("token");
}
