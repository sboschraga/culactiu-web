import React, { useState } from "react";
// Importem useNavigate i useLocation a més de les rutes
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";

// Importem les pàgines
import Home from "./pages/Home";
import Denegat from "./pages/Denegat";
import Cataleg from "./pages/Cataleg";
import Accions from "./pages/Accions"; // <--- Importem la nova pàgina

// NOTA: Hem esborrat "Fitxar" perquè ja no serveix.

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
          // Canvia la URL si puges a Render
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
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
        
        {/* 1. EL LOGO ARA PORTA A LA HOME */}
        <div className="logo">
            <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                CULACTIU
            </Link>
        </div>

        <div>
          {/* 2. EL BOTÓ CATÀLEG SENSE SUBRATLLAR (textDecoration: 'none') */}
          <button 
            onClick={handleCheckLocation} 
            disabled={loading}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              fontSize: 'inherit', 
              fontFamily: 'inherit',
              textDecoration: 'none', // <--- ARA NO ESTÀ SUBRATLLAT
              marginRight: '20px',
              color: loading ? 'grey' : 'black'
            }}
          >
            {loading ? "calculant..." : "catàleg"}
          </button>

          {/* 3. ACCIONS ARA PORTA A LA PÀGINA NOVA */}
          <Link to="/accions" style={{ textDecoration: 'none', color: 'black' }}>
            accions
          </Link>
        </div>
      </nav>

      {/* --- RUTES --- */}
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* 4. HEM CANVIAT FITXAR PER ACCIONS */}
        <Route path="/accions" element={<Accions />} />
        
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