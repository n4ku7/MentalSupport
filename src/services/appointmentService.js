import API from "./api";

export const fetchTherapists = async () => {
  const { data } = await API.get("/therapists");
  return data;
};

export const createTherapist = async (formData) => {
  const { data } = await API.post("/therapists", formData);
  return data;
};

export const bookAppointment = async (formData) => {
  const { data } = await API.post("/appointments", formData);
  return data;
};

export const fetchMyAppointments = async () => {
  const { data } = await API.get("/appointments/my");
  return data;
};

export const fetchAllAppointments = async () => {
  const { data } = await API.get("/appointments");
  return data;
};

export const fetchMyTherapistProfile = async () => {
  const { data } = await API.get("/therapists/me");
  return data;
};

export const addMyAvailability = async (formData) => {
  const { data } = await API.post("/therapists/me/availability", formData);
  return data;
};
