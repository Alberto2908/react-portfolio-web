import { motion } from "framer-motion";

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

const studies = [
  {
    id: "1",
    nombre: "Grado en Ingeniería Informática",
    centro: "Universidad de Ejemplo",
    mesInicio: "Septiembre",
    anoInicio: 2018,
    cursandoAhora: true,
    mesFin: null,
    anoFin: null,
  },
  {
    id: "2",
    nombre: "Bootcamp de Desarrollo Full Stack",
    centro: "Academia Online",
    mesInicio: "Enero",
    anoInicio: 2023,
    cursandoAhora: false,
    mesFin: "Junio",
    anoFin: 2023,
  },
  {
    id: "3",
    nombre: "Bootcamp de Desarrollo Full Stack",
    centro: "Academia Online",
    mesInicio: "Enero",
    anoInicio: 2023,
    cursandoAhora: false,
    mesFin: "Junio",
    anoFin: 2023,
  },
  {
    id: "4",
    nombre: "Bootcamp de Desarrollo Full Stack",
    centro: "Academia Online",
    mesInicio: "Enero",
    anoInicio: 2023,
    cursandoAhora: false,
    mesFin: "Junio",
    anoFin: 2023,
  },
];

export const Formacion = () => {
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
