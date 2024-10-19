import React, { useState } from "react";
import axios from "axios";

const AddTravelForm = () => {
  const [formData, setFormData] = useState({
    datumZacetka: "",
    datumKonca: "",
    ime: "",
    opis: "",
    drzava: "",
    steviloPoti: 0,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddTravel = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/potovanje/dodajPotovanje",
        formData
      );
      console.log("Novo potovanje dodano:", response.data);
    } catch (error) {
      console.error("Napaka pri dodajanju potovanja:", error);
    }
  };

  return (
    <div>
      <h2>Dodaj novo potovanje</h2>
      <form>
        <label>
          Datum začetka:
          <input
            type="text"
            name="datumZacetka"
            value={formData.datumZacetka}
            onChange={handleChange}
            placeholder="2023-11-21" // Example format
          />
        </label>
        <br />
        <label>
          Datum konca:
          <input
            type="text"
            name="datumKonca"
            value={formData.datumKonca}
            onChange={handleChange}
            placeholder="2023-11-23"
          />
        </label>
        <br />
        <label>
          Ime:
          <input
            type="text"
            name="ime"
            value={formData.ime}
            onChange={handleChange}
            placeholder="Besedilo"
          />
        </label>
        <br />
        <label>
          Opis:
          <input
            type="text"
            name="opis"
            value={formData.opis}
            onChange={handleChange}
            placeholder="Besedilo"
          />
        </label>
        <br />
        <label>
          Država:
          <input
            type="text"
            name="drzava"
            value={formData.drzava}
            onChange={handleChange}
            placeholder="SLOVENIA"
          />
        </label>
        <br />
        <button type="button" onClick={handleAddTravel}>
          Dodaj potovanje
        </button>
      </form>
    </div>
  );
};

export default AddTravelForm;
