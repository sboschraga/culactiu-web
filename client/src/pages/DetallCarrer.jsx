import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers"; // Importem les dades amb coordenades
import "./DetallCarrer.css"; // El mateix CSS d'abans

const DetallCarrer = () => {
  const { name } = useParams();
  const nomReal = decodeURIComponent(name);

  // 1. Estat per guardar el text de la ubicació (barri, ciutat)
  const [ubicacioText, setUbicacioText] = useState("Calculant ubicació...");

  // Recuperem les dades del fitxer (fotos, simbols, lat, lon)
  const dades = infoCarrers[nomReal] || {
    lat: null,
    lon: null,
    fotos: [null, null],
    simbols: ["X", "X", "X", "X", "X"]
  };

  // 2. EFECTE: Quan carreguem la pàgina, preguntem a OpenStreetMap on som
  useEffect(() => {
    if (dades.lat && dades.lon) {
      // URL del servei de geocodificació inversa
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${dades.lat}&lon=${dades.lon}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.address) {
            // Intentem trobar el barri o districte en aquest ordre
            const barri = data.address.suburb || data.address.neighbourhood || data.address.district || "Zona desconeguda";
            const ciutat = data.address.city || data.address.town || data.address.village || "Barcelona";
            
            setUbicacioText(`${barri}, ${ciutat}`);
          } else {
            setUbicacioText("Ubicació no trobada");
          }
        })
        .catch((err) => {
          console.error(err);
          setUbicacioText("Error de connexió");
        });
    } else {
      setUbicacioText("Coordenades no definides");
    }
  }, [dades.lat, dades.lon]); // Només s'executa si canvien les coordenades

  return (
    <div className="detall-container">
      {/* Botó per tornar */}
      <div className="back-link-container">
        <Link to="/cataleg" className="back-link">← Tornar</Link>
      </div>

      {/* ZONA FOTOS (GROGUES) */}
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

      {/* ZONA INFO */}
      <div className="info-row">
        
        {/* ESQUERRA: Nom i Ubicació Automàtica */}
        <div className="text-column">
          <h1 className="nom-carrer">{nomReal}</h1>
          <p className="ubicacio">{ubicacioText}</p>
        </div>

        {/* DRETA: Símbols */}
        <div className="simbols-column">
          {dades.simbols.map((simbol, index) => (
            <div key={index} className="simbol-box">
              {/* Mostra l'emoji o text que has posat al fitxer infoCarrers.js */}
              <span className="simbol-text">{simbol}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default DetallCarrer;