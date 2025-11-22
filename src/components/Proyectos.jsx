import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getProyectos } from "../services/ProyectoService";

const BACKEND_BASE_URL = "http://localhost:8080";

const getProjectImageSrc = (image) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  if (image.startsWith("/uploads")) return `${BACKEND_BASE_URL}${image}`;
  const file = image.replace(/^proyectos\//, "");
  return `${BACKEND_BASE_URL}/uploads/proyectos/${file}`;
};

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

export const Proyectos = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProyectos()
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error cargando proyectos", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.section
      id="proyectos"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        Mis Proyectos
      </motion.h2>
      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {loading && (
          <motion.div variants={fadeInUp} className="project-card">
            <h3>Cargando proyectos...</h3>
          </motion.div>
        )}

        {!loading && projects.length === 0 && (
          <motion.div variants={fadeInUp} className="project-card">
            <h3>Sin proyectos todavía</h3>
            <p>Añade uno desde la consola para probar.</p>
          </motion.div>
        )}

        {projects.map((p) => (
          <motion.div
            key={p.id}
            className="project-card"
            variants={fadeInUp}
            whileHover={{ y: -10, transition: { duration: 0.2 } }}
          >
            <motion.div
              className="project-image"
              style={{
                backgroundImage: p.imagen
                  ? `url(${getProjectImageSrc(p.imagen)})`
                  : "linear-gradient(135deg, var(--gradient-start), var(--gradient-end))",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            />
            <div style={{ position: "relative" }}>
              <h3>{p.nombre}</h3>
              {p.enlace && (
                <a
                  href={p.enlace}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Abrir repositorio de ${p.nombre}`}
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "1.5rem",
                    color: "var(--accent-color)",
                    fontSize: "1.25rem",
                    lineHeight: 1,
                    zIndex: 2,
                  }}
                >
                  <i className="fa-brands fa-github" />
                </a>
              )}
            </div>
            <p>{p.descripcion}</p>
            <div className="project-tech">
              {(p.tecnologias || []).map((t, idx) => (
                <span key={idx}>{t}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
