import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/visits`;

export const getVisits = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const incrementVisits = async () => {
  const res = await axios.post(`${API_URL}/increment`);
  return res.data;
};
