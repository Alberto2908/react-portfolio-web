import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API_URL = `${API_BASE}/api/contacto`;

export const createContact = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
