import React, { useState } from "react";

function Fitxar() {
  const [message, setMessage] = useState("");

  // A Fitxar.js (Frontend)

const checkLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Geolocalització no suportada al navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // Assegura't que la URL és la correcta (localhost o render)
          const res = await fetch("https://culactiu-web.onrender.com/check-location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });

          const data = await res.json();

          if (data.access) {
            // AQUÍ POTS POSAR LA LÒGICA PER MOSTRAR EL CATÀLEG
            setMessage(`✅ Benvingut! Estàs a: ${data.address}. Mostrant catàleg...`);
            // Per exemple: setShowCatalog(true);
            
          } else {
            // AQUI ÉS ON POSEM LA FRASE EXACTA QUE VOLS:
            setMessage(`accés denegat! ves a un cul de sac per a poder accedir al nostre catàleg. (estas a ${data.distance} metres del cul de sac registrat més proper)`);
          }

        } catch (err) {
          console.error(err);
          setMessage("⚠️ Error en connectar amb el servidor.");
        }
      },
      (err) => {
        console.error(err);
        setMessage("⚠️ No s'ha pogut obtenir la ubicació. Tens el GPS activat?");
      },
      { enableHighAccuracy: true }
    );
};

  // --- ESTILS ACTUALITZATS ---
  const containerStyle = {
    textAlign: "center",
    padding: "50px",
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  };

  const titleStyle = {
    fontFamily: "'Azeret Mono', monospace",
    fontWeight: "400",
    textTransform: "uppercase",
    marginBottom: "2rem"
  };

  const buttonStyle = {
    marginTop: "2rem",
    padding: "1rem 2rem",
    fontSize: "1rem",
    cursor: "pointer",
    fontFamily: "'Chivo Mono', monospace", // Font de text
    backgroundColor: "transparent",
    border: "2px solid black",
    textTransform: "uppercase",
    transition: "all 0.3s ease"
  };

  const messageStyle = {
    marginTop: "2rem",
    fontSize: "1.2rem",
    fontFamily: "'Chivo Mono', monospace"
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>COMPROVAR UBICACIÓ</h1>
      
      <button
        style={buttonStyle}
        onClick={checkLocation}
        onMouseOver={(e) => { e.target.style.backgroundColor = "black"; e.target.style.color = "white"; }}
        onMouseOut={(e) => { e.target.style.backgroundColor = "transparent"; e.target.style.color = "black"; }}
      >
        📍 Comprova on soc
      </button>

      {message && (
        <p style={messageStyle}>{message}</p>
      )}
    </div>
  );
}

export default Fitxar;