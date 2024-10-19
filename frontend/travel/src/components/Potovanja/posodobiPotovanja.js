import React, { useState } from "react";
import axios from "axios";
import styles  from "../../assets/Stil.css"

const UpdateTravelForm = () => {
  const [formData, setFormData] = useState({
    id: 0,
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

  const handleUpdateTravel = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/potovanje/posodobiPotovanje/${formData.id}`,
        formData
      );
      console.log("Potovanje posodobljeno:", response.data);
    } catch (error) {
      console.error("Napaka pri posodabljanju potovanja:", error);
    }
  };

  return (
    <div>
      <h2>Posodobi potovanje</h2>
      <form>
        <label>
          ID Potovanja:
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Datum začetka:
          <input
            type="text"
            name="datumZacetka"
            value={formData.datumZacetka}
            onChange={handleChange}
            placeholder="2023-11-21"
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
        <button type="button" onClick={handleUpdateTravel}>
          Posodobi Potovanje
        </button>
      </form>
    </div>
  );
};

export default UpdateTravelForm;
