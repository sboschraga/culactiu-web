import React from "react";

function Accions() {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
    textAlign: "center",
    fontFamily: "'Azeret Mono', monospace", // Font de títol
  };

  return (
    <div style={containerStyle}>
      <h1>ACCIONS INDEFINIDES</h1>
    </div>
  );
}

export default Accions;