import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers";
import "./DetallCarrer.css";

const DetallCarrer = () => {
  const { name } = useParams();
  const nomReal = decodeURIComponent(name);
  const [ubicacioText, setUbicacioText] = useState("Calculant ubicació...");

  // 1. ESTAT NOU: Guardem la URL de la foto que volem veure gran (o null si està tancat)
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

      <div className="fotos-row">
        {dades.fotos.map((foto, index) => {
          if (!foto || foto === "null") return null;

          return (
            <div key={index} className="foto-box">
              {/* 2. AFEGIM EL CLICK: Quan cliquem, guardem aquesta foto a l'estat */}
              <img 
                src={foto} 
                alt={`Detall ${index}`} 
                onClick={() => setFotoAmpliada(foto)} 
                style={{ cursor: "zoom-in" }} // Canvia el cursor per indicar que es pot clicar
              />
            </div>
          );
        })}
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

      {/* 3. EL MODAL (FINESTRA EMERGENT): Només es mostra si fotoAmpliada té valor */}
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