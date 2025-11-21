import axios from "axios";

const API_URL = "http://localhost:8080/api/habilidades";

export const getHabilidades = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getHabilidadById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createHabilidad = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateHabilidad = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteHabilidad = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
