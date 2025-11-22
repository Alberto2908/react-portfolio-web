import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { createProyecto, getProyectoById, updateProyecto } from "../services/ProyectoService";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const BACKEND_BASE_URL = "http://localhost:8080";

const getImageSrc = (image) => {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads")) return `${BACKEND_BASE_URL}${image}`;
  return image;
};

export default function AdminProyectoForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);
  const [loading, setLoading] = useState(!!id);
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    enlace: "",
    tecnologiasText: "",
    imagen: null, // File | null
  });
  const [currentImage, setCurrentImage] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (!id) return;
    getProyectoById(id)
      .then((p) => {
        if (!p) return;
        setFormData((prev) => ({
          ...prev,
          nombre: p.nombre || "",
          descripcion: p.descripcion || "",
          enlace: p.enlace || "",
          tecnologiasText: (p.tecnologias || []).join(", "),
          imagen: null,
        }));
        setCurrentImage(p.imagen || "");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const swal = Swal.mixin({
    customClass: {
      popup: "swal-portfolio-popup",
      title: "swal-portfolio-title",
      htmlContainer: "swal-portfolio-html",
      actions: "swal-portfolio-actions",
      confirmButton: "swal-portfolio-confirm",
      cancelButton: "swal-portfolio-cancel",
    },
    buttonsStyling: false,
    background: "var(--card-bg)",
    color: "var(--text-color)",
    iconColor: "var(--accent-color)",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, imagen: file }));
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(file ? URL.createObjectURL(file) : "");
  };

  const tecnologiasArray = useMemo(() =>
    (formData.tecnologiasText || "")
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0),
  [formData.tecnologiasText]);

  const validate = () => {
    const issues = [];
    if (!formData.nombre.trim()) issues.push("Indica el nombre del proyecto.");
    if (!formData.descripcion.trim()) issues.push("Añade una breve descripción.");
    if (!formData.enlace.trim()) issues.push("Añade un enlace (GitHub o demo).");
    if (tecnologiasArray.length < 1 || tecnologiasArray.length > 3)
      issues.push("Indica entre 1 y 3 tecnologías separadas por coma.");
    tecnologiasArray.forEach((t) => {
      if (t.length > 50) issues.push(`Tecnología demasiado larga: ${t}`);
    });
    if (!editing && !formData.imagen) issues.push("Selecciona una imagen.");
    return issues;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const issues = validate();
    if (issues.length) {
      await swal.fire({
        icon: "warning",
        title: "Revisa el formulario",
        html: `<ul style="text-align:left;margin:0;padding-left:18px;">${issues
          .map((m) => `<li>${m}</li>`)
          .join("")}</ul>`,
      });
      return;
    }

    try {
      const fd = new FormData();
      fd.append("nombre", formData.nombre.trim());
      fd.append("descripcion", formData.descripcion.trim());
      fd.append("enlace", formData.enlace.trim());
      tecnologiasArray.forEach((t) => fd.append("tecnologias", t));
      if (formData.imagen) fd.append("imagen", formData.imagen);

      if (editing) {
        await updateProyecto(id, fd);
        await swal.fire({ icon: "success", title: "Proyecto actualizado" });
      } else {
        await createProyecto(fd);
        await swal.fire({ icon: "success", title: "Proyecto creado" });
      }
      navigate("/", { replace: true });
    } catch {
      await swal.fire({ icon: "error", title: "No se pudo guardar" });
    }
  };

  return (
    <motion.section className="projects" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
      <motion.h2 variants={fadeInUp} initial="initial" animate="animate" style={{ textAlign: "center" }}>
        {editing ? "Editar proyecto" : "Nuevo proyecto"}
      </motion.h2>

      {loading ? (
        <p style={{ textAlign: "center", color: "var(--light-text)" }}>Cargando...</p>
      ) : (
        <motion.form
          onSubmit={handleSubmit}
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="experience-card admin-form"
          style={{ padding: "1.5rem 1.75rem", maxWidth: 900, margin: "0 auto" }}
        >
          <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "1fr 1fr" }}>
            {(currentImage || previewUrl) && (
              <div className="span-2" style={{ gridColumn: "1 / -1" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", justifyContent: "center" }}>
                  <img
                    src={previewUrl || getImageSrc(currentImage)}
                    alt="Vista previa"
                    style={{ maxHeight: 160, borderRadius: 12, border: "1px solid var(--card-border)", background: "#0b1220" }}
                  />
                </div>
              </div>
            )}

            <input className="admin-input" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
            <input className="admin-input" name="enlace" placeholder="Enlace (GitHub o demo)" value={formData.enlace} onChange={handleChange} />

            <textarea className="admin-input span-2" name="descripcion" placeholder="Descripción" value={formData.descripcion} onChange={handleChange} />

            <input
              className="admin-input span-2"
              name="tecnologiasText"
              placeholder="Tecnologías (entre 1 y 3, separadas por coma)"
              value={formData.tecnologiasText}
              onChange={handleChange}
            />

            <input className="admin-input span-2" type="file" accept="image/*" name="imagen" onChange={handleFileChange} />
          </div>

          <div style={{ display: "flex", gap: ".5rem", marginTop: "0.9rem", justifyContent: "center" }}>
            <button type="submit" className="swal-portfolio-confirm" style={{ cursor: "pointer" }}>{editing ? "Guardar cambios" : "Crear"}</button>
            <button type="button" className="swal-portfolio-cancel" style={{ cursor: "pointer" }} onClick={() => navigate("/", { replace: true })}>Cancelar</button>
          </div>
        </motion.form>
      )}
    </motion.section>
  );
}
