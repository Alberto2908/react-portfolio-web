import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/formaciones`;

export const getFormaciones = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getFormacionById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createFormacion = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const updateFormacion = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

export const deleteFormacion = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
