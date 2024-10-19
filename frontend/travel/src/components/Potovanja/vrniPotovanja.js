import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";


const TravelList = () => {
  const [travelData, setTravelData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTravelData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/potovanje/vrniPotovanja"
        );
        setTravelData(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Napaka pri pridobitvi podatkov o potovanju:", error);
        setLoading(false);
        setError(
          "Napaka pri pridobitvi podatkov o potovanju. Poskusite znova."
        );
      }
    };

    fetchTravelData();
  }, []);

  const fetchPathsForTravel = async (potovanjeId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/pot/vrniPoti?potovanje_id=${potovanjeId}`
      );
      return response.data;
    } catch (error) {
      console.error("Napaka pri pridobivanju podatkov o poteh:", error);
      return [];
    }
  };

  const handleGetPaths = async (potovanjeId) => {
    const paths = await fetchPathsForTravel(potovanjeId);

    // Filtriranje podatkov o poteh, ki imajo potovanje_id enak id potovanja
    const filteredPaths = paths.filter(
      (path) => path.potovanje_id === potovanjeId
    );

    // Pridruži filtrirane podatke o poteh k potovanju
    setTravelData((prevData) => {
      return prevData.map((travel) => {
        if (travel.id === potovanjeId) {
          return { ...travel, paths: filteredPaths };
        }
        return travel;
      });
    });
  };

  const handleGeneratePDF = async (potovanjeId) => {
    try {
      await axios
        .get(`http://localhost:8080/api/v1/pdf/generatePdf/${potovanjeId}`, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const url = window.URL.createObjectURL(blob);
          window.open(url);
        });
    } catch (error) {
      console.error("Napaka pri generiranju PDF-ja:", error);
    }
  };
  const handleGetPhoto = async (photoId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/fotografija/pridobiSliko/${photoId}`,
        { responseType: "arraybuffer" }
      );
  
      const blob = new Blob([response.data], { type: "image/jpeg" });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    } catch (error) {
      console.error("Napaka pri pridobivanju fotografije:", error);
    }
  };
  if (loading) {
    return <p>Nalaganje podatkov o potovanju...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h2>Seznam Potovanj</h2>
      <ul>
        {travelData.map((travel) => (
          <li key={travel.id}>
            <p>ID: {travel.id}</p>
            <p>
              Datum Začetka:{" "}
              {travel.datum_zacetka
                ? format(parseISO(travel.datum_zacetka), "dd.MM.yyyy")
                : "N/A"}
            </p>
            <p>
              Datum Konca:{" "}
              {travel.datum_konca
                ? format(parseISO(travel.datum_konca), "dd.MM.yyyy")
                : "N/A"}
            </p>

            <p>Ime: {travel.ime}</p>
            <p>Opis: {travel.opis}</p>
            <p>Država: {travel.drzava}</p>
            {/* Dodaj gumb za pridobivanje podatkov o poteh */}
            <button type="button" onClick={() => handleGetPaths(travel.id)}>
              Pridobi poti
            </button>
            {/* Dodaj gumb za generiranje PDF-ja */}
            <button type="button" onClick={() => handleGeneratePDF(travel.id)}>
              Generiraj PDF
            </button>
            <button type="button" onClick={() => handleGetPhoto(3)}>
               Pridobi fotografijo
            </button>
            {/* Izpis podatkov o poteh, če so na voljo */}
            {travel.paths && (
              <ul>
                {travel.paths.map((path) => (
                  <li key={path.id}>
                    <p>Pot ID: {path.id}</p>
                    <p>Ime poti: {path.ime}</p>
                    <p>Razdalja: {path.razdalja}</p>
                    <p>Opis poti: {path.opis}</p>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TravelList;
