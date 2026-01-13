import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

// --- IMPORTACIONS DE PÀGINES ---
import Home from "./pages/Home";
import Cataleg from "./pages/Cataleg";
import Denegat from "./pages/Denegat";
import Accions from "./pages/Accions";
import DetallCarrer from "./pages/DetallCarrer";

// Component que conté la Barra de Navegació i la lògica del GPS
function Layout() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckLocation = () => {
    setLoading(true);

    if (!("geolocation" in navigator)) {
      alert("El teu navegador no suporta geolocalització.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // --- ZONA PERMESA (Barcelona i voltants) ---
        // Ajusta aquests números si cal
        const latMin = 41.0; 
        const latMax = 41.8;
        const lonMin = 1.9;
        const lonMax = 2.4;

        const dinsZona = 
          latitude >= latMin && 
          latitude <= latMax && 
          longitude >= lonMin && 
          longitude <= lonMax;

        // SI VOLS ENTRAR SEMPRE PER FER PROVES, DESCOMENTA LA LÍNIA DE SOTA:
        // const dinsZona = true; 

        if (dinsZona) {
          // Si és correcte, anem directes a la llista
          navigate("/cataleg");
        } else {
          // Si no, a la pàgina d'error
          navigate("/denegat");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error GPS:", error);
        alert("No s'ha pogut obtenir la teva ubicació. Revisa els permisos.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <>
      {/* --- BARRA DE NAVEGACIÓ --- */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', alignItems: 'center' }}>
        
        <div className="logo">
           <Link to="/" style={{ 
                textDecoration: 'none', 
                color: 'black', 
                fontWeight: 'bold',
                fontSize: '1.8rem'
           }}>
                CULACTIU
           </Link>
        </div>

        <div>
          {/* BOTÓ CATÀLEG: Comprova ubicació al clicar */}
          <button 
            onClick={handleCheckLocation} 
            disabled={loading}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: 'inherit', 
              fontFamily: 'inherit',
              textDecoration: 'none', 
              marginRight: '20px',
              color: loading ? 'grey' : 'black'
            }}
          >
            {loading ? "comprovant..." : "catàleg"}
          </button>

          <Link to="/accions" style={{ textDecoration: 'none', color: 'black' }}>
            accions
          </Link>
        </div>
      </nav>

      {/* --- RUTES --- */}
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* Ruta directa al catàleg (protegida pel botó anterior) */}
        <Route path="/cataleg" element={<Cataleg />} />
        
        <Route path="/denegat" element={<Denegat />} />
        <Route path="/accions" element={<Accions />} />
        
        {/* Ruta Detall Carrer */}
        <Route path="/carrer/:nom" element={<DetallCarrer />} />

        {/* Ruta per afegir carrer (placeholder) */}
        <Route path="/afegir-carrer" element={<div style={{padding: 20}}>Pàgina per afegir carrer (en construcció)</div>} />
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