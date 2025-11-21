import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getFormaciones } from "../services/FormacionService";

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
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFormaciones()
      .then((data) => {
        const sorted = sortFormaciones(data || []);
        setStudies(sorted);
      })
      .catch((err) => {
        console.error("Error cargando formación", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <motion.section
      id="formacion"
      className="education"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        Formación Académica
      </motion.h2>

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
                <h3>{study.nombre}</h3>
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
