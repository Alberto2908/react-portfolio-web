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

const skills = [
  {
    id: "1",
    name: "Java",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    category: "Backend",
  },
  {
    id: "2",
    name: "Spring Boot",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    category: "Backend",
  },
  {
    id: "3",
    name: "React",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
  },
  {
    id: "4",
    name: "JavaScript",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Frontend",
  },
  {
    id: "5",
    name: "MongoDB",
    image:
      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    category: "Base de datos",
  },
  {
    id: "6",
    name: "Git",
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Herramientas",
  },
];

export const Habilidades = () => {
  const categories = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, /** @type {Record<string, typeof skills>} */ ({}));

  const categoryEntries = Object.entries(categories);

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
        {categoryEntries.map(([categoryName, categorySkills]) => (
          <motion.div
            key={categoryName}
            className="skills-column"
            variants={fadeInUp}
          >
            <div className="skills-column-header">
              <h3>{categoryName}</h3>
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
                    <img src={skill.image} alt={skill.name} />
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
