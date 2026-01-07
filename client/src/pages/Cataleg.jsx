import React from "react";
import { Link } from "react-router-dom"; 
import infoCarrers from "../data/infoCarrers"; // 1. IMPORTEM LES DADES REALS
import "./Cataleg.css";

function Cataleg() {
  
  // 2. GENEREM LA LLISTA AUTOMÀTICAMENT
  // Object.keys agafa tots els noms (ex: "La Rambla", "C/ Cerdà"...) del fitxer
  // .sort() els ordena alfabèticament
  const streets = Object.keys(infoCarrers).sort((a, b) => a.localeCompare(b));

  return (
    <div className="catalog-container">
      
      {/* GRAELLA DE CARRERS AMB ENLLAÇOS */}
      <div className="streets-grid">
        {streets.map((street, index) => (
          <Link 
            key={index} 
            to={`/carrer/${encodeURIComponent(street)}`} 
            className="street-item"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            {street}
          </Link>
        ))}
      </div>

      <div className="add-button-container">
        <button className="add-btn">afegir</button>
      </div>
    </div>
  );
}

export default Cataleg;