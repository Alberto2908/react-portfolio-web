import { useEffect, useState } from "react";
import { incrementVisits } from "./services/VisitsService";
import "./App.css";
import { Contacto } from "./components/Contacto";
import { Experiencia } from "./components/Experiencia";
import { Footer } from "./components/Footer";
import { Formacion } from "./components/Formacion";
import { Habilidades } from "./components/Habilidades";
import { Hero } from "./components/Hero";
import { Navbar } from "./components/Navbar";
import { Proyectos } from "./components/Proyectos";
import emailjs from "@emailjs/browser";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // defer to next frame to avoid synchronous setState warning
    const id = requestAnimationFrame(() => setIsLoaded(true));
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
    // increment visit counter (non-blocking) with StrictMode guard
    const VISIT_FLAG = '__VISIT_INCREMENTED__';
    if (!window[VISIT_FLAG]) {
      window[VISIT_FLAG] = true;
      incrementVisits().catch(() => {});
    }
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`app ${isLoaded ? "loaded" : ""}`}>
      <Navbar />

      <Hero />
      <Proyectos />
      <Experiencia />
      <Formacion />
      <Habilidades />
      <Contacto />

      <Footer />
    </div>
  );
}

export default App;
