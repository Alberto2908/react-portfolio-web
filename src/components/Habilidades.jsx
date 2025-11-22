import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getHabilidades, deleteHabilidad } from "../services/HabilidadService";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const BACKEND_BASE_URL = "http://localhost:8080";

const CATEGORY_ORDER = ["frontend", "backend", "database", "tools", "other"];

const CATEGORY_LABELS = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Base de datos",
  tools: "Herramientas",
  other: "Otros",
};

const getSkillImageSrc = (image) => {
  if (!image) return "/skills/default.png";
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads")) return `${BACKEND_BASE_URL}${image}`;
  const file = image.replace(/^habilidades\//, "");
  return `${BACKEND_BASE_URL}/uploads/habilidades/${file}`;
};

const handleSkillImageError = (event) => {
  event.currentTarget.src = "/skills/default.png";
};

export const Habilidades = () => {
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchHabilidades = () =>
    getHabilidades()
      .then((data) => setSkills(data || []))
      .catch((err) => console.error("Error cargando habilidades", err))
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchHabilidades();
  }, []);

  const openCreateForm = () => navigate("/admin/habilidad/nuevo");
  const openEditForm = (sk) => navigate(`/admin/habilidad/${sk.id}`);

  const handleDelete = async (sk) => {
    const res = await swal.fire({
      icon: "question",
      title: "¿Eliminar habilidad?",
      text: `${sk.name}`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
    if (res.isConfirmed) {
      try {
        await deleteHabilidad(sk.id);
        setSkills((prev) => prev.filter((s) => s.id !== sk.id));
        await swal.fire({ icon: "success", title: "Eliminada" });
      } catch {
        await swal.fire({ icon: "error", title: "No se pudo eliminar" });
      }
    }
  };

  const categoryMap = new Map();
  CATEGORY_ORDER.forEach((c) => categoryMap.set(c, []));

  skills.forEach((skill) => {
    const raw = (skill.category || "other").toString().toLowerCase();
    const key = CATEGORY_ORDER.includes(raw) ? raw : "other";
    const arr = categoryMap.get(key) || [];
    arr.push(skill);
    categoryMap.set(key, arr);
  });

  const categoryEntries = CATEGORY_ORDER.map((key) => [
    key,
    categoryMap.get(key) || [],
  ]).filter(([, items]) => items.length > 0);

  return (
    <motion.section
      id="habilidades"
      className="skills"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
              <motion.div
                variants={fadeInUp}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", marginBottom: "4rem" }}
              >
                <motion.h2 style={{ margin: 0, textAlign: "center" }}>Habilidades Técnicas</motion.h2>
                <button
                  onClick={openCreateForm}
                  aria-label="Añadir habilidad"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 999,
                    border: "1px solid var(--card-border)",
                    background: "rgba(15, 23, 42, 0.9)",
                    color: "var(--accent-color)",
                    cursor: "pointer",
                    lineHeight: 0,
                  }}
                >
                  <i className="fa-solid fa-plus" style={{ transform: "translateY(1px)" }} />
                </button>
              </motion.div>
            </div>

      <motion.div
        className="skills-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {loading && skills.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "var(--light-text)",
              marginBottom: "1rem",
            }}
          >
            Cargando habilidades...
          </p>
        ) : null}

        {categoryEntries.map(([categoryKey, categorySkills]) => (
          <motion.div
            key={categoryKey}
            className="skills-column"
            variants={fadeInUp}
          >
            <div className="skills-column-header">
              <h3>{CATEGORY_LABELS[categoryKey] || categoryKey}</h3>
              <span className="skills-count">{categorySkills.length}</span>
            </div>
            <div className="skills-list">
              {categorySkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  className="skill-row"
                  variants={fadeInUp}
                  whileHover={{ x: 4, transition: { duration: 0.15 } }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      gap: ".5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".5rem",
                      }}
                    >
                      <div className="skill-row-icon">
                        <img
                          src={getSkillImageSrc(skill.image)}
                          alt={skill.name}
                          onError={handleSkillImageError}
                        />
                      </div>
                      <span className="skill-row-name">{skill.name}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: ".35rem",
                      }}
                    >
                      <button
                        aria-label="Editar"
                        onClick={() => openEditForm(skill)}
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 8,
                          border: "1px solid var(--card-border)",
                          background: "rgba(15,23,42,0.7)",
                          color: "var(--accent-color)",
                          cursor: "pointer",
                        }}
                      >
                        <i className="fa-solid fa-pen" />
                      </button>
                      <button
                        aria-label="Borrar"
                        onClick={() => handleDelete(skill)}
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: 8,
                          border: "1px solid var(--card-border)",
                          background: "rgba(15,23,42,0.7)",
                          color: "#f87171",
                          cursor: "pointer",
                        }}
                      >
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
