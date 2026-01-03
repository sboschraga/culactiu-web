import React, { useState } from 'react';

// Import images from the assets folder
// Make sure the filenames match exactly what you saved!
import imgRotllana from '../assets/rotllana.jpg';
import imgSimbol from '../assets/simbol.jpg';

function Home() {
  const [isHovered, setIsHovered] = useState(false);

  // --- STYLES ---
  const mainContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '70vh', 
    padding: '40px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  };

  const contentContainerStyle = {
    display: 'flex',
    gap: '80px', // Space between columns
    maxWidth: '1100px',
    alignItems: 'flex-start',
    textAlign: 'left'
  };

  const imageStyle = {
    height: '350px', // Adjust size as needed
    width: 'auto',
    objectFit: 'contain'
  };

  const textColumnStyle = {
    flex: 1,
    lineHeight: '1.6', 
    fontSize: '0.95rem'
  };

  return (
    <div 
      style={mainContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      
      {/* CONTAINER THAT CHANGES ON HOVER */}
      <div style={contentContainerStyle}>

        {/* --- LEFT COLUMN (QUI SOM / ROTLLANA) --- */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {!isHovered ? (
            <img src={imgRotllana} alt="Rotllana de gent" style={imageStyle} />
          ) : (
            <div style={textColumnStyle}>
              <h2>QUI SOM?</h2>
              <p>
                Som un col·lectiu dedicat als culs de sac, entesos com a espais de pausa urbana i no productivitat. Reflexionem sobre la ciutat, els seus ritmes i l'espai comú. Us convidem a replicar les nostres accions o a crear-ne de noves, tot reivindicant que aquests espais existeixen i són essencials i mereixen ser preservats.
              </p>
            </div>
          )}
        </div>

        {/* --- RIGHT COLUMN (QUÈ FEM / SÍMBOL) --- */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          {!isHovered ? (
            <img src={imgSimbol} alt="Símbol Cul de Sac" style={imageStyle} />
          ) : (
            <div style={textColumnStyle}>
              <h2>QUÈ FEM?</h2>
              {/* whiteSpace preserves your poetic line breaks */}
              <p style={{ whiteSpace: 'pre-line' }}>
                Cul Actiu posa els seus cossos contra el terra,
                cossos que activen una conversa directa amb l’espai públic
                i exerceixen una sensació més gran de pertinença.
                {'\n'}
                El cos Cul Actiu qüestiona les dinàmiques de la ciutat,
                una ciutat contaminada per ritmes ràpids,
                desigualtat, productivitat i sistemes binaris.
                {'\n'}
                Els cossos cul actiu tracen visible la fina línia
                entre allò públic i allò privat
                i hi juguem els seus límits.
                {'\n'}
                Cul Actiu activa una materialitat diferent
                de la rígida presentada,
                perquè els ciutadans puguin ocupar sense justificar,
                ocupar sense dominar.
                {'\n'}
                Els cossos Cul actiu no conviden
                ni a la productivitat ni a l'abandó.
                I són errors, que no s'han de corregir.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default Home;