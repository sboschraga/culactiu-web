import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers"; // Importem les dades
import "./DetallCarrer.css";

function DetallCarrer() {
  const { nom } = useParams();
  
  // Decodifiquem el nom per si té accents o espais estranys a la URL
  const nomCarrer = decodeURIComponent(nom);
  
  // Busquem la informació del carrer a la nostra base de dades
  const carrer = infoCarrers[nomCarrer];

  // Estat per al modal de la foto ampliada
  const [fotoAmpliada, setFotoAmpliada] = useState(null);

  // Si no trobem el carrer (per exemple si escrius malament la URL), mostrem avís
  if (!carrer) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Carrer no trobat: {nomCarrer}</h2>
        <Link to="/cataleg">Tornar al catàleg</Link>
      </div>
    );
  }

  return (
    <div className="detall-container">
      {/* Botó per tornar enrere */}
      <div className="back-link-container">
        <Link to="/cataleg" className="back-link">
          ← tornar al catàleg
        </Link>
      </div>

      <div className="top-section">
        {/* GRUP DE FOTOS */}
        <div className="fotos-group">
          {carrer.fotos.map((src, index) => {
            // AQUÍ ESTÀ LA MÀGIA: Si la foto és "null" o no existeix, no la pintem
            if (src === "null" || src === null || !src) return null;

            return (
              <div 
                key={index} 
                className="foto-box" 
                onClick={() => setFotoAmpliada(src)}
              >
                <img src={src} alt={`Foto ${index + 1} de ${nomCarrer}`} />
              </div>
            );
          })}
        </div>

        {/* COLUMNA DE SÍMBOLS */}
        <div className="simbols-vertical">
          {carrer.simbols.map((simbol, index) => (
            <div key={index} className="simbol-box">
              {/* Si el símbol comença per "/", és una ruta d'imatge real */}
              {simbol.startsWith("/") ? (
                <img src={simbol} alt="simbol" className="simbol-img" />
              ) : (
                /* Si és text antic tipus "simbol1", posem un text de moment */
                <span>{simbol}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* TEXT INFORMATIU A SOTA */}
      <div className="info-text-section">
        <h1 className="nom-carrer">{nomCarrer}</h1>
        <p className="ubicacio">
          Lat: {carrer.lat}, Lon: {carrer.lon}
        </p>
      </div>

      {/* MODAL PER VEURE FOTO AMPLIADA */}
      {fotoAmpliada && (
        <div className="modal-overlay" onClick={() => setFotoAmpliada(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={fotoAmpliada} alt="Ampliada" />
            <div className="tancar-text">Prem fora per tancar</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetallCarrer;