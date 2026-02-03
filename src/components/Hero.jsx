import { motion } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

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

export const Hero = () => {
  const BACKEND_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
  const API_BASE = BACKEND_BASE_URL.replace(/\/$/, "");
  const CV_URL = API_BASE.endsWith("/api") ? `${API_BASE}/cv/view` : `${API_BASE}/api/cv/view`;
  return (
    <motion.section
      id="home"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div className="hero-intro" variants={fadeInUp}>
            <span className="intro-icon" aria-hidden="true">👋</span>
            <span className="intro-text">Hola, soy</span>
            <span className="intro-caret" aria-hidden="true"></span>
          </motion.div>
          <motion.h1
            className="glitch"
            variants={fadeInUp}
            whileHover={{ scale: 1.02 }}
          >
            Alberto Cabello Lasheras
          </motion.h1>
          <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            Full Stack Developer
          </motion.h2>
          <motion.p className="hero-description" variants={fadeInUp}>
            Creo experiencias digitales que combinan un diseño llamativo con una
            funcionalidad potente. Me especializo en aplicaciones web modernas e
            interfaces de usuario interactivas.
          </motion.p>
          <motion.div className="cta-buttons" variants={staggerContainer}>
            <motion.a
              href="#proyectos"
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Ver Mi Trabajo
            </motion.a>
            <motion.a
              href="#contacto"
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contáctame
            </motion.a>
            <motion.a
              href={CV_URL}
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Descarga mi CV
            </motion.a>
          </motion.div>
          <motion.div className="social-links" variants={staggerContainer}>
            <motion.a href="https://github.com/Alberto2908/" target="_blank">
              {" "}
              <i className="fab fa-github"></i>
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/alberto-cabello-lasheras/"
              target="_blank"
            >
              {" "}
              <i className="fab fa-linkedin"></i>
            </motion.a>
            <motion.a href="https://www.instagram.com/acl2908/" target="_blank">
              {" "}
              <i className="fab fa-instagram"></i>
            </motion.a>
            <motion.a href="https://x.com/acl2908" target="_blank">
              {" "}
              <i className="fab fa-x-twitter"></i>
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image-container"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="code-display">
            <SyntaxHighlighter
              language="javascript"
              customStyle={{
                margin: 0,
                padding: "2rem",
                height: "100%",
                borderRadius: "20px",
                background: "rgba(30,41,59,0.8)",
                backdropFilter: "blur(10px)",
                marginBottom: 50,
              }}
              style={vscDarkPlus}
            >
              {`const aboutMe: DeveloperProfile = {
  codename: "Alberto Cabello Lasheras",
  origin: "🌍 Madrid",
  role: "Full Stack Developer",
  stack: {
    languages: ["Java", "Python", "HTML", "TypeScript", "JavaScript"],
    frameworks: ["Angular", "React", "Vue"],
    databases: ["MongoDB", "MySQL", "Firebase"]
  },
  traits: [
    "Detallista",
    "Experto en API",
    "Modo oscuro siempre",
    "terminal aesthetic enthusiast",
  ],
  missionStatement:
    "Transformando ideas en interfaces y bugs en funcionalidades",
  availability: "Disponible para contratación",
};`}
            </SyntaxHighlighter>
          </div>

          <motion.div
            className="floating-card"
            animate={{ y: [0, -10, 0], rotate: [0, 2, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="card-content">
              <span className="card-icon"> 💻 </span>
              <span className="card-text">Siempre aprendiendo algo nuevo!</span>
              <span className="card-icon"> 💻 </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
