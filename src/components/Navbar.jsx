import { useState } from "react";
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

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#proyectos", label: "Proyectos" },
    { href: "#experiencia", label: "Experiencia" },
    { href: "#formacion", label: "Formación" },
    { href: "#habilidades", label: "Habilidades" },
    { href: "#contacto", label: "Contacto" },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="logo"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Portfolio
      </motion.div>

      <motion.ul
        className="nav-links nav-links-desktop"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {links.map((link) => (
          <motion.li
            key={link.href}
            variants={fadeInUp}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href={link.href}>{link.label}</a>
          </motion.li>
        ))}
      </motion.ul>

      <motion.button
        className={`nav-toggle ${isOpen ? "open" : ""}`}
        whileTap={{ scale: 0.9 }}
        aria-label="Abrir menú de navegación"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span></span>
        <span></span>
        <span></span>
      </motion.button>

      <motion.div
        className="nav-mobile"
        initial={false}
        animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        style={{ pointerEvents: isOpen ? "auto" : "none" }}
      >
        <motion.ul
          className="nav-mobile-list"
          variants={staggerContainer}
          initial="initial"
          animate={isOpen ? "animate" : "initial"}
        >
          {links.map((link) => (
            <motion.li
              key={link.href}
              variants={fadeInUp}
              whileTap={{ scale: 0.97 }}
            >
              <a href={link.href} onClick={handleLinkClick}>
                {link.label}
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.nav>
  );
};
