import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

import Splash from "./pages/ExpoSplash"; 
import Home from "./pages/Home";
import Cataleg from "./pages/Cataleg";          
import MenuCataleg from "./pages/MenuCataleg"; 
import Denegat from "./pages/Denegat";
import Accions from "./pages/Accions";
import DetallCarrer from "./pages/DetallCarrer";
import AfegirCarrer from "./pages/AfegirCarrer"; 
import DetallAccio from "./pages/DetallAccio"; 

function Layout() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const esSplash = location.pathname === "/";
  // Fem que la nav sigui absoluta a les pàgines amb fons visual fort
  const esAbsolute = location.pathname === "/cataleg" || location.pathname === "/home";

  const navStyle = {
    display: isMobile ? 'grid' : 'flex', 
    gridTemplateColumns: isMobile ? '1fr 1fr 1fr' : 'none',
    justifyContent: isMobile ? 'stretch' : 'space-between', 
    alignItems: 'center',
    padding: isMobile ? '15px 20px 15px 5px' : '20px 40px', 
    position: esAbsolute ? 'absolute' : 'relative',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    background: 'transparent',
    boxSizing: 'border-box'
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    textTransform: 'lowercase',
    fontSize: isMobile ? '0.85rem' : '1.1rem',
    fontFamily: 'inherit'
  };

  return (
    <>
      {!esSplash && (
        <nav style={navStyle}>
          
          {/* 1. ESQUERRA: LOGO -> SPLASH */}
          <div style={{ textAlign: 'left' }}>
            <Link to="/" style={{ 
              ...linkStyle, 
              fontWeight: 'bold', 
              fontSize: isMobile ? '1.2rem' : '1.8rem',
              textTransform: 'uppercase' 
            }}>
              CULACTIU
            </Link>
          </div>

          {/* 2. CENTRE (Només Mòbil) -> MENU CATÀLEG */}
          {isMobile && (
            <div style={{ textAlign: 'center' }}>
              <Link to="/cataleg" style={linkStyle}>catàleg</Link>
            </div>
          )}

          {/* 3. DRETA -> MENU CATÀLEG i ACCIONS */}
          <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '25px' }}>
            {!isMobile && (
              /* CORREGIT: Ara torna a portar al menú de selecció (GPS/Afegir) */
              <Link to="/cataleg" style={linkStyle}>catàleg</Link>
            )}
            <Link to="/accions" style={linkStyle}>
              accions
            </Link>
          </div>

        </nav>
      )}

      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/home" element={<Home />} />
        {/* /cataleg és el menú de decisió (MenuCataleg.jsx) */}
        <Route path="/cataleg" element={<MenuCataleg />} />
        {/* /llista-cataleg és la llista filtrable (Cataleg.jsx) */}
        <Route path="/llista-cataleg" element={<Cataleg />} />
        <Route path="/denegat" element={<Denegat />} />
        <Route path="/accions" element={<Accions />} />
        <Route path="/accio/:id" element={<DetallAccio />} />
        <Route path="/carrer/:nom" element={<DetallCarrer />} />
        <Route path="/afegir-carrer" element={<AfegirCarrer />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}