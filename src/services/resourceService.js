import API from "./api";

export const fetchResources = async () => {
  const { data } = await API.get("/resources");
  return data;
};

export const createResource = async (formData) => {
  const { data } = await API.post("/resources", formData);
  return data;
};

export const updateResource = async (resourceId, formData) => {
  const { data } = await API.put(`/resources/${resourceId}`, formData);
  return data;
};

export const deleteResource = async (resourceId) => {
  const { data } = await API.delete(`/resources/${resourceId}`);
  return data;
};
