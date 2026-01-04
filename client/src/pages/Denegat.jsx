import React from "react";
import { useLocation, Link } from "react-router-dom";

function Denegat() {
  const location = useLocation();
  const distance = location.state?.distance || "?"; 

  // AQUEST ESTIL ARA ÉS IGUAL QUE EL D'ACCIONS
  // Sense 'absolute' ni 'zIndex', així respecta la barra de dalt.
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh", // Mateixa alçada que Accions perquè es vegi igual
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
        (estàs a <strong>{distance} metres</strong> del cul de sac registrat més proper)
      </p>

      <Link to="/" style={{ textDecoration: "underline", color: "black", cursor: "pointer" }}>
        TORNAR A LA HOME
      </Link>
    </div>
  );
}

export default Denegat;