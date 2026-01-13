import React, { useState } from "react";
// 1. AFEGIM 'Link' AQUI:
import { Link } from "react-router-dom"; 
import "./AfegirCarrer.css";

// ... (El codi de CONST GRUPS_SIMBOLS es queda igual) ...
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

function AfegirCarrer() {
  const [nom, setNom] = useState("");
  const [conversa, setConversa] = useState("");
  const [simbolsSeleccionats, setSimbolsSeleccionats] = useState([]);
  const [fotoCara, setFotoCara] = useState(null);
  const [fotoCul, setFotoCul] = useState(null);

  const toggleSimbol = (src, categoria) => {
    const simbolsDelGrup = GRUPS_SIMBOLS[categoria].map(s => s.src);
    let nousSimbols = simbolsSeleccionats.filter(s => !simbolsDelGrup.includes(s));

    if (!simbolsSeleccionats.includes(src)) {
      nousSimbols.push(src);
    }
    setSimbolsSeleccionats(nousSimbols);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fotoCara || !fotoCul) {
      alert("⚠️ Error: Has de pujar les dues fotos (Cara i Cul) obligatòriament.");
      return;
    }

    if (simbolsSeleccionats.length === 0) {
      alert("⚠️ Error: Has de seleccionar els símbols que defineixen el carrer.");
      return;
    }

    const nouCarrer = {
      nom: nom,
      conversa: conversa,
      simbols: simbolsSeleccionats,
      fotos: {
        cara: fotoCara.name,
        cul: fotoCul.name
      },
      dataRegistre: new Date().toLocaleDateString() 
    };

    const dadesJSON = JSON.stringify(nouCarrer, null, 2);
    const blob = new Blob([dadesJSON], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.href = url;
    link.download = `Nou_Carrer_${nom.replace(/\s+/g, "_")}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert("✅ Formulari enviat correctament! Revisa la teva carpeta de descàrregues.");
  };

  return (
    <div className="form-container">
      
      {/* 2. AFEGIM EL BOTÓ TORNAR AQUÍ A DALT */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/cataleg" className="boto-tornar">
          ← TORNAR
        </Link>
      </div>

      <h1 className="titol-form">AFEGIR NOU CUL DE SAC</h1>
      
      <form onSubmit={handleSubmit} className="formulari">
        <div className="camp">
          <label>NOM DEL CARRER: <span style={{color:'red'}}>*</span></label>
          <input 
            type="text" 
            value={nom} 
            onChange={(e) => setNom(e.target.value)} 
            placeholder="Ex: Carrer del Pi" 
            required 
          />
        </div>

        <div className="camp">
          <label>INSEREIX FOTOS: <span style={{color:'red'}}>*</span></label>
          <div className="inputs-fotos">
            <div className="input-foto">
              <span>Cara:</span>
              <input type="file" accept="image/*" onChange={(e) => setFotoCara(e.target.files[0])} required />
            </div>
            <div className="input-foto">
              <span>Cul:</span>
              <input type="file" accept="image/*" onChange={(e) => setFotoCul(e.target.files[0])} required />
            </div>
          </div>
        </div>

        <div className="camp">
          <label>SELECCIONA ELS SÍMBOLS: <span style={{color:'red'}}>*</span></label>
          <div className="graella-simbols-cataleg">
            {Object.entries(GRUPS_SIMBOLS).map(([categoria, simbols]) => (
              <div key={categoria} className="grup-seleccio">
                <h4 className="titol-categoria-form">{categoria}</h4>
                <div className="icones-seleccio">
                  {simbols.map((obj, i) => {
                    const isSelected = simbolsSeleccionats.includes(obj.src);
                    return (
                      <div key={i} className="wrapper-filtre-form">
                        <div 
                          className={`botó-filtre-form ${isSelected ? "actiu" : ""}`}
                          onClick={() => toggleSimbol(obj.src, categoria)}
                        >
                          <img src={obj.src} alt={obj.nom} />
                        </div>
                        <span className="legenda-simbol-form">{obj.nom}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="camp">
          <label>PREGUNTA / CONVERSA:</label>
          <textarea 
            rows="5"
            value={conversa}
            onChange={(e) => setConversa(e.target.value)}
            placeholder="Escriu aquí el resum de la conversa..."
          />
        </div>

        <button type="submit" className="boto-enviar">
          ENVIAR FORMULARI
        </button>

      </form>
    </div>
  );
}

export default AfegirCarrer;