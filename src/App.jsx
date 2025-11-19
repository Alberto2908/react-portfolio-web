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

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
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
