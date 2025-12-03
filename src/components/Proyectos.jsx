import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getProyectos, deleteProyecto } from "../services/ProyectoService";
import { useAuth } from "../context/AuthContext.jsx";

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
  const { isAdmin } = useAuth();
  const [isWide, setIsWide] = useState(false);
  const renderCard = (p) => (
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
          {isAdmin ? (
            <button
              aria-label="Editar"
              onClick={() => openEditForm(p)}
              className="project-action-btn project-action-btn--edit"
            >
              <i className="fa-solid fa-pen" />
            </button>
          ) : null}
          {isAdmin ? (
            <button
              aria-label="Borrar"
              onClick={() => handleDelete(p)}
              className="project-action-btn project-action-btn--delete"
            >
              <i className="fa-solid fa-trash" />
            </button>
          ) : null}
        </div>
      </div>
      <p>{p.descripcion}</p>
      <div className="project-tech">
        {(p.tecnologias || []).map((t, idx) => (
          <span key={idx}>{t}</span>
        ))}
      </div>
    </motion.div>
  );

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

  const applyOrdered = useCallback((items) => {
    const list = Array.isArray(items) ? items.slice() : [];
    const total = list.length;
    const result = new Array(total);
    const taken = new Set();
    const floating = [];

    for (const it of list) {
      const pos = typeof it.posicion === 'number' ? it.posicion : null;
      if (Number.isInteger(pos) && pos >= 1 && pos <= total && !taken.has(pos)) {
        result[pos - 1] = it;
        taken.add(pos);
      } else {
        floating.push(it);
      }
    }
    // Shuffle floating to mimic habilidades behavior
    for (let i = floating.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [floating[i], floating[j]] = [floating[j], floating[i]];
    }
    let idx = 0;
    for (let i = 0; i < total; i++) {
      if (!result[i]) result[i] = floating[idx++];
    }
    return result.filter(Boolean);
  }, []);

  const fetchProyectos = () =>
    getProyectos()
      .then((data) => setProjects(applyOrdered(Array.isArray(data) ? data : [])))
      .catch((err) => console.error("Error cargando proyectos", err))
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchProyectos();
  }, []);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 900px)');
    const update = () => setIsWide(mql.matches);
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
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
        setProjects((prev) => applyOrdered(prev.filter((x) => x.id !== p.id)));
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
          {isAdmin ? (
            <button
              aria-label="Añadir proyecto"
              title="Añadir proyecto"
              onClick={openCreateForm}
              className="xp-create-btn"
            >
              <span className="xp-plus">+</span>
            </button>
          ) : null}
        </motion.div>
      </div>
      <motion.div
        className={`project-grid${projects.length === 1 ? " project-grid--1" : projects.length === 2 ? " project-grid--2" : ""}`}
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

        {(() => {
          const ordered = projects;
          const hasSingleLast = isWide && ordered.length >= 4 && (ordered.length % 3 === 1);
          if (!hasSingleLast) return ordered.map(renderCard);
          const head = ordered.slice(0, -1);
          const last = ordered[ordered.length - 1];
          return (
            <>
              {head.map(renderCard)}
              <div className="project-card project-spacer" aria-hidden="true" />
              {renderCard(last)}
            </>
          );
        })()}
      </motion.div>
    </motion.section>
  );
};
