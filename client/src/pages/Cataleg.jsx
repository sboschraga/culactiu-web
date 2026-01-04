import React from "react";
import { Link } from "react-router-dom";

function Cataleg() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>📂 CATÀLEG CULACTIU</h1>
      <p>Benvingut/da. Estàs dins d'un espai protegit.</p>
      {/* Aquí posaràs el teu contingut real */}
      
      <br />
      <Link to="/">Tornar</Link>
    </div>
  );
}

export default Cataleg;