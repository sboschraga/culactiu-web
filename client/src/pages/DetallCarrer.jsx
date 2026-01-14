import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers";
import "./DetallCarrer.css";

function DetallCarrer() {
  const { nom } = useParams();
  const nomCarrer = decodeURIComponent(nom);
  const carrer = infoCarrers[nomCarrer];

  const [fotoAmpliada, setFotoAmpliada] = useState(null);
  const [adrecaText, setAdrecaText] = useState("Calculant ubicació...");

  useEffect(() => {
    if (carrer) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${carrer.lat}&lon=${carrer.lon}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.address) {
            const barri = data.address.suburb || data.address.neighbourhood || data.address.city_district || "";
            const ciutat = data.address.city || data.address.town || "Barcelona";
            setAdrecaText(barri ? `${barri}, ${ciutat}` : ciutat);
          } else {
            setAdrecaText("Barcelona");
          }
        })
        .catch(() => {
          setAdrecaText("Barcelona");
        });
    }
  }, [carrer]);

  if (!carrer) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Carrer no trobat: {nomCarrer}</h2>
        <Link to="/llista-cataleg">Tornar al catàleg</Link>
      </div>
    );
  }

  return (
    <div className="detall-container">
      <div className="back-link-container">
        <Link to="/llista-cataleg" className="back-link">
          ← tornar al catàleg
        </Link>
      </div>

      <div className="top-section">
        {/* GRUP DE FOTOS (Esquerra) */}
        <div className="fotos-group">
          {carrer.fotos.map((src, index) => {
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

        {/* NOU BLOC: SÍMBOLS + TEXT (Dreta) */}
        <div className="simbols-i-text">
          {/* Columna de símbols */}
          <div className="simbols-vertical">
            {carrer.simbols.map((simbol, index) => (
              <div key={index} className="simbol-box">
                {simbol.startsWith("/") ? (
                  <img src={simbol} alt="simbol" className="simbol-img" />
                ) : (
                  <span>{simbol}</span>
                )}
              </div>
            ))}
          </div>

          {/* Text descriptiu: NOMÉS ES MOSTRA SI N'HI HA */}
          {carrer.text && (
            <div className="text-descriptiu">
              {carrer.text.map((paragraf, index) => {
                const esPregunta = paragraf.includes("?");
                return (
                  <p 
                    key={index} 
                    style={{ 
                      fontWeight: esPregunta ? 'bold' : 'normal',
                      marginBottom: esPregunta ? '5px' : '20px'
                    }}
                  >
                    {paragraf}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* INFO CARRER (A sota) */}
      <div className="info-text-section">
        <h1 className="nom-carrer">{nomCarrer}</h1>
        <p className="ubicacio" style={{ textTransform: "capitalize" }}>
          {adrecaText}
        </p>
      </div>

      {/* MODAL FOTO */}
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