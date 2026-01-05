// src/data/infoCarrers.js

const infoCarrers = {
  "C/ Cerdà": {
    districte: "Sant Andreu",
    ciutat: "Barcelona",
    // Si poses null, sortirà el quadre groc. Si poses una ruta "/img/foto.jpg", sortirà la foto.
    fotos: [null, null], 
    simbols: ["A", "B", "C", "D", "E"]
  },
  "C/ de Bigai": {
    districte: "Sarrià-Sant Gervasi",
    ciutat: "Barcelona",
    fotos: [null, null],
    simbols: ["$", "%", "&", "!", "?"] 
  },
  // Pots afegir aquí tots els carrers que vulguis...
};

export default infoCarrers;