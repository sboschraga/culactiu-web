import React, { useState } from 'react';

// URL temporals (fes servir aquestes si no tens les imatges locals encara)
const TEMP_IMG_BLAU = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Spain_traffic_signal_s15a.svg/600px-Spain_traffic_signal_s15a.svg.png";
const TEMP_IMG_STOP = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/STOP_sign.jpg/600px-STOP_sign.jpg";

function Home() {
  const [isHovered, setIsHovered] = useState(false);

  // Estils
  const mainContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh', 
    padding: '50px',
    cursor: 'pointer' 
  };

  const iconsContainerStyle = {
    display: 'flex',
    gap: '100px', 
    alignItems: 'center'
  };

  const imageStyle = {
    height: '250px', 
    width: 'auto',
    objectFit: 'contain'
  };

  const textContainerStyle = {
    display: 'flex',
    gap: '80px', 
    maxWidth: '900px',
    textAlign: 'left'
  };

  return (
    <div 
      style={mainContainerStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered ? (
        <div style={iconsContainerStyle}>
          <img src={TEMP_IMG_BLAU} alt="Senyal sense sortida" style={imageStyle} />
          <img src={TEMP_IMG_STOP} alt="Senyal Stop" style={imageStyle} />
        </div>
      ) : (
        <div style={textContainerStyle}>
          <div style={{ flex: 1 }}>
            <h2>QUI SOM?</h2>
            <p>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.
            </p>
          </div>
          <div style={{ flex: 1 }}>
            <h2>QUÈ FEM?</h2>
            <p>
              lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum
              lorem ipsum lorem ipsum. ipsumlorem ipsum lorem ipsumlorem ipsum
              lorem ipsum.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;