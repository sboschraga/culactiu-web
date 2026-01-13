import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import infoCarrers from "../data/infoCarrers";
import "./Cataleg.css";

const GRUPS_SIMBOLS = {
  "Forma": [
    { src: "/simbols/1linea.png", nom: "Rectilini" },
    { src: "/simbols/1obtús.png", nom: "Obtús" },
    { src: "/simbols/1ele.png", nom: "Forma L" }
  ],
  "Pendent": [
    { src: "/simbols/2mes15.png", nom: "> 15m" },
    { src: "/simbols/2menys15.png", nom: "< 15m" }
  ],
  "Tancament": [
    { src: "/simbols/3porta.png", nom: "Porta" },
    { src: "/simbols/3paret.png", nom: "Paret" },
    { src: "/simbols/3muntanya.png", nom: "Muntanya" },
    { src: "/simbols/3plaça.png", nom: "Plaça" },
    { src: "/simbols/3valla.png", nom: "Valla" }
  ],
  "Propietat": [
    { src: "/simbols/4públic.png", nom: "Públic" },
    { src: "/simbols/4privat.png", nom: "Privat" }
  ],
  "Accés": [
    { src: "/simbols/5peatonal.png", nom: "Vianants" },
    { src: "/simbols/5ambdues.png", nom: "Mixt" }
  ]
};

function Cataleg() {
  const [filtresActius, setFiltresActius] = useState([]);
  const [textCerca, setTextCerca] = useState("");
  const [carrersFiltrats, setCarrersFiltrats] = useState([]);

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
      
      {/* 1. PRIMER ELS SÍMBOLS (FILTRES) */}
      <div className="filtres-section">
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
                    <span className="legenda-simbol">
                      {obj.nom}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 2. DESPRÉS EL CERCADOR (Més petit) I BOTÓ NETEJAR */}
      <div className="zona-intermedia">
        <div className="buscador-container">
          <input 
            type="text" 
            placeholder="Buscar carrer..." 
            value={textCerca}
            onChange={(e) => setTextCerca(e.target.value)}
            className="input-cercador"
          />
        </div>

        {(filtresActius.length > 0 || textCerca) && (
          <button 
            className="netejar-filtres" 
            onClick={() => { setFiltresActius([]); setTextCerca(""); }}
          >
            Netejar tot
          </button>
        )}
      </div>

      {/* 3. FINALMENT LA LLISTA DE CARRERS */}
      <div className="contenidor-llista">
        {carrersFiltrats.map(([nom, dades]) => (
          <Link key={nom} to={`/carrer/${encodeURIComponent(nom)}`} className="item-llista">
            {nom}
          </Link>
        ))}
      </div>

      {carrersFiltrats.length === 0 && (
        <div className="no-resultats">
          <p>No s'ha trobat cap carrer.</p>
          <button onClick={() => { setFiltresActius([]); setTextCerca(""); }}>
            Veure tots
          </button>
        </div>
      )}
    </div>
  );
}

export default Cataleg;