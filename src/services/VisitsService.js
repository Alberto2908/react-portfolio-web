import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API_URL = `${API_BASE}/api/visits`;

export const getVisits = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const incrementVisits = async () => {
  const res = await axios.post(`${API_URL}/increment`);
  return res.data;
};
