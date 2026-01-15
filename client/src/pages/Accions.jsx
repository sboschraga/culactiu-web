import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Accions.css";

const infoAccions = [
  { 
    id: 1, 
    titol: "neteja", 
    img: "/img/accions/neteja.jpg",
    tags: [
      "Públic", "Privat", "X veïnes", "X altres", 
      "Interactiu", "Col·lectiu", "Humà + Objecte", 
      "Matèria", "Intrusiu"
    ] 
  },
  { 
    id: 2, 
    titol: "esport", 
    img: "/img/accions/esport.jpg", 
    tags: [
      "Públic", "Privat", "X veïnes", "X altres", 
      "Interactiu", "Col·lectiu", "Humà + Objecte", 
      "Matèria", "Intrusiu"
    ] 
  },
  { 
    id: 3, 
    titol: "muralla", 
    img: "/img/accions/muralla.jpg", 
    tags: [
      "Públic", "Privat", "X veïnes", "X altres", 
      "Interactiu", "Col·lectiu", "Humà", "Humà + Objecte", 
      "Matèria", "Intrusiu"
    ] 
  },
  { 
    id: 4, 
    titol: "fletxes", 
    img: "/img/accions/fletxes.jpg", 
    tags: [
      "Públic", "Privat", "Productiu", "Inactiu Reflexiu", 
      "Contemplatiu", "Col·lectiu", "Humà + Objecte", 
      "Matèria", "Subtil"
    ] 
  },
  { 
    id: 5, 
    titol: "cassolada", 
    img: "/img/accions/cassolada.jpg", 
    tags: [
      "Públic", "Privat", "X veïnes", "X altres", 
      "Interactiu", "Col·lectiu", "Humà + Objecte", 
      "Sensorial", "Intrusiu"
    ] 
  }
];

// --- CONSTANTS DELS FILTRES ---
const FILTRES_COM = [
  "Interactiu", "Contemplatiu", "Individual", "Col·lectiu", 
  "Humà", "Humà + Objecte", "Matèria", "Sensorial", "Intrusiu", "Subtil"
];

const FILTRES_QUE = [
  "Privat", "Públic", "Productiu", "Inactiu Reflexiu", 
  "X veïnes", "X altres"
];

function Accions() {
  const navigate = useNavigate();
  const [filtresActius, setFiltresActius] = useState([]);
  const [accionsVisibles, setAccionsVisibles] = useState(infoAccions);

  const toggleFiltre = (tag) => {
    if (filtresActius.includes(tag)) {
      setFiltresActius(filtresActius.filter(t => t !== tag));
    } else {
      setFiltresActius([...filtresActius, tag]);
    }
  };

  useEffect(() => {
    if (filtresActius.length === 0) {
      setAccionsVisibles(infoAccions);
    } else {
      const resultat = infoAccions.filter(accio => 
        filtresActius.every(filtre => accio.tags.includes(filtre))
      );
      setAccionsVisibles(resultat);
    }
  }, [filtresActius]);

  const anarAlDetall = (titol) => {
    navigate(`/accio/${titol}`);
  };

  return (
    <div className="accions-container">
      
      {/* 1. TEXT FIX ESQUERRA */}
      <div className="bloc-text-fix">
        <p>L’objectiu d’aquestes accions és qüestionar-se els espais no productius de la ciutat, els culs-de-sac.</p>
        <p>Són espais públics, però qui els habita, qui els transita, de quina manera ho fan? La reflexió genera un projecte participatiu en constant evolució, que s’expandeix per tot el món junt amb el CULACTIU.</p>
      </div>

      {/* 2. FILTRES FIXOS DRETA (ORDRE CANVIAT: QUÈ -> COM) */}
      <div className="bloc-filtres-fix">
        
        {/* GRUP QUÈ QÜESTIONEM (ARA PRIMER) */}
        <div className="grup-filtre">
          <h4>QUÈ QÜESTIONEM?</h4>
          <ul>
            {FILTRES_QUE.map(tag => (
              <li 
                key={tag} 
                className={filtresActius.includes(tag) ? "actiu" : ""} 
                onClick={() => toggleFiltre(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* GRUP COM (ARA SEGON / A LA DRETA) */}
        <div className="grup-filtre">
          <h4>COM?</h4>
          <ul>
            {FILTRES_COM.map(tag => (
              <li 
                key={tag} 
                className={filtresActius.includes(tag) ? "actiu" : ""} 
                onClick={() => toggleFiltre(tag)}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* 3. FOTOS (LLISTA D'ACCIONS) */}
      {infoAccions.map((accio, index) => {
        const esVisible = accionsVisibles.some(a => a.id === accio.id);
        if (!esVisible) return null;

        return (
          <div 
             key={accio.id} 
             className={`targeta-accio posicio-${index % 5}`}
             onClick={() => anarAlDetall(accio.titol)}
          >
            <img 
              src={accio.img} 
              alt={accio.titol} 
              className="imatge-accio-full" 
            />
            <p className="peu-foto">
              {accio.titol}
            </p>
          </div>
        );
      })}

      {accionsVisibles.length === 0 && (
        <div className="missatge-buit">No hi ha accions amb aquests filtres.</div>
      )}

    </div>
  );
}

export default Accions;