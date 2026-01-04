// src/pages/Denegat.jsx
import React from "react";
import { useLocation, Link } from "react-router-dom";

function Denegat() {
  const location = useLocation();
  const distance = location.state?.distance || "?"; 

  // CANVI 4: Centrat absolut i fons blanc (igual que la barra)
  const containerStyle = {
    display: "flex",         
    flexDirection: "column", 
    justifyContent: "center", // Centra en vertical (Eix Y)
    alignItems: "center",     // Centra en horitzontal (Eix X)
    height: "100vh",          // Ocupa tota l'alçada de la pantalla
    width: "100vw",           // Ocupa tota l'amplada
    textAlign: "center",
    padding: "20px",
    backgroundColor: "white", // Fons blanc per igualar la barra superior
    position: "absolute",     // Assegura que cobreixi tot
    top: 0,
    left: 0,
    zIndex: 10                // Posa-ho per sobre si cal
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "red", fontSize: "2rem", textTransform: "uppercase" }}>
        Accés Denegat!
      </h1>
      
      <p style={{ fontSize: "1.2rem", fontFamily: "monospace", maxWidth: "600px", margin: "20px 0" }}>
        ves a un cul de sac per a poder accedir al nostre catàleg.
        <br /><br />
        (estàs a <strong>{distance} metres</strong> del cul de sac registrat més proper)
      </p>

      <Link to="/" style={{ textDecoration: "underline", color: "black", cursor: "pointer" }}>
        TORNAR A LA HOME
      </Link>
    </div>
  );
}

export default Denegat;