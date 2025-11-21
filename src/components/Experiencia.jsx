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

const experiences = [
  {
    id: "1",
    empresa: "Ejemplo",
    puesto: "Ejemplo",
    descripcion:
      "Ejemplo.",
    mesInicio: "Enero",
    anoInicio: 2022,
    trabajoActivo: true,
    mesFin: null,
  },
  {
    id: "2",
    empresa: "Ejemplo",
    puesto: "Ejemplo",
    descripcion:
      "Ejemplo.",
    mesInicio: "Enero",
    anoInicio: 2020,
    trabajoActivo: false,
    mesFin: "Diciembre 2022",
  }
];

export const Experiencia = () => {
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
                {exp.mesInicio} {exp.anoInicio} -
                {" "}
                {exp.trabajoActivo ? "Actualidad" : exp.mesFin}
              </span>
            </div>
            <p className="experience-description">{exp.descripcion}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
