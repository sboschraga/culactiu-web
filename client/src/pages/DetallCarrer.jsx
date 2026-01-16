import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers";
import "./DetallCarrer.css";

function DetallCarrer() {
  const { nom } = useParams();
  const navigate = useNavigate(); 
  const nomUrl = decodeURIComponent(nom).trim(); 

  // BUSCA EL CARRER (Ignorant majúscules/minúscules)
  const clauReal = Object.keys(infoCarrers).find(
    key => key.toLowerCase() === nomUrl.toLowerCase()
  );
  const carrer = clauReal ? infoCarrers[clauReal] : null;

  const [fotoAmpliada, setFotoAmpliada] = useState(null);
  const [adrecaText, setAdrecaText] = useState("Calculant ubicació...");
  const [indexFotoMobil, setIndexFotoMobil] = useState(0);

  // Diccionari d'accions (revisa que els noms de les claus siguin iguals al catàleg)
  const enllacosAccions = {
    "C/ DE GORDI": "/accio/muralla",
    "C/ D'EN GORDI": "/accio/muralla",
    "C/ DE LES CAROLINES": "/accio/fletxes",
    "CARRERÓ DE LES CAROLINES": "/accio/fletxes",
    "C/ DEL TONELL": "/accio/neteja",
    "C/ DE RERA SANT JUST": "/accio/cassolada",
    "C/ DE MARIA VICTÒRIA": "/accio/esport"
  };

  const pathAccio = enllacosAccions[nomUrl.toUpperCase()];

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

  if (!carrer) {
    return <div style={{padding: "100px", textAlign: "center"}}><h2>Carrer "{nomUrl}" no trobat</h2><button onClick={() => navigate('/cataleg')}>Tornar al catàleg</button></div>;
  }

  return (
    <div className="detall-container">
      <div className="back-link-container">
        <button onClick={() => navigate(-1)} className="back-link-btn">← tornar</button>
      </div>

      <div className="main-grid-layout">
        <div className="area-visual">
          <div className="galeria-mobil" onClick={() => setIndexFotoMobil((prev) => (prev + 1) % carrer.fotos.length)}>
            <img src={carrer.fotos[indexFotoMobil]} alt="foto galeria" />
            <div className="indicador-fotos">{indexFotoMobil + 1} / {carrer.fotos.length}</div>
          </div>
          <div className="fotos-group-pc">
            {carrer.fotos.map((src, index) => src && src !== "null" && (
              <div key={index} className="foto-box-pc" onClick={() => setFotoAmpliada(src)}>
                <img src={src} alt="foto carrer" />
              </div>
            ))}
          </div>
        </div>

        <div className="area-info-nom">
          <div className="header-flex">
            <div className="title-block">
              <h1 className="nom-carrer">{clauReal}</h1>
              <p className="ubicacio">{adrecaText}</p>
            </div>
            {pathAccio && <Link to={pathAccio} className="boto-veure-accio-destacat">VEURE L'ACCIÓ</Link>}
          </div>
        </div>

        <div className="area-detalls">
          <div className="simbols-vertical">
            {carrer.simbols.map((simbol, index) => (
              <div key={index} className="simbol-box"><img src={simbol} className="simbol-img" alt="icona" /></div>
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