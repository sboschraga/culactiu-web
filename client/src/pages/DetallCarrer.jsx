import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers";
import "./DetallCarrer.css";

const DetallCarrer = () => {
  const { name } = useParams();
  const nomReal = decodeURIComponent(name);
  const [ubicacioText, setUbicacioText] = useState("Calculant ubicació...");
  const [fotoAmpliada, setFotoAmpliada] = useState(null);

  const dades = infoCarrers[nomReal] || {
    lat: null,
    lon: null,
    fotos: [], 
    simbols: ["X", "X", "X", "X", "X"]
  };

  useEffect(() => {
    if (dades.lat && dades.lon) {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${dades.lat}&lon=${dades.lon}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.address) {
            const barri = data.address.suburb || data.address.neighbourhood || data.address.district || "Zona desconeguda";
            const ciutat = data.address.city || data.address.town || "Barcelona";
            setUbicacioText(`${barri}, ${ciutat}`);
          } else {
            setUbicacioText("Ubicació no trobada");
          }
        })
        .catch(() => setUbicacioText("Error de connexió"));
    } else {
      setUbicacioText("Coordenades no definides");
    }
  }, [dades.lat, dades.lon]);

  return (
    <div className="detall-container">
      <div className="back-link-container">
        <Link to="/cataleg" className="back-link">← Tornar</Link>
      </div>

      {/* --- NOVA SECCIÓ SUPERIOR: FOTOS + SÍMBOLS --- */}
      <div className="top-section">
        
        {/* Grup de fotos */}
<div className="fotos-group">
  {carrer.fotos.map((src, index) => {
    // AQUESTA CONDICIÓ ÉS LA NOVA:
    // Si la foto és "null" (text) o null (valor), no pintem res.
    if (src === "null" || src === null) return null;

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

        {/* 2. COLUMNA DE SÍMBOLS */}
        <div className="simbols-vertical">
          {dades.simbols.map((simbol, index) => (
            <div key={index} className="simbol-box">
              {/* CORRECTE: Fem servir img */}
              <img src={simbol} alt={`Símbol ${index}`} className="simbol-img" />
            </div>
          ))}
        </div>

      </div> {/* <--- AQUESTA ÉS LA LÍNIA QUE FALTAVA PER TANCAR LA PART DE DALT */}

      {/* --- SECCIÓ INFERIOR: TEXT --- */}
      <div className="info-text-section">
          <h1 className="nom-carrer">{nomReal}</h1>
          <p className="ubicacio">{ubicacioText}</p>
      </div>

      {/* MODAL (FOTO AMPLIADA) */}
      {fotoAmpliada && (
        <div className="modal-overlay" onClick={() => setFotoAmpliada(null)}>
          <div className="modal-content">
            <img src={fotoAmpliada} alt="Ampliada" />
            <p className="tancar-text">Clica per tancar</p>
          </div>
        </div>
      )}

    </div>
  );
};

export default DetallCarrer;