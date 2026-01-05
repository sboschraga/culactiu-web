// src/pages/DetallCarrer.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

const DetallCarrer = () => {
  const { name } = useParams(); // Recupera el nom del carrer de la URL

  return (
    <div style={{ padding: "40px" }}>
      <Link to="/cataleg" style={{ textDecoration: "none", color: "black" }}>
        ← Tornar al catàleg
      </Link>
      
      <h1 style={{ marginTop: "30px", fontSize: "2rem" }}>
        {decodeURIComponent(name)}
      </h1>
      
      <p style={{ marginTop: "20px" }}>
        Aquí dissenyarem la fitxa d'aquest carrer més endavant.
      </p>
    </div>
  );
};

export default DetallCarrer;