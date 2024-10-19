import React, { useState } from "react";
import axios from "axios";

const FotografijaForm = () => {
  const [naslov, setNaslov] = useState("");
  const [opis, setOpis] = useState("");
  const [slika, setSlika] = useState(null);
  const [potovanjeId, setPotovanjeId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("naslov", naslov);
    formData.append("opis", opis);
    formData.append("slika", slika);

    try {
      const response = await axios.post(
        `http://localhost:8080/api/v1/fotografija/dodajFotografijo/${potovanjeId}`,
        formData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Napaka pri nalaganju slike:", error);
    }
  };

  return (
    <div>
      <h2>Dodaj Fotografijo</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="naslov">Naslov:</label>
          <input
            type="text"
            id="naslov"
            value={naslov}
            onChange={(e) => setNaslov(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="opis">Opis:</label>
          <textarea
            id="opis"
            value={opis}
            onChange={(e) => setOpis(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="slika">Izberi sliko:</label>
          <input
            type="file"
            id="slika"
            onChange={(e) => setSlika(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="potovanjeId">ID Potovanja:</label>
          <input
            type="text"
            id="potovanjeId"
            value={potovanjeId}
            onChange={(e) => setPotovanjeId(e.target.value)}
          />
        </div>
        <button type="submit">Dodaj Fotografijo</button>
      </form>
    </div>
  );
};

export default FotografijaForm;
