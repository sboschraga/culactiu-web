import React from "react";
// Importem les eines per canviar de pàgina
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Importem les dues pàgines que has creat
import Home from "./pages/Home";
import Fitxar from "./pages/Fitxar";

function App() {
  return (
    <Router>
      {/* --- BARRA DE NAVEGACIÓ --- */}
      <nav>
        {/* Part Esquerra: El Logo */}
        <div className="logo">
          CULACTIU
        </div>

        {/* Part Dreta: Els enllaços */}
        <div>
          {/* Enllaç a la portada */}
          <Link to="/">catàleg</Link> 
          {/* Enllaç a la pàgina de fitxar */}
          <Link to="/fitxar">accions</Link>
        </div>
      </nav>

      {/* --- EL TEU NAVEGADOR DE PÀGINES --- */}
      <Routes>
        {/* Quan la ruta és "/", mostra la portada (Home) */}
        <Route path="/" element={<Home />} />
        
        {/* Quan la ruta és "/fitxar", mostra el GPS (Fitxar) */}
        <Route path="/fitxar" element={<Fitxar />} />
      </Routes>
    </Router>
  );
}

export default App;