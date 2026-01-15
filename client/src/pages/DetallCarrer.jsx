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
  const [indexFotoMobil, setIndexFotoMobil] = useState(0);

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
    if (carrer && carrer.lat && carrer.lon) {
      fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${carrer.lat}&lon=${carrer.lon}`, {
        headers: { 'User-Agent': 'CulActiu-Web-App' }
      })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.address) {
          const barri = data.address.suburb || data.address.neighbourhood || data.address.city_district || "";
          const ciutat = data.address.city || data.address.town || "Barcelona";
          setAdrecaText(barri ? `${barri}, ${ciutat}` : ciutat);
        }
      })
      .catch(() => setAdrecaText(carrer.barri || "Barcelona"));
    }
  }, [carrer]);

  if (!carrer) return null;

  const seguentFoto = () => {
    setIndexFotoMobil((prev) => (prev + 1) % carrer.fotos.length);
  };

  return (
    <div className="detall-container">
      <div className="back-link-container">
        <button onClick={() => navigate(-1)} className="back-link-btn">← tornar</button>
      </div>

      <div className="main-grid-layout">
        
        {/* BLOC 1: VISUAL (Fotos PC / Galeria Mòbil) */}
        <div className="area-visual">
          <div className="galeria-mobil" onClick={seguentFoto}>
            <img src={carrer.fotos[indexFotoMobil]} alt="foto galeria" />
            <div className="indicador-fotos">{indexFotoMobil + 1} / {carrer.fotos.length}</div>
          </div>

          <div className="fotos-group-pc">
            {carrer.fotos.map((src, index) => (
              src && src !== "null" && (
                <div key={index} className="foto-box-pc" onClick={() => setFotoAmpliada(src)}>
                  <img src={src} alt="foto carrer" />
                </div>
              )
            ))}
          </div>
        </div>

        {/* BLOC 2: INFO NOM (A PC va a sota, a Mòbil va aquí com a peu de foto) */}
        <div className="area-info-nom">
          <div className="header-flex">
            <div className="title-block">
              <h1 className="nom-carrer">{nomCarrer}</h1>
              <p className="ubicacio">{adrecaText}</p>
            </div>
            {pathAccio && (
              <Link to={pathAccio} className="boto-veure-accio-destacat">VEURE L'ACCIÓ</Link>
            )}
          </div>
        </div>

        {/* BLOC 3: TEXT I SÍMBOLS (A la dreta a PC) */}
        <div className="area-detalls">
          <div className="simbols-vertical">
            {carrer.simbols.map((simbol, index) => (
              <div key={index} className="simbol-box">
                <img src={simbol} className="simbol-img" alt="icona" />
              </div>
            ))}
          </div>
          <div className="text-descriptiu">
            {carrer.text && carrer.text.map((p, i) => (
              <p key={i} className={p.includes("?") ? "paragraf-pregunta" : "paragraf-normal"}>{p}</p>
            ))}
          </div>
        </div>

      </div>

      {fotoAmpliada && (
        <div className="modal-overlay" onClick={() => setFotoAmpliada(null)}>
          <div className="modal-content"><img src={fotoAmpliada} alt="ampliada" /></div>
        </div>
      )}
    </div>
  );
}

export default DetallCarrer;