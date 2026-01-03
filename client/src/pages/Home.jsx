import React, { useState } from 'react';

// Importem les noves imatges de línia des de la carpeta assets
import imgCercle from '../assets/cercle.png'; // Imatge per a QUI SOM
import imgCasa from '../assets/casa.png';     // Imatge per a QUÈ FEM

function Home() {
  // Creem DOS estats independents per controlar el hover de cada costat
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  // --- ESTILS ---

  // Contenidor principal per centrar-ho tot
  const mainContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70vh',
    padding: '40px',
  };

  // Contenidor que agrupa les dues columnes amb espai entre elles
  const contentContainerStyle = {
    display: 'flex',
    gap: '200px', // Espai generós entre les dues seccions
    alignItems: 'flex-start', // Alinea a dalt per evitar moviments estranys
  };

  // Estil per a CADA columna (imatge/text). Defineix una amplada fixa.
  const columnContainerStyle = {
    width: '400px',    // Amplada fixa per a la imatge i el text
    height: '400px',   // Alçada fixa per mantenir l'estructura
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer', // Indica que és interactiu
    // La transició suau s'aplica al contingut intern
  };

  // Estil per a les imatges per ajustar-se al seu contenidor
  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // Mostra tota la imatge sense deformar
    transition: 'opacity 0.3s ease', // Transició suau per a l'aparició/desaparició
  };

  // Estil per al bloc de text, que ocupa el mateix espai que la imatge
  const textBlockStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Centra el text verticalment
    textAlign: 'left',
    animation: 'fadeIn 0.3s ease', // Petita animació d'entrada per al text
  };

  const paragraphStyle = {
    lineHeight: '1.5',
    fontSize: '1rem',
    whiteSpace: 'pre-line', // Respecta els salts de línia del poema
  };

  return (
    <div style={mainContainerStyle}>
      <div style={contentContainerStyle}>

        {/* --- COLUMNA ESQUERRA (QUI SOM / CERCLE) --- */}
        <div
          style={columnContainerStyle}
          onMouseEnter={() => setHoverLeft(true)} // Activa només l'esquerra
          onMouseLeave={() => setHoverLeft(false)} // Desactiva només l'esquerra
        >
          {!hoverLeft ? (
            // Mostra la imatge del cercle si NO hi ha hover
            <img src={imgCercle} alt="Cercle de figures" style={imageStyle} />
          ) : (
            // Mostra el text si SÍ hi ha hover
            <div style={textBlockStyle}>
              <h2>QUI SOM?</h2>
              <p style={paragraphStyle}>
                Som un col·lectiu dedicat als culs de sac, entesos com a espais de pausa urbana i no productivitat. Reflexionem sobre la ciutat, els seus ritmes i l'espai comú. Us convidem a replicar les nostres accions o a crear-ne de noves, tot reivindicant que aquests espais existeixen i són essencials i mereixen ser preservats.
              </p>
            </div>
          )}
        </div>

        {/* --- COLUMNA DRETA (QUÈ FEM / CASA) --- */}
        <div
          style={columnContainerStyle}
          onMouseEnter={() => setHoverRight(true)} // Activa només la dreta
          onMouseLeave={() => setHoverRight(false)} // Desactiva només la dreta
        >
          {!hoverRight ? (
            // Mostra la imatge de la casa si NO hi ha hover
            <img src={imgCasa} alt="Símbol de casa" style={imageStyle} />
          ) : (
            // Mostra el text si SÍ hi ha hover
            <div style={textBlockStyle}>
              <h2>QUÈ FEM?</h2>
              <p style={paragraphStyle}>
                Cul Actiu posa els seus cossos contra el terra,
                cossos que activen una conversa directa amb l’espai públic
                i exerceixen una sensació més gran de pertinença.
                {'\n\n'}
                El cos Cul Actiu qüestiona les dinàmiques de la ciutat,
                una ciutat contaminada per ritmes ràpids,
                desigualtat, productivitat i sistemes binaris.
                {'\n\n'}
                Els cossos cul actiu tracen visible la fina línia
                entre allò públic i allò privat
                i hi juguem els seus límits.
                {'\n\n'}
                Cul Actiu activa una materialitat diferent
                de la rígida presentada,
                perquè els ciutadans puguin ocupar sense justificar,
                ocupar sense dominar.
                {'\n\n'}
                Els cossos Cul actiu no conviden
                ni a la productivitat ni a l'abandó.
                I són errors, que no s'han de corregir.
              </p>
            </div>
          )}
        </div>

      </div>
      {/* Afegim una animació simple per al text al CSS global */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default Home;