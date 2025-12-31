import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [message, setMessage] = useState("");

  const checkLocation = () => {
    if (!navigator.geolocation) {
      setMessage("Geolocalització no suportada al navegador.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          // CANVI FET: Ara ens connectem al servidor de Render 👇
          const res = await fetch("https://culactiu-web.onrender.com/check-location", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ latitude, longitude }),
          });

          const data = await res.json();

          if (data.access) {
            setMessage(`✅ Accés permès! Carrer detectat: ${data.address}`);
          } else {
            setMessage(`❌ Accés denegat! Carrer detectat: ${data.address}`);
          }
        } catch (err) {
          console.error(err);
          setMessage("⚠️ Error en connectar amb el servidor.");
        }
      },
      (err) => {
        console.error(err);
        setMessage("⚠️ No s'ha pogut obtenir la ubicació.");
      },
      { enableHighAccuracy: true } // ajuda a obtenir coordenades més precises
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1 style={{ fontSize: "4rem", color: "#333" }}>CULACTIU</h1>
      <button
        style={{
          marginTop: "2rem",
          padding: "1rem 2rem",
          fontSize: "1.2rem",
          cursor: "pointer",
        }}
        onClick={checkLocation}
      >
        Comprova ubicació
      </button>
      {message && (
        <p style={{ marginTop: "1rem", fontSize: "1.5rem", textAlign: "center" }}>
          {message}
        </p>
      )}
      <Analytics />
    </div>
  );
}

export default App;