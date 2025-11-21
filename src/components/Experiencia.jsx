import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getExperiencias } from "../services/ExperienciaService";

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

const sortExperiences = (items) => {
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
      a.trabajoActivo || !a.anoFin ? a.anoInicio ?? 0 : a.anoFin;
    const bEndYear =
      b.trabajoActivo || !b.anoFin ? b.anoInicio ?? 0 : b.anoFin;

    if (aEndYear !== bEndYear) {
      return bEndYear - aEndYear;
    }

    const aEndMonth =
      a.trabajoActivo || !a.mesFin
        ? getMonthIndex(a.mesInicio)
        : getMonthIndex(a.mesFin);
    const bEndMonth =
      b.trabajoActivo || !b.mesFin
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

export const Experiencia = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getExperiencias()
      .then((data) => {
        const sorted = sortExperiences(data || []);
        setExperiences(sorted);
      })
      .catch((err) => {
        console.error("Error cargando experiencias", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <motion.section
      id="experiencia"
      className="experience"
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
        Experiencia Laboral
      </motion.h2>
      <motion.div
        className="experience-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        {experiences.map((exp) => (
          <motion.div
            key={exp.id}
            className="experience-card"
            variants={fadeInUp}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
          >
            <div className="experience-header">
              <div className="experience-title-row">
                <h3>{exp.puesto}</h3>
                <span
                  className={`experience-status ${
                    exp.trabajoActivo ? "active" : "ended"
                  }`}
                >
                  {exp.trabajoActivo ? "En activo" : "Finalizado"}
                </span>
              </div>
              <span className="experience-company">{exp.empresa}</span>
              <span className="experience-dates">
                {exp.mesInicio} {exp.anoInicio} -{" "}
                {exp.trabajoActivo ? "Actualidad" : `${exp.mesFin} ${exp.anoFin}`}
              </span>
            </div>
            <p className="experience-description">{exp.descripcion}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
