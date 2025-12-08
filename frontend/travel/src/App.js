import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PotovanjaDodaj from "./components/Potovanja/dodajPotovanja";
import PotovanjaIzbrisi from "./components/Potovanja/izbrisiPotovanje";
import PotovanjaPosodobi from "./components/Potovanja/posodobiPotovanja";
import PotovanjaVrni from "./components/Potovanja/vrniPotovanja";
import VrniPoti from "./components/Pot/vrniPoti";
import PdfGenerator from "./components/PdfGenerator/PdfGenerator";
import Fotografija from "./components/Fotografije/Fotografije";
import Avtentikacija from "./components/Avtentikacija/Auth";
import Znamenitosti from "./components/Znamenitosti/Znamenitosti";
import PotDodaj from "./components/Pot/dodajPot";
import PotIzbrisi from "./components/Pot/izbrisiPot";
import PotUredi from "./components/Pot/urediPot";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [journeys, setJourneys] = useState([]);

  useEffect(() => {
    // Fetch journeys from the backend
  }, []);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const handleFilter = (appliedFilters) => {
    setFilters(appliedFilters);
  };
  const handleSendEmail = () => {
    // Dodajte kodo za posiljanje GET zahteve na http://localhost:8080/api/v1/pot/sendEmail
    fetch("http://localhost:8080/api/v1/pot/sendEmail", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Dodajte druge potrebne glave po potrebi
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Uspešno poslano!", data);
        // Dodajte morebitne dodatne manipulacije z odgovorom
      })
      .catch((error) => {
        console.error("Napaka pri pošiljanju e-pošte:", error);
        // Dodajte morebitne rokovanje z napako
      });
  };
  return (
    <Router>
      <div className="App">
      <PotovanjaVrni />
      <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px" }}>
          <PotovanjaDodaj />
          <PotovanjaIzbrisi /> 
          <PotovanjaPosodobi />
        </div>
        <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: "20px" }}>
        <Fotografija />
        <button onClick={handleSendEmail}>Pošlji E-pošto</button>
        <Znamenitosti /> 
        </div>
        <VrniPoti />
        <PotDodaj />
        <PotUredi />
        <PotIzbrisi />
 
        <Avtentikacija />
        {/* Include other components as needed */}
      </div>
    </Router>
  );
}

export default App;
