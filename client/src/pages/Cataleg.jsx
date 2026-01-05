import React from "react";
import { Link } from "react-router-dom";
import "./Cataleg.css"; // Ara crearem aquest fitxer per fer les 4 columnes

const streets = [
  "C/ Cerdà", "C/ Costa de Sant Bartomeu de la Quadra", "C/ d'en Xandri", "C/ d’Aiguallonga",
  "C/ d’Hug de Rocabertí", "C/ de Bigai", "C/ de Cariteo", "C/ de Demòstenes",
  "C/ de Felip Gil", "C/ de Gabriel Miró", "C/ de Gordi", "C/ de Grifols",
  "C/ de Jaume Brossa", "C/ de l'Arc de Sant Sever", "C/ de l’Arquitecte Mas", "C/ de la Concòrdia",
  "C/ de la Font Baliarda", "C/ de la Rectoria", "C/ de la Tarongeta", "C/ de la Volta de la Perdiu",
  "C/ de les Canàries", "C/ de les Monges", "C/ de Logroño", "C/ de López Catalan",
  "C/ de Margenat", "C/ de Maria Victòria", "C/ de Nicolau de Sant Climent", "C/ de Palau-Solità",
  "C/ de Pomar", "C/ de Ripollet", "C/ de Riudarenes", "C/ de Sant Cugat del Vallès",
  "C/ de Sant Simplici", "C/ de Tremp", "C/ del Francolí", "C/ del Gaià",
  "C/ del Port de la Selva", "C/ del Pou de l'Alzina", "C/ del Tonell", "C/ del Verdet",
  "C/ dels Afores", "C/ dels Dominics", "C/ dels Pirineus", "C/ Meridional",
  "C/ Pau Alcover", "C/ Rera Sant Just", "Carreró de les Carolines", "Gran Via Catalana",
  "Pl. del Coll de Finestrelles", "Ptge. Baliarda", "Ptge. Carreras", "Ptge. d'Irlanda",
  "Ptge. de Julià", "Ptge. de Lucà", "Ptge. de l’Oli", "Ptge. de Malet",
  "Ptge. de Puig Aguilar", "Ptge. de Sant Josep de la Muntanya", "Ptge. de Sant Ramon Nonat",
  "Ptge. de Vicent Martín", "Ptge. del Putxet", "Riera de Marcel·lí", "Torrent de Parellada"
];

function Cataleg() {
  return (
    <div className="catalog-container">
      {/* CAPÇALERA */}
      <header className="catalog-header">
        <h1 className="logo">CULACTIU</h1>
        <nav className="top-nav">
          {/* Aquests sí que són links per poder navegar pel menú */}
          <Link to="/cataleg" className="nav-link active">catàleg</Link>
          <Link to="/accions" className="nav-link">accions</Link>
        </nav>
      </header>

      {/* GRAELLA DE CARRERS (Text pla, sense clicar) */}
      <div className="streets-grid">
        {streets.map((street, index) => (
          <div key={index} className="street-item">
            {street}
          </div>
        ))}
      </div>

      {/* BOTÓ AFEGIR (Sense funció) */}
      <div className="add-button-container">
        <button className="add-btn">afegir</button>
      </div>
    </div>
  );
}

export default Cataleg;