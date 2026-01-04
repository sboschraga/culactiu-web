import React from "react";
import { useLocation, Link } from "react-router-dom";

function Denegat() {
  // Recollim la informació que ens passa el navegador (la distància)
  const location = useLocation();
  const distance = location.state?.distance || "?"; 

  const containerStyle = {
    display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
    height: "100vh", textAlign: "center", padding: "20px", backgroundColor: "#f0f0f0"
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ color: "red", fontSize: "2rem", textTransform: "uppercase" }}>
        Accés Denegat!
      </h1>
      
      <p style={{ fontSize: "1.2rem", fontFamily: "monospace", maxWidth: "600px", margin: "20px 0" }}>
        Ves a un cul de sac per a poder accedir al nostre catàleg.
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