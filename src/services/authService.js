import API from "./api";

export const register = async (formData) => {
  const { data } = await API.post("/auth/register", formData);
  return data;
};

export const login = async (formData) => {
  const { data } = await API.post("/auth/login", formData);
  return data;
};

export const createTherapistUser = async (formData) => {
  const { data } = await API.post("/auth/therapist-user", formData);
  return data;
};

export const fetchAllUsers = async () => {
  const { data } = await API.get("/auth/users");
  return data;
};
