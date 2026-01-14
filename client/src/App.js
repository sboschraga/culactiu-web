import React from "react"; 
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Cataleg from "./pages/Cataleg";         
import MenuCataleg from "./pages/MenuCataleg"; 
import Denegat from "./pages/Denegat";
import Accions from "./pages/Accions";
import DetallCarrer from "./pages/DetallCarrer";
import AfegirCarrer from "./pages/AfegirCarrer"; 
// AFEGIM LA IMPORTACIÓ DE LA NOVA PÀGINA:
import DetallAccio from "./pages/DetallAccio"; 

function Layout() {
  const location = useLocation();
  const esMenuCataleg = location.pathname === "/cataleg";

  const navStyle = {
    display: 'flex', 
    justifyContent: 'space-between', 
    padding: '20px', 
    alignItems: 'center',
    position: esMenuCataleg ? 'absolute' : 'relative',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100, 
    background: 'transparent', 
    boxSizing: 'border-box'
  };

  return (
    <>
      <nav style={navStyle}>
        <div className="logo">
           <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '1.8rem' }}>
                CULACTIU
           </Link>
        </div>
        <div>
          <Link to="/cataleg" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontFamily: 'inherit', cursor: 'pointer' }}>
            catàleg
          </Link>
          <Link to="/accions" style={{ textDecoration: 'none', color: 'black' }}>
            accions
          </Link>
        </div>
      </nav>

      {/* --- RUTES --- */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cataleg" element={<MenuCataleg />} />
        <Route path="/llista-cataleg" element={<Cataleg />} />
        <Route path="/denegat" element={<Denegat />} />
        
        {/* Aquesta és la llista general d'accions */}
        <Route path="/accions" element={<Accions />} />
        
        {/* Aquesta és la pàgina de detall individual (nova) */}
        <Route path="/accio/:id" element={<DetallAccio />} />

        <Route path="/carrer/:nom" element={<DetallCarrer />} />
        <Route path="/afegir-carrer" element={<AfegirCarrer />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;