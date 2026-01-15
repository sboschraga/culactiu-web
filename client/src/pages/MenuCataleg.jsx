import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import infoCarrers from "../data/infoCarrers";

import "./MenuCataleg.css";



// Funció per calcular distància

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

  const R = 6371;

  const dLat = (lat2 - lat1) * (Math.PI / 180);

  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =

    Math.sin(dLat / 2) * Math.sin(dLat / 2) +

    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *

    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;

}



function MenuCataleg() {

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();



  // Lògica del botó ACCEDIR

  const handleAccedir = () => {

    setLoading(true);



    if (!("geolocation" in navigator)) {

      alert("El navegador no suporta geolocalització.");

      setLoading(false);

      return;

    }



    navigator.geolocation.getCurrentPosition(

      (position) => {

        const { latitude, longitude } = position.coords;



        // --- ZONA PERMESA ---

        const latMin = 41.0;

        const latMax = 41.8;

        const lonMin = 1.9;

        const lonMax = 2.4;



        const dinsZona =

          latitude >= latMin &&

          latitude <= latMax &&

          longitude >= lonMin &&

          longitude <= lonMax;



        if (dinsZona) {

          navigate("/llista-cataleg");

        } else {

          // Calcular carrer més proper

          let carrerMesProper = "";

          let distanciaMinima = Infinity;



          Object.entries(infoCarrers).forEach(([nom, dades]) => {

            const dist = getDistanceFromLatLonInKm(latitude, longitude, dades.lat, dades.lon);

            if (dist < distanciaMinima) {

              distanciaMinima = dist;

              carrerMesProper = nom;

            }

          });



          navigate("/denegat", {

            state: {

              nomCarrer: carrerMesProper,

              distanciaKm: distanciaMinima

            }

          });

        }

        setLoading(false);

      },

      (error) => {

        console.error("Error GPS:", error);

        alert("No s'ha pogut obtenir la ubicació.");

        setLoading(false);

      },

      { enableHighAccuracy: true }

    );

  };



  return (

    // FONS DE PANTALLA:

    // Assegura't que tens 'Recurso3.png' a la carpeta public/img/

    <div

      className="menu-split-container"

      style={{ backgroundImage: "url('/img/Recurso3.svg')" }}

    >

     

      {/* --- BLOC ESQUERRA: ACCEDIR --- */}

      <div className="meitat-menu esquerra">

        {/* Aquí fem servir 'handleAccedir' i 'loading', així que els warnings marxaran */}

        <button

          className="boto-titol"

          onClick={handleAccedir}

          disabled={loading}

        >

          {loading ? "COMPROVANT..." : "ACCEDIR AL CATÀLEG"}

        </button>

      </div>



      {/* --- BLOC DRETA: AFEGIR --- */}

      <div className="meitat-menu dreta">

        {/* Aquí fem servir el 'Link', així que el warning marxarà */}

        <Link to="/afegir-carrer" className="boto-titol link-boto">

          AFEGIR CUL-DE-SAC

        </Link>

      </div>



    </div>

  );

}



export default MenuCataleg;

