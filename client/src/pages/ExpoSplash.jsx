import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExpoSplash.css"; // O el nom que li hagis posat per evitar l'error de casing

function Splash() {
  const navigate = useNavigate();

  const entrarModeExposicio = () => {
    localStorage.setItem("modeExposicio", "true");
    navigate("/home");
  };

  const entrarModeOriginal = () => {
    localStorage.removeItem("modeExposicio");
    navigate("/home");
  };

  return (
    <div className="splash-container">
      <div className="splash-content">
        <h1 className="splash-logo">CULACTIU</h1>
        <div className="splash-buttons">
          <button onClick={entrarModeExposicio} className="boto-splash">
            EXPOSICIÓ
            <span>16/01/2026</span>
          </button>
          
          <button onClick={entrarModeOriginal} className="boto-splash">
            WEB ORIGINAL
          </button>
        </div>
      </div>
    </div>
  );
}

export default Splash;