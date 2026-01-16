import React, { useState, useEffect } from "react"; 
import { useParams, Link } from "react-router-dom";

// --- DADES ---
const infoAccions = [
  { 
    id: 1, 
    titol: "neteja", 
    carrerVinculat: "C/ del Tonell",
    galeria: [
      { type: "youtube", src: "PHkGPsp8tEI" },
      { type: "img", src: "/img/accions/neteja/neteja2.png" }, 
      { type: "img", src: "/img/accions/neteja/neteja3.png" },
      { type: "img", src: "/img/accions/neteja/neteja4.png" },
      { type: "img", src: "/img/accions/neteja/neteja5.png" },
      { type: "img", src: "/img/accions/neteja/neteja6.png" },
      { type: "img", src: "/img/accions/neteja/neteja7.png" },
      { type: "img", src: "/img/accions/neteja/neteja8.png" },
      { type: "img", src: "/img/accions/neteja/neteja9.png" },
    ],
    participants: "2 - 8",
    temps: "30 minuts",
    materials: "Escombra, Pala, Draps, Fregalls, Sabó, Fregona, Guants, Mascaretes, Cubell, Productes de neteja, Caça-fantasmes de neteja, Aspirador",
    descripcio: `Acte 1: Localització d’un cul-de-sac adequat, brut.
Acte 2: Entrada al cul-de-sac, els integrants duen l’equipament i el material necessari.
Acte 3: Inspecció visual de l’espai.
Acte 4: Anem per feina! Comencem a netejar el carrer: escombrar i fregar el terra, treure la pols de les portes i portals, retirar els adhesius de canonades, fregar els grafits, extirpar els excrements de la fauna de Barcelona… Seguir minuts, hores o dies com faci falta, fins a deixar el cul-de-sac impol·lut, brillant, lluent, en definitiva millor de com l’has trobat.
Acte 5: Marxar satisfet amb la feina feta, llençant a la brossa tota la brutícia que s’ha recollit.`,
    tags: ["Públic", "Privat", "X veïnes", "X altres", "Interactiu", "Col·lectiu", "Humà + Objecte", "Matèria", "Intrusiu"] 
  },
  { 
    id: 2, 
    titol: "esport", 
    carrerVinculat: "C/ de Maria Victòria",
    galeria: [
        { type: "youtube", src: "LP3hWTcalcA" },
        { type: "img", src: "/img/accions/esport/esport1.png" },
        { type: "img", src: "/img/accions/esport/esport2.png" },
        { type: "img", src: "/img/accions/esport/esport3.png" },
        { type: "img", src: "/img/accions/esport/esport4.png" },
        { type: "img", src: "/img/accions/esport/esport5.png" },
        { type: "img", src: "/img/accions/esport/esport6.png" },
        { type: "img", src: "/img/accions/esport/esport7.png" },
    ],
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
    carrerVinculat: "C/ de Gordi",
    galeria: [
        { type: "youtube", src: "nK4Mr5eC80Q" },
        { type: "img", src: "/img/accions/muralla/muralla1.png" },
        { type: "img", src: "/img/accions/muralla/muralla2.png" },
        { type: "img", src: "/img/accions/muralla/muralla3.png" },
        { type: "img", src: "/img/accions/muralla/muralla4.png" },
        { type: "img", src: "/img/accions/muralla/muralla5.png" },
        { type: "img", src: "/img/accions/muralla/muralla6.png" },
    ],
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
    carrerVinculat: "Carreró de les Carolines",
    galeria: [
        { type: "youtube", src: "gKMmGlVtLpA" },
        { type: "img", src: "/img/accions/fletxes/fletxes1.png" },
        { type: "img", src: "/img/accions/fletxes/fletxes2.png" },
        { type: "img", src: "/img/accions/fletxes/fletxes3.png" },
        { type: "img", src: "/img/accions/fletxes/fletxes4.png" },
    ],
    participants: "2 - 8",
    temps: "30 minuts",
    materials: "Cintes adhesives de colors, Tisores.",
    descripcio: `Acte 1: Localització d'un cul-de-sac adequat, a ser possible, llarg. Ajuda a crear expectació ja que no es veu de forma inmediata on et porten les fletxes.
Acte 2: Comença l’acció, tel·lar i enganxar fletxes per tot el carrer, han de senyalar totes cap a l’interior del cul-de sac. La direccionalitat de l’acció ha d’anar en el mateix sentit que les fletxes, és a dir, de fora cap endins.
Acte 3: Reforçar si alguna zona ha quedat poc poblada.
Acte 4: Observar des de la distància com interactuen els vianants, si ho miren, segueixen les fletxes…
Acte 5: Retirada de les fletxes, cal deixar l’espai tant net o mes que quan l’hem trobat.`,
    tags: ["Públic", "Privat", "Productiu", "Inactiu Reflexiu", "Contemplatiu", "Col·lectiu", "Humà + Objecte", "Matèria", "Subtil"] 
  },
  { 
    id: 5, 
    titol: "cassolada", 
    carrerVinculat: "C/ Rera Sant Just",
    galeria: [
        { type: "youtube", src: "1CUwVlWqoSg" }, 
        { type: "img", src: "/img/accions/cassolada/cassolada1.png" },
        { type: "img", src: "/img/accions/cassolada/cassolada2.png" },
        { type: "img", src: "/img/accions/cassolada/cassolada3.png" },
    ],
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
  const [indexGaleria, setIndexGaleria] = useState(0);
  const [fullScreen, setFullScreen] = useState(false); 

  const accio = infoAccions.find(a => a.titol === id);

  const seguent = (e) => {
    if(e) e.stopPropagation(); 
    if (accio) setIndexGaleria((prev) => (prev === accio.galeria.length - 1 ? 0 : prev + 1));
  };

  const anterior = (e) => {
    if(e) e.stopPropagation();
    if (accio) setIndexGaleria((prev) => (prev === 0 ? accio.galeria.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!fullScreen) return;
      if (e.key === "Escape") setFullScreen(false);
      if (e.key === "ArrowRight") seguent();
      if (e.key === "ArrowLeft") anterior();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullScreen, indexGaleria]);

  const headerStyle = { textTransform: "uppercase", fontSize: "1.1rem", marginBottom: "20px", borderBottom: "1px solid #000", paddingBottom: "10px", marginTop: 0 };
  const labelStyle = { fontWeight: "bold", display: "block", marginBottom: "5px", color: "#333" };
  const rowStyle = { marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "15px" };
  const valueStyle = { display: "block", lineHeight: "1.4", color: "#555" };
  
  const btoGaleriaStyle = { position: "absolute", top: "50%", transform: "translateY(-50%)", background: "rgba(255, 255, 255, 0.9)", border: "none", padding: "10px 5px", fontSize: "2rem", cursor: "pointer", zIndex: 10, color: "#333" };
  const btnExpandirStyle = { position: "absolute", bottom: "10px", right: "10px", background: "rgba(0, 0, 0, 0.6)", color: "white", border: "none", borderRadius: "4px", padding: "5px 10px", fontSize: "1.2rem", cursor: "pointer", zIndex: 20 };

  const renderDescripcio = (text) => {
    return text.split('\n').map((linea, index) => {
      if (linea.trim().startsWith("Acte")) {
        const parts = linea.split(':');
        return (
          <p key={index} style={{ marginBottom: "15px", lineHeight: "1.6", color: "#222" }}>
            <strong>{parts[0]}:</strong>{parts.slice(1).join(':')}
          </p>
        );
      }
      return <p key={index} style={{ marginBottom: "15px", lineHeight: "1.6", color: "#222" }}>{linea}</p>;
    });
  };

  const renderContingutGaleria = (element, isModal = false) => {
    const imgStyle = isModal ? { width: "100%", height: "100%", objectFit: "contain", display: "block" } : { width: "100%", height: "100%", objectFit: "cover", display: "block", cursor: "pointer" };
    if (element.type === "youtube") {
      return <iframe src={`https://www.youtube.com/embed/${element.src}`} title="YouTube" frameBorder="0" allowFullScreen style={{ width: "100%", height: "100%" }}></iframe>;
    } 
    return <img src={element.src} alt="Galeria" style={imgStyle} onClick={!isModal ? () => setFullScreen(true) : undefined} />;
  };

  if (!accio) return <div style={{ padding: 40, fontFamily: "inherit" }}>Acció no trobada</div>;

  return (
    <div style={{ padding: "40px 20px", maxWidth: "1000px", margin: "0 auto", fontFamily: "inherit" }}>
      
      {fullScreen && (
        <div onClick={() => setFullScreen(false)} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.95)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <button onClick={() => setFullScreen(false)} style={{ position: "absolute", top: "20px", right: "20px", background: "transparent", border: "none", color: "white", fontSize: "3rem", cursor: "pointer" }}>×</button>
          {accio.galeria.length > 1 && (
            <>
              <button onClick={anterior} style={{ ...btoGaleriaStyle, left: "20px", background: "transparent", color: "white", fontSize: "4rem" }}>‹</button>
              <button onClick={seguent} style={{ ...btoGaleriaStyle, right: "20px", background: "transparent", color: "white", fontSize: "4rem" }}>›</button>
            </>
          )}
          <div onClick={(e) => e.stopPropagation()} style={{ width: "90%", height: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            {renderContingutGaleria(accio.galeria[indexGaleria], true)}
          </div>
        </div>
      )}

      <Link to="/accions" style={{ textDecoration: "none", color: "#666", marginBottom: "5px", display: "inline-block", fontSize: "0.9rem" }}>← Tornar</Link>

      <h1 style={{ textTransform: "uppercase", fontSize: "2.5rem", marginTop: "0px", marginBottom: "15px", borderBottom: "3px solid black", paddingBottom: "10px" }}>{accio.titol}</h1>

      {/* --- BOTÓ DE LOCALITZACIÓ --- */}
      {accio.carrerVinculat && (
        <div style={{ marginBottom: "30px" }}>
          <Link 
            to={`/carrer/${encodeURIComponent(accio.carrerVinculat)}`}
            style={{ display: "inline-block", backgroundColor: "black", color: "white", textDecoration: "none", padding: "12px 24px", fontWeight: "bold", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}
          >
            Localització: {accio.carrerVinculat} →
          </Link>
        </div>
      )}
      
      <div style={{ position: "relative", marginBottom: "50px", width: "100%", height: "500px", backgroundColor: "#f0f0f0", overflow: "hidden" }}>
        {accio.galeria.length > 1 && (
          <>
            <button onClick={anterior} style={{ ...btoGaleriaStyle, left: "10px" }}>‹</button>
            <button onClick={seguent} style={{ ...btoGaleriaStyle, right: "10px" }}>›</button>
          </>
        )}
        <button onClick={() => setFullScreen(true)} style={btnExpandirStyle}>⤢</button>
        <div style={{ display: "flex", height: "100%", width: "100%", transform: `translateX(-${indexGaleria * 100}%)`, transition: "transform 0.5s ease-in-out" }}>
          {accio.galeria.map((element, idx) => (
            <div key={idx} style={{ minWidth: "100%", width: "100%", height: "100%", flexShrink: 0 }}>
               {renderContingutGaleria(element, false)}
            </div>
          ))}
        </div>
        {accio.galeria.length > 1 && (
          <div style={{ position: "absolute", bottom: "10px", left: "20px", background: "rgba(0,0,0,0.5)", color: "white", padding: "5px 10px", borderRadius: "4px", fontSize: "0.8rem", pointerEvents: "none" }}>
            {indexGaleria + 1} / {accio.galeria.length}
          </div>
        )}
      </div>

      <div style={{ display: "flex", gap: "60px", flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ flex: "1", minWidth: "280px", fontSize: "0.95rem" }}>
            <h3 style={headerStyle}>Fitxa Tècnica</h3>
            <div style={rowStyle}><span style={labelStyle}>Participants:</span><span style={valueStyle}>{accio.participants}</span></div>
            <div style={rowStyle}><span style={labelStyle}>Temps:</span><span style={valueStyle}>{accio.temps}</span></div>
            <div style={rowStyle}><span style={labelStyle}>Materials:</span><span style={valueStyle}>{accio.materials}</span></div>
            <div style={{ marginTop: "30px" }}>
               <h3 style={{ textTransform: "uppercase", fontSize: "1rem", marginBottom: "10px" }}>Filtres:</h3>
               <div style={{ lineHeight: "1.8", color: "#666" }}>
                 {accio.tags.map((tag, index) => <span key={index} style={{ marginRight: "10px", display: "inline-block", color: "#444", fontWeight: "500" }}>#{tag}</span>)}
               </div>
            </div>
        </div>
        <div style={{ flex: "2", minWidth: "300px" }}>
          <h3 style={headerStyle}>Descripció</h3>
          <div>{renderDescripcio(accio.descripcio)}</div>
        </div>
      </div>
    </div>
  );
}

export default DetallAccio;