import { useEffect, useState } from "react";
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
    setIsLoaded(true);
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
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

      <>
        <Footer />
      </>
    </div>
  );
}

export default App;
