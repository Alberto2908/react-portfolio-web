import axios from "axios";

const API = `${import.meta.env.VITE_API_BASE_URL}/api/cv`;

export const uploadCv = async (file) => {
  const form = new FormData();
  form.append("file", file);
  const res = await axios.post(`${API}/upload`, form, {
    withCredentials: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; // expected: public path like /uploads/cv/cv.pdf
};
