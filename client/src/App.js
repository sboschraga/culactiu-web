import React from "react"; 
// 1. HEM TRET 'useState' i 'useNavigate' PERQUÈ NO ES FEIEN SERVIR
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Cataleg from "./pages/Cataleg";         
import MenuCataleg from "./pages/MenuCataleg"; 
import Denegat from "./pages/Denegat";
import Accions from "./pages/Accions";
import DetallCarrer from "./pages/DetallCarrer";
import AfegirCarrer from "./pages/AfegirCarrer"; 

function Layout() {
  // 2. HEM TRET LA LÍNIA 'const navigate = ...'

  // NECESSITEM SABER A QUINA PÀGINA ESTEM PER FER LA BARRA TRANSPARENT
  const location = useLocation();
  const esMenuCataleg = location.pathname === "/cataleg";

  // DEFINIM L'ESTIL DE LA BARRA SEGONS LA PÀGINA
  const navStyle = {
    display: 'flex', 
    justifyContent: 'space-between', 
    padding: '20px', 
    alignItems: 'center',
    
    // Si estem al menú, la barra "flota" sobre la foto (absolute).
    // Si estem a qualsevol altra pàgina, es comporta normal (relative).
    position: esMenuCataleg ? 'absolute' : 'relative',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100, // Per assegurar que queda per sobre de la foto
    background: 'transparent', 
    boxSizing: 'border-box'
  };

  return (
    <>
      {/* --- BARRA DE NAVEGACIÓ AMB ESTIL DINÀMIC --- */}
      <nav style={navStyle}>
        
        <div className="logo">
           <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '1.8rem' }}>
                CULACTIU
           </Link>
        </div>

        <div>
          <Link 
            to="/cataleg" 
            style={{ 
              textDecoration: 'none', 
              color: 'black', 
              marginRight: '20px', 
              fontFamily: 'inherit',
              cursor: 'pointer'
            }}
          >
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
        <Route path="/accions" element={<Accions />} />
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