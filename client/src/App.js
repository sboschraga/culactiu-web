import React from "react"; 
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
  const esMenuCataleg = location.pathname === "/cataleg";
  
  // NOVA LÒGICA: Si la ruta és "/" (Splash), no mostrem la Nav
  const esSplash = location.pathname === "/";

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
      {/* Només es renderitza la nav si NO som a la Splash */}
      {!esSplash && (
        <nav style={navStyle}>
          <div className="logo">
             <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '1.8rem' }}>
                  CULACTIU
             </Link>
          </div>
          <div>
            <Link to="/cataleg" style={{ textDecoration: 'none', color: 'black', marginRight: '20px', fontFamily: 'inherit', cursor: 'pointer', fontSize: '1.1rem' }}>
              catàleg
            </Link>
            <Link to="/accions" style={{ textDecoration: 'none', color: 'black',marginRight: '20px', fontSize: '1.1rem' }}>
              accions
            </Link>
          </div>
        </nav>
      )}

      {/* --- RUTES --- */}
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

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;