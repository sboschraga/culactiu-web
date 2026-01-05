import React, { useState } from "react";
// Importem useNavigate i useLocation a més de les rutes
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

// --- IMPORTACIONS DE PÀGINES ---
import Home from "./pages/Home";
import Denegat from "./pages/Denegat";
import Cataleg from "./pages/Cataleg";
import Accions from "./pages/Accions"; 
import DetallCarrer from "./pages/DetallCarrer"; // <--- 1. NOVA IMPORTACIÓ AQUÍ

function NavigationContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
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
          // Canvia la URL si puges a Render o si fas servir localhost
          const res = await fetch("https://culactiu-web.onrender.com/check-location", { 
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });

          const data = await res.json();

          if (data.access) {
            navigate("/cataleg"); 
          } else {
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
      {/* Nota: Com que la pàgina 'Cataleg' ja té la seva pròpia capçalera, 
          potser voldràs amagar aquesta barra quan estiguis a /cataleg, 
          però de moment ho deixem tal qual perquè funcioni la lògica. */}
      
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
            {loading ? "calculant..." : "catàleg"}
          </button>

          <Link to="/accions" style={{ textDecoration: 'none', color: 'black' }}>
            accions
          </Link>
        </div>
      </nav>

      {/* --- RUTES --- */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accions" element={<Accions />} />
        <Route path="/cataleg" element={<Cataleg />} />
        <Route path="/denegat" element={<Denegat />} />
        
        {/* 2. NOVA RUTA AFEGIDA AQUÍ BAIX: */}
        <Route path="/carrer/:name" element={<DetallCarrer />} />
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