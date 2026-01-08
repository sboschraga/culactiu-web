import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers";
import "./DetallCarrer.css";

function DetallCarrer() {
  const { nom } = useParams();
  
  // Decodifiquem el nom de la URL
  const nomCarrer = decodeURIComponent(nom);
  
  // Busquem les dades
  const carrer = infoCarrers[nomCarrer];

  // Estats per la foto ampliada i l'adreça automàtica
  const [fotoAmpliada, setFotoAmpliada] = useState(null);
  const [adrecaText, setAdrecaText] = useState("Calculant ubicació...");

  // --- MÀGIA: Calcular Barri i Ciutat automàticament ---
  useEffect(() => {
    if (carrer) {
      // Fem una consulta a OpenStreetMap per convertir lat/lon en text
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${carrer.lat}&lon=${carrer.lon}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.address) {
            // Busquem el barri, el districte o el poble
            const barri = data.address.suburb || data.address.neighbourhood || data.address.city_district || "";
            const ciutat = data.address.city || data.address.town || "Barcelona";
            
            // Si tenim barri, el posem. Si no, només ciutat.
            setAdrecaText(barri ? `${barri}, ${ciutat}` : ciutat);
          } else {
            setAdrecaText("Barcelona");
          }
        })
        .catch(() => {
          setAdrecaText("Barcelona"); // Si falla la connexió, posem genèric
        });
    }
  }, [carrer]); // S'executa cada cop que canviem de carrer

  // Si no trobem el carrer
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
      <div className="back-link-container">
        <Link to="/cataleg" className="back-link">
          ← tornar al catàleg
        </Link>
      </div>

      <div className="top-section">
        {/* FOTOS */}
        <div className="fotos-group">
          {carrer.fotos.map((src, index) => {
            // Si és "null", no pintem res
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

        {/* SÍMBOLS */}
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
      </div>

      {/* TEXT INFORMATIU */}
      <div className="info-text-section">
        <h1 className="nom-carrer">{nomCarrer}</h1>
        
        {/* AQUÍ ÉS ON SURT L'ADREÇA EN COMPTES DE LES COORDENADES */}
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