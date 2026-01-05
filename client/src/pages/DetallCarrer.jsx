import React from "react";
import { useParams, Link } from "react-router-dom"; // Afegim Link per poder tornar enrere
import infoCarrers from "../data/infoCarrers"; // Importem les dades
import "./DetallCarrer.css"; // Importem el CSS que crearem ara

const DetallCarrer = () => {
  const { name } = useParams();
  const nomReal = decodeURIComponent(name);
  
  // Busquem les dades. Si no existeixen, posem valors per defecte (placeholders)
  const dades = infoCarrers[nomReal] || {
    districte: "Districte desconegut",
    ciutat: "Ciutat desconeguda",
    fotos: [null, null], // Null farà que surti el quadre groc
    simbols: ["X", "X", "X", "X", "X"]
  };

  return (
    <div className="detall-container">
      {/* Botó petit per tornar al catàleg */}
      <div className="back-link-container">
        <Link to="/cataleg" className="back-link">← Tornar</Link>
      </div>

      {/* ZONA SUPERIOR: 2 FOTOS (GROGUES SI NO N'HI HA) */}
      <div className="fotos-row">
        {dades.fotos.map((foto, index) => (
          <div key={index} className="foto-box">
            {foto ? (
              <img src={foto} alt={`Detall ${index}`} />
            ) : (
              <span className="placeholder-text">FOTO {index + 1}</span>
            )}
          </div>
        ))}
      </div>

      {/* ZONA INFERIOR: TEXT A L'ESQUERRA, SÍMBOLS A LA DRETA */}
      <div className="info-row">
        
        {/* ESQUERRA: Nom i lloc */}
        <div className="text-column">
          <h1 className="nom-carrer">{nomReal}</h1>
          <p className="ubicacio">{dades.districte}, {dades.ciutat}</p>
        </div>

        {/* DRETA: 5 Símbols */}
        <div className="simbols-column">
          {dades.simbols.map((simbol, index) => (
            <div key={index} className="simbol-box">
              <span className="simbol-text">simbol<br/>{simbol}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DetallCarrer;