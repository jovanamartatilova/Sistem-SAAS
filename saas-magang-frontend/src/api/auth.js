import api from "./axios";

export const login = async (email, password) => {
  await api.get("/sanctum/csrf-cookie");

  const res = await api.post("/login", {
    email,
    password,
  });

  return res.data;
};

export const getUser = async () => {
  const res = await api.get("/api/user");
  return res.data;
};