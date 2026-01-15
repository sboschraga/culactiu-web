import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers";
import "./DetallCarrer.css";

function DetallCarrer() {
  const { nom } = useParams();
  const navigate = useNavigate(); 
  const nomCarrer = decodeURIComponent(nom).trim(); 
  const carrer = infoCarrers[nomCarrer];

  const [fotoAmpliada, setFotoAmpliada] = useState(null);
  const [adrecaText, setAdrecaText] = useState("Calculant ubicació...");

  const enllacosAccions = {
    "C/ DE GORDI": "/accio/muralla",
    "C/ D'EN GORDI": "/accio/muralla",
    "C/ DE LES CAROLINES": "/accio/fletxes",
    "C/ DEL TONELL": "/accio/neteja",
    "C/ DE RERA SANT JUST": "/accio/cassolada",
    "C/ DE MARIA VICTÒRIA": "/accio/esport"
  };

  const nomNet = nomCarrer.toUpperCase();
  const pathAccio = enllacosAccions[nomNet];

  useEffect(() => {
    if (carrer) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${carrer.lat}&lon=${carrer.lon}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.address) {
            const barri = data.address.suburb || data.address.neighbourhood || data.address.city_district || "";
            const ciutat = data.address.city || data.address.town || "Barcelona";
            setAdrecaText(barri ? `${barri}, ${ciutat}` : ciutat);
          } else { setAdrecaText("Barcelona"); }
        })
        .catch(() => setAdrecaText("Barcelona"));
    }
  }, [carrer, nomCarrer]);

  if (!carrer) return null;

  return (
    <div className="detall-container">
      <div className="back-link-container">
        {/* Punt 2: Text "tornar" i Punt 7: Navegació historial */}
        <button onClick={() => navigate(-1)} className="back-link-btn">
          ← tornar
        </button>
      </div>

      <div className="top-section">
        {/* Punt 4: Fotos a 260px */}
        <div className="fotos-group">
          {carrer.fotos.map((src, index) => (
            src && src !== "null" && (
              <div key={index} className="foto-box" onClick={() => setFotoAmpliada(src)}>
                <img src={src} alt="foto carrer" />
              </div>
            )
          ))}
        </div>

        <div className="simbols-i-text">
          {/* Punt 5: Símbols sense mà */}
          <div className="simbols-vertical no-pointer">
            {carrer.simbols.map((simbol, index) => (
              <div key={index} className="simbol-box">
                {simbol.startsWith("/") ? <img src={simbol} className="simbol-img" alt="icona" /> : <span>{simbol}</span>}
              </div>
            ))}
          </div>
          
          <div className="text-descriptiu">
            {carrer.text && carrer.text.map((p, i) => (
              <p key={i} style={{ fontWeight: p.includes("?") ? 'bold' : 'normal', marginBottom: p.includes("?") ? '5px' : '25px' }}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      {/* Punt 2 (segona llista): Format Títol i Districte segons captura */}
      <div className="info-text-section">
        <div className="header-flex">
           <div className="title-block">
              <h1 className="nom-carrer">{nomCarrer}</h1>
              <p className="ubicacio">{adrecaText}</p>
           </div>
           {/* Punt 5 (segona llista): Botó veure l'acció */}
           {pathAccio && (
             <Link to={pathAccio} className="boto-veure-accio-destacat">
               VEURE L'ACCIÓ
             </Link>
           )}
        </div>
      </div>

      {/* Punt 3: Modal fons fosc */}
      {fotoAmpliada && (
        <div className="modal-overlay" onClick={() => setFotoAmpliada(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={fotoAmpliada} alt="ampliada" />
            <div className="tancar-text">Prem fora per tancar</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetallCarrer;