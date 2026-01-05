import React from "react";
import { Link } from "react-router-dom"; // <--- Assegura't de tenir això importat
import "./Cataleg.css";

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
      {/* HEM ESBORRAT EL HEADER PERQUÈ JA SURT A APP.JS */}

      {/* GRAELLA DE CARRERS AMB ENLLAÇOS */}
      <div className="streets-grid">
        {streets.map((street, index) => (
          /* ARA ÉS UN LINK UN ALTRE COP */
          <Link 
            key={index} 
            to={`/carrer/${encodeURIComponent(street)}`} 
            className="street-item"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }} // Estil inline per evitar blau/subratllat lleig
          >
            {street}
          </Link>
        ))}
      </div>

      <div className="add-button-container">
        <button className="add-btn">afegir</button>
      </div>
    </div>
  );
}

export default Cataleg;