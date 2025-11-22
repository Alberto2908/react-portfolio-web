import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useState } from "react";

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormStatus({
      submitting: true,
      success: false,
      error: false,
      message: "",
    });

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }
      );

      setFormStatus({
        submitting: false,
        success: true,
        error: false,
        message: "¡Mensaje enviado con éxito!",
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setFormStatus({
        submitting: false,
        success: false,
        error: true,
        message: "No se ha podido enviar el mensaje. Intentalo de nuevo",
      });
    }
  };

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
        <motion.form className="contact-form" onSubmit={handleSubmit}>
          <motion.input
            type="text"
            name="name"
            placeholder="Tu nombre..."
            required
            whileFocus={{ scale: 1.02 }}
            onChange={handleInputChange}
          />
          <motion.input
            type="email"
            name="email"
            placeholder="Tu email..."
            required
            whileFocus={{ scale: 1.02 }}
            onChange={handleInputChange}
          />
          <motion.textarea
            name="message"
            placeholder="Tu mensaje..."
            required
            whileFocus={{ scale: 1.02 }}
            onChange={handleInputChange}
          />
          <motion.button
            className="submit-btn"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={formStatus.submitting}
          >
            {formStatus.submitting ? "Enviando..." : "Enviar mensaje"}
          </motion.button>
          {formStatus.message && (
            <motion.div
              className={`form-status ${
                formStatus.success ? "success" : "error"
              }`}
            >
              {formStatus.message}
            </motion.div>
          )}
        </motion.form>
      </motion.div>
    </motion.section>
  );
};
