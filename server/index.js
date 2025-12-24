const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIGURACIÓ ---

// Coordenades dels llocs permesos
const allowedLocations = [
  { name: "La Rambla", lat: 41.380775, lon: 2.173661 }, 
  { name: "Plaça Urquinaona", lat: 41.388480, lon: 2.174390 },
  { name: "Carrer Moianès", lat: 41.6141373, lon: 2.2893226 },
  { name: "Plaça de les Olles", lat: 41.6084448, lon: 2.2872299 }
];

// Distància màxima permesa en METRES
const MAX_DISTANCE_METERS = 100;

// --- FUNCIONS MATEMÀTIQUES ---

function getDistanceFromLatLonInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371e3; 
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

// --- RUTA PRINCIPAL ---

app.post("/check-location", (req, res) => {
  const { latitude, longitude } = req.body;
  
  console.log("------------------------------------------------");
  console.log(`📍 Usuari detectat a: ${latitude}, ${longitude}`);

  let allowed = false;
  let locationName = "Ubicació desconeguda";
  let minDistance = 99999999; // Per guardar la distància més propera trobada

  // Comprovem distància amb TOTS els punts
  for (const loc of allowedLocations) {
    const distance = getDistanceFromLatLonInMeters(latitude, longitude, loc.lat, loc.lon);
    
    // Això sortirà a la teva terminal per veure què passa
    console.log(`   Distància a ${loc.name}: ${distance.toFixed(1)} metres`);

    if (distance < minDistance) {
        minDistance = distance;
    }
    
    if (distance <= MAX_DISTANCE_METERS) {
      allowed = true;
      locationName = loc.name;
      // No fem 'break' aquí per poder veure totes les distàncies al log, 
      // però si només vols validar-ne una, podries parar.
    }
  }

  if (allowed) {
    console.log("✅ ACCÉS PERMÈS");
    return res.json({ access: true, address: locationName });
  } else {
    console.log(`❌ ACCÉS DENEGAT (El punt més proper està a ${minDistance.toFixed(1)} metres)`);
    return res.json({ access: false, address: `Estàs massa lluny (${minDistance.toFixed(0)}m del punt més proper).` });
  }
});

// Aprofitem el port que ens doni el núvol (process.env.PORT) o el 5000 si som a casa
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor actiu al port ${PORT}`));