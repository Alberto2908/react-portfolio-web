import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getHabilidades } from "../services/HabilidadService";

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
  return image;
};

const handleSkillImageError = (event) => {
  event.currentTarget.src = "/skills/default.png";
};

export const Habilidades = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHabilidades()
      .then((data) => {
        setSkills(data || []);
      })
      .catch((err) => {
        console.error("Error cargando habilidades", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const categoryMap = new Map();
  CATEGORY_ORDER.forEach((c) => categoryMap.set(c, []));

  skills.forEach((skill) => {
    const raw = (skill.category || "other").toString().toLowerCase();
    const key = CATEGORY_ORDER.includes(raw) ? raw : "other";
    const arr = categoryMap.get(key) || [];
    arr.push(skill);
    categoryMap.set(key, arr);
  });

  const categoryEntries = CATEGORY_ORDER
    .map((key) => [key, categoryMap.get(key) || []])
    .filter(([, items]) => items.length > 0);

  return (
    <motion.section
      id="habilidades"
      className="skills"
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
        Habilidades Técnicas
      </motion.h2>

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
                  <div className="skill-row-icon">
                    <img
                      src={getSkillImageSrc(skill.image)}
                      alt={skill.name}
                      onError={handleSkillImageError}
                    />
                  </div>
                  <span className="skill-row-name">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
