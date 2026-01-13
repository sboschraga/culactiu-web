import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

// --- IMPORTACIONS DE PÀGINES ---
import Home from "./pages/Home";
import Cataleg from "./pages/Cataleg";
import Denegat from "./pages/Denegat";
import Accions from "./pages/Accions";
import DetallCarrer from "./pages/DetallCarrer";

// --- IMPORTANT: Importem les dades per saber on són els carrers ---
import infoCarrers from "./data/infoCarrers";

// Funció auxiliar per calcular distància (Haversine)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radi de la Terra en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distància en km
  return d;
}

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

        // --- ZONA PERMESA ---
        const latMin = 41.0; 
        const latMax = 41.8;
        const lonMin = 1.9;
        const lonMax = 2.4;

        const dinsZona = 
          latitude >= latMin && 
          latitude <= latMax && 
          longitude >= lonMin && 
          longitude <= lonMax;

        if (dinsZona) {
          navigate("/cataleg");
        } else {
          // --- CÀLCUL DEL CARRER MÉS PROPER ---
          let carrerMesProper = "";
          let distanciaMinima = Infinity;

          // Recorrem tots els carrers del catàleg
          Object.entries(infoCarrers).forEach(([nom, dades]) => {
            const dist = getDistanceFromLatLonInKm(latitude, longitude, dades.lat, dades.lon);
            
            // Si trobem un carrer més a prop que l'anterior, ens el guardem
            if (dist < distanciaMinima) {
              distanciaMinima = dist;
              carrerMesProper = nom;
            }
          });

          // Convertim km a metres per a que sigui més llegible (opcional)
          // const metres = Math.round(distanciaMinima * 1000);

          // Passem el nom del carrer i la distància a la pàgina Denegat
          navigate("/denegat", { 
            state: { 
              nomCarrer: carrerMesProper, 
              distanciaKm: distanciaMinima 
            } 
          });
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error GPS:", error);
        alert("No s'ha pogut obtenir la teva ubicació.");
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
           <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '1.8rem' }}>
                CULACTIU
           </Link>
        </div>
        <div>
          <button 
            onClick={handleCheckLocation} 
            disabled={loading}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit',
              textDecoration: 'none', marginRight: '20px', color: loading ? 'grey' : 'black'
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
        <Route path="/cataleg" element={<Cataleg />} />
        <Route path="/denegat" element={<Denegat />} />
        <Route path="/accions" element={<Accions />} />
        <Route path="/carrer/:nom" element={<DetallCarrer />} />
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