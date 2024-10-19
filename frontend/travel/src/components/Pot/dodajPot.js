import React, { useState, useEffect } from "react";
import axios from "axios";

const PotComponent = () => {
  const [poti, setPoti] = useState([]);
  const [newPot, setNewPot] = useState({
    ime: "",
    opis: "",
    razdalja: 0,
    potovanje_id: "", // Dodaj potovanje_id kot del nove poti
  });

  const handleChange = (e) => {
    setNewPot({ ...newPot, [e.target.name]: e.target.value });
  };

  const handleAddPot = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/pot/dodajPot",
        newPot
      );
      console.log("Nova pot dodana:", response.data);

      // Posodobitev seznama poti po dodajanju nove poti
      setPoti((prevPoti) => [...prevPoti, response.data]);

      // Ponastavitev stanja nove poti po uspešnem dodajanju
      setNewPot({
        ime: "",
        opis: "",
        razdalja: 0,
        potovanje_id: "",
      });
    } catch (error) {
      console.error("Napaka pri dodajanju nove poti:", error);
    }
  };

  return (
    <div>
      <h2>Poti</h2>
      <ul>
        {poti.map((pot) => (
          <li key={pot.id}>
            <strong>{pot.ime}</strong>
            <p>Opis: {pot.opis}</p>
            <p>Razdalja: {pot.razdalja}</p>
            <p>Potovanje ID: {pot.potovanje_id}</p>
          </li>
        ))}
      </ul>
      <h2>Dodaj novo pot</h2>
      <form>
        <label>
          Ime:
          <input
            type="text"
            name="ime"
            value={newPot.ime}
            onChange={handleChange}
            placeholder="Ime poti"
          />
        </label>
        <br />
        <label>
          Opis:
          <input
            type="text"
            name="opis"
            value={newPot.opis}
            onChange={handleChange}
            placeholder="Opis poti"
          />
        </label>
        <br />
        <label>
          Razdalja:
          <input
            type="number"
            name="razdalja"
            value={newPot.razdalja}
            onChange={handleChange}
            placeholder="Razdalja poti"
          />
        </label>
        <br />
        <label>
          Potovanje ID:
          <input
            type="number"
            name="potovanje_id"
            value={newPot.potovanje_id}
            onChange={handleChange}
            placeholder="Vnesite potovanje ID"
          />
        </label>
        <br />
        <button type="button" onClick={handleAddPot}>
          Dodaj pot
        </button>
      </form>
    </div>
  );
};

export default PotComponent;
