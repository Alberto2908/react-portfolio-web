import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const API = `${API_BASE}/api/cv`;

export const uploadCv = async (file) => {
  const form = new FormData();
  form.append("file", file);
  const res = await axios.post(`${API}/upload`, form, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; // expected: public path like /uploads/cv/cv.pdf
};
