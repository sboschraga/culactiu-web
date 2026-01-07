import React from "react";
import { Link } from "react-router-dom"; 
import infoCarrers from "../data/infoCarrers"; 
import "./Cataleg.css";

function Cataleg() {
  
  // LOGICA NOVA:
  // 1. Object.keys agafa tots els noms.
  // 2. .filter() només deixa passar els que NO tenen "amagat: true".
  // 3. .sort() els ordena.
  const streets = Object.keys(infoCarrers)
    .filter(nom => !infoCarrers[nom].amagat) 
    .sort((a, b) => a.localeCompare(b));

  return (
    <div className="catalog-container">
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
      {/* Botó afegir, etc... */}
    </div>
  );
}

export default Cataleg;