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

export const Contacto = () => {
  return (
    <motion.section
      id="contacto"
      className="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        viewport={{ once: true }}
      >
        Ponte en contacto
      </motion.h2>
      <motion.div className="contact-content" variants={fadeInUp}>
        <motion.form className="contact-form">
          <motion.input
            type="text"
            name="name"
            placeholder="Tu nombre..."
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Tu email..."
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.textarea
            name="message"
            placeholder="Tu mensaje..."
            required
            whileFocus={{ scale: 1.02 }}
          />
          <motion.button
            className="submit-btn"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Enviar mensaje
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.section>
  );
};
