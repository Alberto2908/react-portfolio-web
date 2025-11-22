import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getFormaciones, deleteFormacion } from "../services/FormacionService";

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

const sortFormaciones = (items) => {
  const monthOrder = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const getMonthIndex = (month) => {
    const index = monthOrder.indexOf(month);
    return index === -1 ? 0 : index;
  };

  return [...items].sort((a, b) => {
    const aEndYear =
      a.cursandoAhora || !a.anoFin ? a.anoInicio ?? 0 : a.anoFin;
    const bEndYear =
      b.cursandoAhora || !b.anoFin ? b.anoInicio ?? 0 : b.anoFin;

    if (aEndYear !== bEndYear) {
      return bEndYear - aEndYear;
    }

    const aEndMonth =
      a.cursandoAhora || !a.mesFin
        ? getMonthIndex(a.mesInicio)
        : getMonthIndex(a.mesFin);
    const bEndMonth =
      b.cursandoAhora || !b.mesFin
        ? getMonthIndex(b.mesInicio)
        : getMonthIndex(b.mesFin);

    if (aEndMonth !== bEndMonth) {
      return bEndMonth - aEndMonth;
    }

    if (a.anoInicio !== b.anoInicio) {
      return (b.anoInicio ?? 0) - (a.anoInicio ?? 0);
    }

    return getMonthIndex(b.mesInicio) - getMonthIndex(a.mesInicio);
  });
};

export const Formacion = () => {
  const navigate = useNavigate();
  const [studies, setStudies] = useState([]);
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

  const fetchFormaciones = () =>
    getFormaciones()
      .then((data) => {
        const sorted = sortFormaciones(data || []);
        setStudies(sorted);
      })
      .catch((err) => {
        console.error("Error cargando formación", err);
      })
      .finally(() => setLoading(false));

  useEffect(() => {
    fetchFormaciones();
  }, []);

  const openCreateForm = () => navigate("/admin/formacion/nuevo");
  const openEditForm = (st) => navigate(`/admin/formacion/${st.id}`);

  const handleDelete = async (st) => {
    const res = await swal.fire({
      icon: "question",
      title: "¿Eliminar formación?",
      text: `${st.nombre} - ${st.centro}`,
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });
    if (res.isConfirmed) {
      try {
        await deleteFormacion(st.id);
        setStudies((prev) => prev.filter((e) => e.id !== st.id));
        await swal.fire({ icon: "success", title: "Eliminado" });
      } catch {
        await swal.fire({ icon: "error", title: "No se pudo eliminar" });
      }
    }
  };

  return (
    <motion.section
      id="formacion"
      className="education"
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
          style={{ display: "inline-flex", alignItems: "center", gap: ".6rem", marginBottom: "5rem" }}
        >
          <motion.h2 style={{ margin: 0, textAlign: "center" }}>Formación Académica</motion.h2>
          <button
            onClick={openCreateForm}
            aria-label="Añadir formación"
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
        className="education-timeline"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {loading && studies.length === 0 ? (
          <p
            style={{
              textAlign: "center",
              color: "var(--light-text)",
              marginBottom: "1rem",
            }}
          >
            Cargando formación...
          </p>
        ) : null}

        {studies.map((study, index) => (
          <motion.div
            key={study.id}
            className={`education-item ${
              index % 2 === 0 ? "right" : "left"
            }`}
            variants={fadeInUp}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="education-marker" />
            <div className="education-content">
              <div className="education-header">
                <div style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                  <h3 style={{ margin: 0 }}>{study.nombre}</h3>
                  <div style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                    <button
                      aria-label="Editar"
                      onClick={() => openEditForm(study)}
                      style={{
                        width: 28,
                        height: 28,
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
                      onClick={() => handleDelete(study)}
                      style={{
                        width: 28,
                        height: 28,
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
                <span className="education-center">{study.centro}</span>
                <span className="education-dates">
                  {study.mesInicio} {study.anoInicio} -{" "}
                  {study.cursandoAhora
                    ? "Actualidad"
                    : `${study.mesFin} ${study.anoFin}`}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
