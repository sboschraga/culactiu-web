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
  { name: "Plaça de les Olles", lat: 41.6084448, lon: 2.2872299 },
  { name: "C/ Rera Sant Just", lat: 41.38253836691902, lon: 2.1777601558566126 },
  { name: "C/ de Sant Simplici", lat: 41.38164065999463, lon: 2.1789911726284483 },
  { name: "C/ de Riudarenes", lat: 41.3809908455344, lon: 2.1797510001495874 },
  { name: "C/ del Tonell", lat: 41.38071148583164, lon: 2.17991098173389 },
  { name: "C/ de la Tarongeta", lat: 41.38333689326777, lon: 2.181049643017582 },
  { name: "C/ de Nicolau de Sant Climent", lat: 41.38372377336681, lon: 2.18092523534211 },
  { name: "Ptge. de l’Oli", lat: 41.38486990940606, lon: 2.1785662819454026 },
  { name: "C/ de la Volta de la Perdiu", lat: 41.386606008492606, lon: 2.176915928572149 },
  { name: "Ptge. de Lucà", lat: 41.41052575307892, lon: 2.139402273531987 },
  { name: "Ptge. del Putxet", lat: 41.404059059346295, lon: 2.1426867923084196 },
  { name: "C/ de Felip Gil", lat: 41.40718403377116, lon: 2.143423553734635 },
  { name: "C/ del Francolí", lat: 41.40457692270555, lon: 2.147912951761781 },
  { name: "Carreró de les Carolines", lat: 41.403999323920615, lon: 2.151093767983999 },
  { name: "Ptge. de Sant Josep de la Muntanya", lat: 41.411051638905015, lon: 2.1544306190168947 },
  { name: "C/ de Sant Cugat del Vallès", lat: 41.411355377738964, lon: 2.1535206226931103 },
  { name: "C/ de Logroño", lat: 41.44050235020748, lon: 2.1570647898075523 },
  { name: "C/ de la Font Baliarda", lat: 41.441346727669846, lon: 2.1557424633772713 },
  { name: "C/ dels Pirineus", lat: 41.43844935629942, lon: 2.161210328689008 },
  { name: "C/ de la Rectoria", lat: 41.434139161194324, lon: 2.159914709864333 },
  { name: "C/ de Grifols", lat: 41.427648709195665, lon: 2.1599186262859384 },
  { name: "Riera de Marcel·lí", lat: 41.430253398550626, lon: 2.1529423440069113 },
  { name: "C/ d’Hug de Rocabertí", lat: 41.3850596742807, lon: 2.133311956261469 },
  { name: "Ptge. de Sant Ramon Nonat", lat: 41.376321048721394, lon: 2.117987611974052 },
  { name: "Ptge. de Vicent Martín", lat: 41.37748096888126, lon: 2.116056310801696 },
  { name: "C/ d’Aiguallonga", lat: 41.38873763161186, lon: 2.104924199147839 },
  { name: "Ptge. de Puig Aguilar", lat: 41.388716371644335, lon: 2.104418884444168 },
  { name: "Pl. del Coll de Finestrelles", lat: 41.38919651941972, lon: 2.1040843997175958 },
  { name: "C/ Costa de Sant Bartomeu de la Quadra", lat: 41.38942377376603, lon: 2.104199517229367 },
  { name: "Ptge. Carreras", lat: 41.45683504455201, lon: 2.181884727189601 },
  { name: "C/ de Palau-Solità", lat: 41.45842468671127, lon: 2.182241610281811 },
  { name: "C/ de Ripollet", lat: 41.45691656824185, lon: 2.182980139263495 },
  { name: "C/ del Port de la Selva", lat: 41.44705861908793, lon: 2.1789719081231955 },
  { name: "C/ del Verdet", lat: 41.43847228336899, lon: 2.189590832442194 },
  { name: "C/ de Tremp", lat: 41.43869276227528, lon: 2.1877591976670163 },
  { name: "C/ d'en Xandri", lat: 41.43830655157453, lon: 2.185560476891055 },
  { name: "Ptge. Baliarda", lat: 41.436544364374875, lon: 2.188796995245255 },
  { name: "C/ Cerdà", lat: 41.43565547293505, lon: 2.188819434514976 },
  { name: "C/ de Gordi", lat: 41.43565547293505, lon: 2.188819434514976 },
  { name: "Torrent de Parellada", lat: 41.43220110347789, lon: 2.1880854347440897 },
  { name: "C/ de les Monges", lat: 41.432032998695256, lon: 2.1870421944893135 },
  { name: "Ptge. d'Irlanda", lat: 41.43150959397617, lon: 2.18633448074808 },
  { name: "C/ dels Afores", lat: 41.429528606195724, lon: 2.190764445532401 },
  { name: "Gran Via Catalana", lat: 41.4297796166403, lon: 2.2036520656846474 },
  { name: "C/ del Pou de l'Alzina", lat: 41.43266965724075, lon: 2.201631536994376 },
  { name: "C/ de Jaume Brossa", lat: 41.430060226486056, lon: 2.19905496121926 },
  { name: "Ptge. de Malet", lat: 41.41369671770875, lon: 2.188309264743962 },
  { name: "C/ de l'Arc de Sant Sever", lat: 41.409874618591765, lon: 2.18587008308247 },
  { name: "C/ Meridional", lat: 41.40782657976715, lon: 2.1870322448574115 },
  { name: "C/ del Gaià", lat: 41.36171825350059, lon: 2.1415116069624425 },
  { name: "C/ de Gabriel Miró", lat: 41.353049599071994, lon: 2.1482761109055675 },
  { name: "Ptge. de Julià", lat: 41.37014223182839, lon: 2.1613011152732984 },
  { name: "C/ de Cariteo", lat: 41.37043362987127, lon: 2.1604464997175565 },
  { name: "C/ de la Concòrdia", lat: 41.37263698791773, lon: 2.1594698970000112 },
  { name: "C/ de Maria Victòria", lat: 41.37296802453955, lon: 2.1377665013663845 },
  { name: "C/ de Pomar", lat: 41.372234227430475, lon: 2.1346379065407217 },
  { name: "C/ de Demòstenes", lat: 41.376259785732664, lon: 2.1335985029724776 },
  { name: "C/ de López Catalan", lat: 41.3759601350936, lon: 2.1374172879565547 },
  { name: "C/ dels Dominics", lat: 41.40963557844661, lon: 2.1340033531724725 },
  { name: "C/ de Bigai", lat: 41.40566005248056, lon: 2.133749998405805 },
  { name: "C/ de les Canàries", lat: 41.40533168309466, lon: 2.1247430963679292 },
  { name: "C/ de Margenat", lat: 41.403586230370884, lon: 2.123442258686652 },
  { name: "C/ de l’Arquitecte Mas", lat: 41.39934449380521, lon: 2.1209996214326345 },
  { name: "C/ Pau Alcover", lat: 41.40041764061599, lon: 2.128642166103607 }
];

// Distància màxima permesa en METRES
const MAX_DISTANCE_METERS = 200;

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
  
  // Validació bàsica d'entrada
  if (latitude === undefined || longitude === undefined) {
    return res.status(400).json({ access: false, message: "Falten coordenades" });
  }

  console.log("------------------------------------------------");
  console.log(`📍 Usuari detectat a: ${latitude}, ${longitude}`);

  let minDistance = Infinity;
  let bestLocation = null;

  // Cerca del punt més proper (lògica millorada)
  for (const loc of allowedLocations) {
    const distance = getDistanceFromLatLonInMeters(latitude, longitude, loc.lat, loc.lon);
    
    // Si trobem una distància menor a l'actual registrada, la guardem com la millor
    if (distance < minDistance) {
        minDistance = distance;
        bestLocation = loc;
    }
  }

  // Avaluació final
  if (minDistance <= MAX_DISTANCE_METERS && bestLocation) {
    console.log(`✅ ACCÉS PERMÈS. Ubicació: ${bestLocation.name} (a ${Math.round(minDistance)}m)`);
    return res.json({ 
        access: true, 
        address: bestLocation.name,
        distance: Math.round(minDistance)
    });
  } else {
    const puntProper = bestLocation ? bestLocation.name : "Cap punt trobat";
    console.log(`❌ DENEGAT. Punt més proper: ${puntProper} (a ${Math.round(minDistance)}m)`);
    
    return res.json({ 
        access: false, 
        distance: Math.round(minDistance),
        nearestLocation: puntProper
    });
  }
});

// Aprofitem el port que ens doni el núvol (process.env.PORT) o el 5000 si som a casa
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor actiu al port ${PORT}`));