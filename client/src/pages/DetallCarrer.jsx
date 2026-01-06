import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers";
import "./DetallCarrer.css";

const DetallCarrer = () => {
  const { name } = useParams();
  const nomReal = decodeURIComponent(name);
  const [ubicacioText, setUbicacioText] = useState("Calculant ubicació...");

  const dades = infoCarrers[nomReal] || {
    lat: null,
    lon: null,
    // Si no hi ha dades, posem 2 placeholders per defecte
    fotos: ["null", "null"],
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

      {/* ZONA DE FOTOS: Ara accepta qualsevol quantitat de fotos */}
      <div className="fotos-row">
        {dades.fotos.map((foto, index) => (
          <div key={index} className="foto-box">
            {foto && foto !== "null" ? (
              <img src={foto} alt={`Detall ${index}`} />
            ) : (
              <span className="placeholder-text">FOTO {index + 1}</span>
            )}
          </div>
        ))}
      </div>

      <div className="info-row">
        <div className="text-column">
          <h1 className="nom-carrer">{nomReal}</h1>
          <p className="ubicacio">{ubicacioText}</p>
        </div>
        <div className="simbols-column">
          {dades.simbols.map((simbol, index) => (
            <div key={index} className="simbol-box">
              <span className="simbol-text">{simbol}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetallCarrer;