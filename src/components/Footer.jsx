import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer
      className="footer"
      initial={{ opacit: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p>&copy; 2025 Alberto Cabello Lasheras - Full Stack Developer</p>
    </motion.footer>
  );
};
