import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers";
import "./Cataleg.css";

const GRUPS_SIMBOLS = {
  "Forma": [
    { src: "/simbols/1linea.svg", nom: "Rectilini" },
    { src: "/simbols/1obtús.svg", nom: "Obtús" },
    { src: "/simbols/1ele.svg", nom: "Forma L" }
  ],
  "Llargada": [
    { src: "/simbols/2mes15.svg", nom: "> 15m" },
    { src: "/simbols/2menys15.svg", nom: "< 15m" }
  ],
  "Final del carrer": [
    { src: "/simbols/3porta.svg", nom: "Porta" },
    { src: "/simbols/3paret.svg", nom: "Paret" },
    { src: "/simbols/3muntanya.svg", nom: "Muntanya" },
    { src: "/simbols/3plaça.svg", nom: "Plaça" },
    { src: "/simbols/3valla.svg", nom: "Valla" }
  ],
  "Propietat": [
    { src: "/simbols/4públic.svg", nom: "Públic" },
    { src: "/simbols/4privat.svg", nom: "Privat" }
  ],
  "Accés": [
    { src: "/simbols/5peatonal.svg", nom: "Vianants" },
    { src: "/simbols/5ambdues.svg", nom: "Mixt" }
  ]
};

function Cataleg() {
  const [filtresActius, setFiltresActius] = useState([]);
  const [textCerca, setTextCerca] = useState("");
  const [carrersFiltrats, setCarrersFiltrats] = useState([]);
  const [menuObert, setMenuObert] = useState(false);

  const toggleFiltre = (simbolSrc, categoria) => {
    const simbolsDelGrup = GRUPS_SIMBOLS[categoria].map(s => s.src);
    let nousFiltres = filtresActius.filter(s => !simbolsDelGrup.includes(s));

    if (!filtresActius.includes(simbolSrc)) {
      nousFiltres.push(simbolSrc);
    }
    setFiltresActius(nousFiltres);
  };

  useEffect(() => {
    const llistaCarrers = Object.entries(infoCarrers);
    
    let resultat = llistaCarrers.filter(([nom, dades]) => {
      if (dades.amagat) return false;
      const compleixSimbols = filtresActius.every((filtre) => dades.simbols.includes(filtre));
      const compleixText = nom.toLowerCase().includes(textCerca.toLowerCase());
      return compleixSimbols && compleixText;
    });

    resultat.sort((a, b) => a[0].localeCompare(b[0]));
    setCarrersFiltrats(resultat);
  }, [filtresActius, textCerca]);

  return (
    <div className="cataleg-container">
      
      <div className="zona-superior-nav">
        <Link to="/cataleg" className="boto-tornar">← TORNAR</Link>
        
        {/* BOTÓ ICONA MENÚ (Només visible en mòbil via CSS) */}
        <button className="boto-icona-filtres" onClick={() => setMenuObert(true)}>
          FILTRAR ☰
        </button>
      </div>

      {/* 1. SECCIÓ DE FILTRES (Ara amb classe condicional) */}
      <div className={`filtres-section ${menuObert ? "obert" : ""}`}>
        <div className="header-filtres-mobil">
          <h3>Filtres</h3>
          <button className="tancar-menu" onClick={() => setMenuObert(false)}>✕</button>
        </div>

        {Object.entries(GRUPS_SIMBOLS).map(([categoria, simbols]) => (
          <div key={categoria} className="grup-filtre">
            <h4 className="titol-grup">{categoria}</h4>
            <div className="icones-grup">
              {simbols.map((obj, i) => {
                const actiu = filtresActius.includes(obj.src);
                return (
                  <div key={i} className="wrapper-filtre">
                    <button
                      className={`botó-filtre ${actiu ? "actiu" : ""}`}
                      onClick={() => toggleFiltre(obj.src, categoria)}
                    >
                      <img src={obj.src} alt={obj.nom} />
                    </button>
                    <span className="legenda-simbol">{obj.nom}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        {/* Botó per tancar al final al mòbil */}
        <button className="boto-aplicar-mobil" onClick={() => setMenuObert(false)}>
          APLICAR
        </button>
      </div>

      {/* 2. BUSCADOR I LLISTA (Igual que abans) */}
      <div className="zona-intermedia">
        <input 
          type="text" 
          placeholder="Buscar carrer..." 
          value={textCerca}
          onChange={(e) => setTextCerca(e.target.value)}
          className="input-cercador"
        />
        {(filtresActius.length > 0 || textCerca) && (
          <button className="netejar-filtres" onClick={() => { setFiltresActius([]); setTextCerca(""); }}>
            Netejar
          </button>
        )}
      </div>

      <div className="contenidor-llista">
        {carrersFiltrats.map(([nom, dades]) => (
          <Link key={nom} to={`/carrer/${encodeURIComponent(nom)}`} className="item-llista">
            {nom}
          </Link>
        ))}
      </div>
      
      {/* Overlay per tancar el menú clicant fora */}
      {menuObert && <div className="overlay-menu" onClick={() => setMenuObert(false)}></div>}
    </div>
  );
}

export default Cataleg;