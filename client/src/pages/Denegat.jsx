import React from "react";
import { useLocation, Link } from "react-router-dom";

function Denegat() {
  const location = useLocation();
  
  const nomCarrer = location.state?.nomCarrer || "desconegut";
  const distanciaKm = location.state?.distanciaKm || 0;

  // Convertim a metres
  const metres = Math.round(distanciaKm * 1000);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif"
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "red", fontSize: "2rem", textTransform: "uppercase" }}>
        Accés Denegat!
      </h1>
      
      {/* Tot el text té la mateixa mida (1.2rem) i estil */}
      <p style={{ fontSize: "1.2rem", maxWidth: "900px", margin: "20px 0", lineHeight: "1.6" }}>
        Ves a un cul de sac per a poder accedir al nostre catàleg.
        <br /><br />
        El cul de sac registrat més proper és <strong>{nomCarrer}</strong> (a uns {metres} metres d'aquí).
      </p>

      {/* CANVI AQUÍ: Ara porta a /cataleg (el menú) i hem canviat el text */}
      <Link to="/cataleg" style={{ textDecoration: "underline", color: "black", cursor: "pointer", marginTop: "10px" }}>
        TORNAR
      </Link>
    </div>
  );
}

export default Denegat;