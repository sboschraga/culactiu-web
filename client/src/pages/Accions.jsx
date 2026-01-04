// src/pages/Accions.jsx
import React from "react";
import { Link } from "react-router-dom";

function Accions() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh", // Ocupa gairebé tota l'alçada
    textAlign: "center"
  };

  return (
    <div style={containerStyle}>
      <h1>accions indefinides</h1>
      <br />
      <Link to="/" style={{ color: "black" }}>Tornar</Link>
    </div>
  );
}

export default Accions;