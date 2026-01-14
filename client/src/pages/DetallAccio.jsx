import React from "react";
import { useParams, Link } from "react-router-dom";

// --- DADES ---
const infoAccions = [
  { 
    id: 1, 
    titol: "neteja", 
    img: "/img/accions/neteja.jpg", 
    
    participants: "2 - 8",
    temps: "30 minuts",
    materials: "Escombra, Pala, Draps, Fregalls, Sabó, Fregona, Guants, Mascaretes, Cubell, Productes de neteja, Caça-fantasmes de neteja, Aspirador",
    
    descripcio: `Acte 1: Localització d’un cul cul-de-sac adequat, brut.
Acte 2: Entrada al cul-de-sac, els integrants duen l’equipament i el material necessari.
Acte 3: Inspecció visual de l’espai.
Acte 4: Anem per feina! Comencem a netejar el carrer: escombrar i fregar el terra, treure la pols de les portes i portals, retirar els adhesius de canonades, fregar els grafits, extirpar els excrements de la fauna de Barcelona… Seguir minuts, hores o dies com faci falta, fins a deixar el cul-de-sac impol·lut, brillant, lluent, en definitiva millor de com l’has trobat.
Acte 5: Marxar satisfet amb la feina feta, llençant a la brossa tota la brutícia que s’ha recollit.`,
    
    tags: ["Públic", "Privat", "X veïnes", "X altres", "Interactiu", "Col·lectiu", "Humà + Objecte", "Matèria", "Intrusiu"] 
  },
  { 
    id: 2, 
    titol: "esport", 
    img: "/img/accions/esport.jpg", 
    
    participants: "2 - 8",
    temps: "30 minuts",
    materials: "Calçat còmode, Aigua per mantenir-se hidratat.",
    
    descripcio: `Acte 1: Localització d'un cul-de-sac adequat, llarg i ample, per a poder córrer moltes voltes sense marejar-se.
Acte 2: Entrada al cul-de-sac, els integrants duen l’equipament i el material necessari.
Acte 3: Escalfament previ, volem evitar lesions!
Acte 4: Activitat física intensa, aprofita la paret final del cul-de-sac per a fer curses i jocs.
Acte 5: Estiraments posteriors i reunió de grup. Discurs motivacional, fent grup, fent equip, fent CULACTIU.
Acte 6: Comiat al públic.`,
    
    tags: ["Públic", "Privat", "X veïnes", "X altres", "Interactiu", "Col·lectiu", "Humà + Objecte", "Matèria", "Intrusiu"] 
  },
  { 
    id: 3, 
    titol: "muralla", 
    img: "/img/accions/muralla.jpg", 
    
    participants: "3 - 8",
    temps: "30 minuts",
    materials: "Cap indumentària necessària.",
    
    descripcio: `Acte 1: Localització d'un cul-de-sac adequat, la llargada ha de ser adaptada al nombre de participants que duen a terme l’acció.
Acte 2: Entrada en filera al cul-de-sac, col·locar-se a l’inici ballant el pas.
Acte 3: Emmurallar el carrer, veure com la gent interactua: passa per baix, s’espera que t’apartis, us observa… Anar canviant de posicions, un costat, l’altre, de CUL, entrellaçats i amb poca distància entre els cossos.
Acte 4: Comiat al públic.`,
    
    tags: ["Públic", "Privat", "X veïnes", "X altres", "Interactiu", "Col·lectiu", "Humà", "Humà + Objecte", "Matèria", "Intrusiu"] 
  },
  { 
    id: 4, 
    titol: "fletxes", 
    img: "/img/accions/fletxes.jpg", 
    
    participants: "2 - 8",
    temps: "30 minuts",
    materials: "Cintes adhesives de colors, Tisores.",
    
    descripcio: `Acte 1: Localització d'un cul-de-sac adequat, a ser possible, llarg. Ajuda a crear expectació ja que no es veu de forma inmediata on et porten les fletxes.
Acte 2: Comença l’acció, tallar i enganxar fletxes per tot el carrer, han de senyalar totes cap a l’interior del cul-de sac. La direccionalitat de l’acció ha d’anar en el mateix sentit que les fletxes, és a dir, de fora cap endins.
Acte 3: Reforçar si alguna zona ha quedat poc poblada.
Acte 4: Observar des de la distància com interactuen els vianants, si ho miren, segueixen les fletxes…
Acte 5: Retirada de les fletxes, cal deixar l’espai tant net o mes que quan l’hem trobat.`,
    
    tags: ["Públic", "Privat", "Productiu", "Inactiu Reflexiu", "Contemplatiu", "Col·lectiu", "Humà + Objecte", "Matèria", "Subtil"] 
  },
  { 
    id: 5, 
    titol: "cassolada", 
    img: "/img/accions/cassolada.jpg", 
    
    participants: "4 - 8",
    temps: "15 minuts",
    materials: "Estris de cuina, Olles, Tapes, Paelles, Cullerots, Coberts.",
    
    descripcio: `Acte 1: Localització d'un cul-de-sac adequat, zona activa on hi hagi pocs habitatges per causar les mínimes molèsties possibles. *Advertència: en algunes ciutats és necessari adquirir permís per a poder fer soroll, si no, es poden tenir conflictes amb l'autoritat.
Acte 2: Situar-se amb tots els instruments casolans dins del cul-de-sac.
Acte 3: Començar a tocar. Ritme improvisat. Sentir l’espai, com ressona. Compenetració amb els companys.
Acte 4: Comiat al públic.`,
    
    tags: ["Públic", "Privat", "X veïnes", "X altres", "Interactiu", "Col·lectiu", "Humà + Objecte", "Sensorial", "Intrusiu"] 
  }
];

function DetallAccio() {
  const { id } = useParams(); 
  const accio = infoAccions.find(a => a.titol === id);

  if (!accio) {
    return <div style={{ padding: 40, fontFamily: "inherit" }}>Acció no trobada</div>;
  }

  // --- ESTILS CSS IN-LINE ---
  const headerStyle = { 
    textTransform: "uppercase", 
    fontSize: "1.1rem", 
    marginBottom: "20px", 
    borderBottom: "1px solid #000", 
    paddingBottom: "10px",
    marginTop: 0 // ALINEACIÓ CLAU: Forcem que no tingui marge superior
  };

  const labelStyle = { fontWeight: "bold", display: "block", marginBottom: "5px", color: "#333" };
  const rowStyle = { marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "15px" };
  const valueStyle = { display: "block", lineHeight: "1.4", color: "#555" };

  // Funció per processar la descripció i posar negreta als Actes
  const renderDescripcio = (text) => {
    return text.split('\n').map((linea, index) => {
      // Si la línia comença per "Acte", la partim pels dos punts
      if (linea.trim().startsWith("Acte")) {
        const parts = linea.split(':');
        const titolActe = parts[0] + ":"; // "Acte 1:"
        const contingutActe = parts.slice(1).join(':'); // La resta del text

        return (
          <p key={index} style={{ marginBottom: "15px", lineHeight: "1.6", color: "#222" }}>
            <strong>{titolActe}</strong>{contingutActe}
          </p>
        );
      }
      // Si no és un Acte (ex: un paràgraf normal o l'advertència), es mostra normal
      return (
        <p key={index} style={{ marginBottom: "15px", lineHeight: "1.6", color: "#222" }}>
          {linea}
        </p>
      );
    });
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "inherit" }}>
      
      {/* Botó per tornar (Format original: senzill, gris, fletxa petita) */}
      <Link to="/accions" style={{ textDecoration: "none", color: "#666", marginBottom: "30px", display: "inline-block", fontSize: "0.9rem" }}>
        ← Tornar a accions
      </Link>

      <h1 style={{ textTransform: "uppercase", fontSize: "2.5rem", marginBottom: "30px", borderBottom: "3px solid black", paddingBottom: "10px" }}>
        {accio.titol}
      </h1>
      
      <img 
        src={accio.img} 
        alt={accio.titol} 
        style={{ width: "100%", height: "500px", objectFit: "cover", display: "block", marginBottom: "50px", borderRadius: "0" }} 
      />

      {/* Contenidor flexible alineat a dalt (flex-start) */}
      <div style={{ display: "flex", gap: "60px", flexWrap: "wrap", alignItems: "flex-start" }}>
        
        {/* COLUMNA ESQUERRA (Sense fons blanc ni gris extra) */}
        <div style={{ flex: "1", minWidth: "280px", fontSize: "0.95rem" }}>
            
            <h3 style={headerStyle}>
              Fitxa Tècnica
            </h3>
            
            <div style={rowStyle}>
              <span style={labelStyle}>Participants:</span>
              <span style={valueStyle}>{accio.participants}</span>
            </div>
            
            <div style={rowStyle}>
              <span style={labelStyle}>Temps:</span>
              <span style={valueStyle}>{accio.temps}</span>
            </div>
            
            <div style={rowStyle}>
              <span style={labelStyle}>Materials:</span>
              <span style={valueStyle}>{accio.materials}</span>
            </div>

            <div style={{ marginTop: "30px" }}>
               <h3 style={{ textTransform: "uppercase", fontSize: "1rem", marginBottom: "10px" }}>Filtres:</h3>
               <div style={{ lineHeight: "1.8", color: "#666" }}>
                 {accio.tags.map((tag, index) => (
                   <span key={index} style={{ marginRight: "10px", display: "inline-block", color: "#444", fontWeight: "500" }}>
                     #{tag}
                   </span>
                 ))}
               </div>
            </div>

        </div>

        {/* COLUMNA DRETA */}
        <div style={{ flex: "2", minWidth: "300px" }}>
          <h3 style={headerStyle}>
            Descripció
          </h3>
          
          {/* Renderitzem la descripció processada */}
          <div>
            {renderDescripcio(accio.descripcio)}
          </div>
        </div>

      </div>
    </div>
  );
}

export default DetallAccio;