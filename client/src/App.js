import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";

// Imports de les teves pàgines (mantenir tots els que tenies)
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
  const esMenuCataleg = location.pathname === "/cataleg";

 // Dins de la funció Layout a App.js

const navStyle = {
  display: isMobile ? 'grid' : 'flex', 
  gridTemplateColumns: isMobile ? '1fr 1fr 1fr' : 'none',
  justifyContent: isMobile ? 'stretch' : 'space-between', 
  alignItems: 'center',
  // PADDING MÒBIL: 15px (dalt), 20px (dreta), 15px (baix), 5px (esquerra)
  padding: isMobile ? '15px 20px 15px 5px' : '20px 40px', 
  position: esMenuCataleg ? 'absolute' : 'relative',
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
    fontSize: isMobile ? '0.85rem' : '1.1rem', // Una mica més petit al mòbil per seguretat
    fontFamily: 'inherit'
  };

  return (
    <>
      {!esSplash && (
        <nav style={navStyle}>
          
          {/* 1. LOGO */}
          <div style={{ textAlign: 'left' }}>
            <Link to="/home" style={{ 
              ...linkStyle, 
              fontWeight: 'bold', 
              fontSize: isMobile ? '1.2rem' : '1.8rem',
              textTransform: 'uppercase' 
            }}>
              CULACTIU
            </Link>
          </div>

          {/* 2. CATÀLEG: Al mòbil ocupa la columna central, al PC va dins del grup de la dreta */}
          {isMobile ? (
            <div style={{ textAlign: 'center' }}>
              <Link to="/cataleg" style={linkStyle}>catàleg</Link>
            </div>
          ) : null}

          {/* 3. DRETA: En PC conté els dos enllaços. En mòbil només conté Accions. */}
          <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '25px' }}>
            {!isMobile && (
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
        <Route path="/cataleg" element={<MenuCataleg />} />
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