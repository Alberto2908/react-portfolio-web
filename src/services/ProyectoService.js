import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API_URL = `${API_BASE}/api/proyectos`;

export const getProyectos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getProyectoById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createProyecto = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateProyecto = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteProyecto = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
