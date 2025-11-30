import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getProyectos, deleteProyecto } from "../services/ProyectoService";

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
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
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

  const fetchProyectos = () =>
    getProyectos()
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error cargando proyectos", err))
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchProyectos();
  }, []);

  const openCreateForm = () => navigate("/admin/proyecto/nuevo");
  const openEditForm = (p) => navigate(`/admin/proyecto/${p.id}`);

  const handleDelete = async (p) => {
    const res = await swal.fire({
      icon: "question",
      title: "¿Eliminar proyecto?",
      text: p.nombre,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
    if (res.isConfirmed) {
      try {
        await deleteProyecto(p.id);
        setProjects((prev) => prev.filter((x) => x.id !== p.id));
        await swal.fire({ icon: "success", title: "Eliminado" });
      } catch {
        await swal.fire({ icon: "error", title: "No se pudo eliminar" });
      }
    }
  };

  return (
    <motion.section
      id="proyectos"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="section-header-wrapper">
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="section-header section-header--projects"
        >
          <motion.h2 className="section-header-title">Mis Proyectos</motion.h2>
          <button
            aria-label="Añadir proyecto"
            title="Añadir proyecto"
            onClick={openCreateForm}
            className="xp-create-btn"
          >
            <span className="xp-plus">+</span>
          </button>
        </motion.div>
      </div>
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
            <div className="project-header">
              <h3>{p.nombre}</h3>
              <div className="project-actions">
                {(p.enlaceGithub || p.enlace) && (
                  <a
                    href={p.enlaceGithub || p.enlace}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Abrir GitHub de ${p.nombre}`}
                    className="project-action-link"
                  >
                    <i className="fa-brands fa-github" />
                  </a>
                )}
                {p.enlaceDespliegue && (
                  <a
                    href={p.enlaceDespliegue}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Abrir demo de ${p.nombre}`}
                    className="project-action-link"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square" />
                  </a>
                )}
                <button
                  aria-label="Editar"
                  onClick={() => openEditForm(p)}
                  className="project-action-btn project-action-btn--edit"
                >
                  <i className="fa-solid fa-pen" />
                </button>
                <button
                  aria-label="Borrar"
                  onClick={() => handleDelete(p)}
                  className="project-action-btn project-action-btn--delete"
                >
                  <i className="fa-solid fa-trash" />
                </button>
              </div>
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
