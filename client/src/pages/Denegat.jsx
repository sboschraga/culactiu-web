import React from "react";
import { useLocation, Link } from "react-router-dom";

function Denegat() {
  const location = useLocation();
  
  // Recuperem les dades que ens envia l'App.js
  const nomCarrer = location.state?.nomCarrer || "desconegut";
  const distanciaKm = location.state?.distanciaKm || 0;

  // Convertim a metres per mostrar-ho més maco
  const metres = Math.round(distanciaKm * 1000);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    textAlign: "center",
    padding: "20px"
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "red", fontSize: "2rem", textTransform: "uppercase" }}>
        Accés Denegat!
      </h1>
      
      <p style={{ fontSize: "1.2rem", maxWidth: "700px", margin: "20px 0" }}>
        Ves a un cul de sac per a poder accedir al nostre catàleg.
        <br /><br />
        
        {/* Aquí mostrem el carrer més proper */}
        El cul de sac registrat més proper és:
        <br/>
        <strong style={{ fontSize: "1.5rem", display: "block", marginTop: "10px" }}>
          {nomCarrer}
        </strong>
        <span style={{ fontSize: "0.9rem", color: "#666" }}>
          (a uns {metres} metres d'aquí)
        </span>
      </p>

      <Link to="/" style={{ textDecoration: "underline", color: "black", cursor: "pointer" }}>
        TORNAR A LA HOME
      </Link>
    </div>
  );
}

export default Denegat;