import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/contacto`;

export const createContact = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};
