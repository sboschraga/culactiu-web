import React, { useState } from 'react';
import imgCercle from '../assets/cercle.png';
import imgCasa from '../assets/casa.png';
import './Home.css';

function Home() {
  const [hoverLeft, setHoverLeft] = useState(false);
  const [hoverRight, setHoverRight] = useState(false);

  return (
    <div className="home-main-container">
      {/* El fons interactiu aïllat per a màxim rendiment */}
      <iframe 
        src="/fons.html" 
        title="fons"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          border: 'none',
          zIndex: 0,
          pointerEvents: 'auto'
        }}
      />

      <div className="home-content-container">
        {/* COLUMNA ESQUERRA */}
        <div
          className="home-column"
          onMouseEnter={() => setHoverLeft(true)}
          onMouseLeave={() => setHoverLeft(false)}
          onClick={() => setHoverLeft(!hoverLeft)}
        >
          {!hoverLeft ? (
            <img src={imgCercle} alt="Cercle" className="home-image" />
          ) : (
            <div className="home-text-block">
              <h2>QUI SOM?</h2>
              <p className="home-paragraph">
                Som un col·lectiu dedicat als culs-de-sac, entesos com a espais de pausa urbana i no productivitat. Reflexionem sobre la ciutat, els seus ritmes i l'espai construït compartit.
                {'\n\n'} 
                Us convidem a replicar les nostres accions o a crear-ne de noves, tot reivindicant que aquests espais existeixen i són essencials per seguir tenint esperança en l’espai urbà.
              </p>
            </div>
          )}
        </div>

        {/* COLUMNA DRETA */}
        <div
          className="home-column"
          onMouseEnter={() => setHoverRight(true)}
          onMouseLeave={() => setHoverRight(false)}
          onClick={() => setHoverRight(!hoverRight)}
        >
          {!hoverRight ? (
            <img src={imgCasa} alt="Casa" className="home-image" />
          ) : (
            <div className="home-text-block">
              <h2>QUÈ FEM?</h2>
              <p className="home-paragraph">
                La nostra proposta com a col·lectiu es basa en la participació del cos en aquests espais, hem dissenyat cinc accions on, amb el cos com a protagonista. 
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;