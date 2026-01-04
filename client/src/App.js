import React, { useState } from "react";
import "./App.css"; // Els teus estils

function App() {
  // --- ESTATS DE NAVEGACIÓ ---
  // 'home'    = Pàgina principal
  // 'cataleg' = Pàgina d'èxit
  // 'denegat' = Pàgina d'error amb la distància
  const [paginaActual, setPaginaActual] = useState("home");
  
  // Per guardar la distància que ens torna el servidor
  const [distanciaGuardada, setDistanciaGuardada] = useState(0);
  
  // Per mostrar "Calculant..." al botó mentre pensa
  const [loading, setLoading] = useState(false);

  // --- CONFIGURACIÓ ---
  const API_URL = "http://localhost:5000/check-location"; // Canvia per la de Render quan pugis

  // --- FUNCIÓ PRINCIPAL (El "Porter") ---
  const gestionarClickCataleg = () => {
    setLoading(true);

    if (!navigator.geolocation) {
      alert("No tens GPS activat!");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;

          // 1. Preguntem al Backend
          const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });

          const data = await response.json();

          // 2. Decidim a quina pàgina enviem l'usuari
          if (data.access === true) {
            setPaginaActual("cataleg"); // CAP A DINS!
          } else {
            setDistanciaGuardada(data.distance); // Guardem la info
            setPaginaActual("denegat"); // CAP A FORA!
          }

        } catch (error) {
          console.error(error);
          alert("Error de connexió amb el servidor.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        alert("Error obtenint ubicació.");
        setLoading(false);
      }
    );
  };

  // --- RENDERITZAT DE LES 3 PÀGINES ---

  // 1. PÀGINA HOME (El que es veu al principi)
  if (paginaActual === "home") {
    return (
      <div className="pantalla-home">
        <nav style={styles.navBar}>
          <div style={styles.logo}>CULACTIU</div>
          <div style={styles.menu}>
            {/* Aquest botó fa la màgia */}
            <button onClick={gestionarClickCataleg} style={styles.menuBtn} disabled={loading}>
              {loading ? "BUSCANT..." : "CATÀLEG"}
            </button>
            <button style={styles.menuBtn}>ACCIONS</button>
            <button style={styles.menuBtn}>CULACTIU</button>
          </div>
        </nav>
        
        <div style={styles.containerCentral}>
          <h1>HOME PAGE</h1>
          <p>Imatges, el text de "Qui som", etc...</p>
        </div>
      </div>
    );
  }

  // 2. PÀGINA CATÀLEG (Èxit)
  if (paginaActual === "cataleg") {
    return (
      <div className="pantalla-cataleg" style={styles.containerCentral}>
        <nav style={{width: '100%', textAlign: 'left', padding: '20px'}}>
             <button onClick={() => setPaginaActual("home")} style={styles.menuBtn}>← TORNAR</button>
        </nav>
        <h1>📂 CATÀLEG SECRET</h1>
        <p>Benvingut al cul de sac. Aquí tens el contingut exclusiu.</p>
        {/* Aquí poses els teus productes/serveis */}
      </div>
    );
  }

  // 3. PÀGINA D'ACCÉS DENEGAT (Fracàs)
  if (paginaActual === "denegat") {
    return (
      <div className="pantalla-error" style={styles.containerError}>
        <h1 style={{color: 'red', fontSize: '3rem'}}>ACCÉS DENEGAT!</h1>
        
        <p style={{fontSize: '1.5rem', fontFamily: 'monospace', maxWidth: '600px'}}>
          ves a un cul de sac per a poder accedir al nostre catàleg. 
          <br/><br/>
          (estas a <strong>{distanciaGuardada} metres</strong> del cul de sac registrat més proper)
        </p>

        <button 
          onClick={() => setPaginaActual("home")} 
          style={{...styles.menuBtn, border: '2px solid black', marginTop: '30px'}}
        >
          TORNAR A LA HOME
        </button>
      </div>
    );
  }

  return null; // Per seguretat
}

// --- ESTILS RÀPIDS (Adapta'ls al teu CSS brutalista) ---
const styles = {
  navBar: {
    display: "flex", justifyContent: "space-between", padding: "20px", alignItems: "center"
  },
  menuBtn: {
    background: "transparent", border: "none", cursor: "pointer", 
    fontSize: "18px", marginLeft: "20px", textTransform: "uppercase", 
    fontFamily: "'Chivo Mono', monospace" // La teva font
  },
  containerCentral: {
    padding: "50px", textAlign: "center"
  },
  containerError: {
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
    height: "100vh", textAlign: "center", padding: "20px", backgroundColor: "#f0f0f0"
  }
};

export default App;