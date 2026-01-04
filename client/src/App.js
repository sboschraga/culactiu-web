import React, { useState } from "react";
// Importem useNavigate i useLocation a més de les rutes
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

// Importem les pàgines
import Home from "./pages/Home";
import Fitxar from "./pages/Fitxar"; // Pots mantenir-la per "Accions" si vols
import Denegat from "./pages/Denegat"; // NOVA
import Cataleg from "./pages/Cataleg"; // NOVA

// Creem un component intern per poder fer servir 'useNavigate'
function NavigationContent() {
  const navigate = useNavigate(); // Eina per canviar de pàgina via codi
  const [loading, setLoading] = useState(false);

  // --- FUNCIÓ DE CHECK (La que abans tenies a Fitxar) ---
  const handleCheckLocation = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("El navegador no suporta geolocalització.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          // Canvia la URL si puges a Render
          const res = await fetch("https://culactiu-web.onrender.com/check-location", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });

          const data = await res.json();

          if (data.access) {
            // SI ÉS CORRECTE -> Anem a la pàgina Catàleg
            navigate("/cataleg"); 
          } else {
            // SI NO -> Anem a la pàgina Denegat i li passem la distància
            navigate("/denegat", { state: { distance: data.distance } });
          }

        } catch (err) {
          console.error(err);
          alert("Error de connexió amb el servidor");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        alert("No s'ha pogut obtenir la ubicació. Activa el GPS.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <>
      {/* --- BARRA DE NAVEGACIÓ --- */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        <div className="logo">CULACTIU</div>

        <div>
          {/* BOTÓ INTEL·LIGENT: Sembla un link, però és un botó */}
          <button 
            onClick={handleCheckLocation} 
            disabled={loading}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: 'inherit', 
              fontFamily: 'inherit',
              textDecoration: 'underline',
              marginRight: '20px',
              color: loading ? 'grey' : 'black'
            }}
          >
            {loading ? "calculant..." : "catàleg"}
          </button>

          <Link to="/fitxar">accions</Link>
        </div>
      </nav>

      {/* --- RUTES --- */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fitxar" element={<Fitxar />} />
        <Route path="/cataleg" element={<Cataleg />} />
        <Route path="/denegat" element={<Denegat />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <NavigationContent />
    </Router>
  );
}

export default App;