import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// Importem les pàgines
import Home from "./pages/Home";
import Fitxar from "./pages/Fitxar";
import Accions from "./pages/Accions"; // La nova pàgina

function App() {
  return (
    <Router>
      {/* BARRA DE NAVEGACIÓ */}
      <nav>
        {/* Logo -> Porta a l'Inici (/) */}
        <div className="logo">
          <Link to="/" style={{ marginLeft: 0, fontWeight: 'bold' }}>CULACTIU</Link>
        </div>

        {/* Enllaços Dreta */}
        <div>
          {/* catàleg -> Porta al GPS (/cataleg) */}
          <Link to="/cataleg">catàleg</Link> 
          
          {/* accions -> Porta a la pàgina buida (/accions) */}
          <Link to="/accions">accions</Link>
        </div>
      </nav>

      {/* RUTES (On diem què es mostra a cada lloc) */}
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Hem canviat la ruta /fitxar per /cataleg perquè tingui sentit amb el menú */}
        <Route path="/cataleg" element={<Fitxar />} />
        
        <Route path="/accions" element={<Accions />} />
      </Routes>
    </Router>
  );
}

export default App;