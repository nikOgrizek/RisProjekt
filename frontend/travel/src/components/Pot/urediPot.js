import React, { useState } from "react";
import axios from "axios";

const UpdatePotComponent = () => {
  const [poti, setPoti] = useState([]);
  const [selectedPot, setSelectedPot] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    id: 0,
    ime: "",
    opis: "",
    razdalja: 0,
  });

  const handleChange = (e) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleUpdatePot = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/pot/updatePot/${selectedPot.id}`,
        updateFormData
      );
      console.log("Pot updated:", response.data);
      // Optionally, you can refresh the list of paths after updating.
    } catch (error) {
      console.error("Error updating pot:", error);
    }
  };

  return (
    <div>
      <h2>Posodobi poti</h2>
          <form>
          <label>
              ID poti:
              <input
                type="numeber"
                name="id"
                value={updateFormData.id}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Ime:
              <input
                type="text"
                name="ime"
                value={updateFormData.ime}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Opis:
              <input
                type="text"
                name="opis"
                value={updateFormData.opis}
                onChange={handleChange}
              />
            </label>
            <br />
            <label>
              Razdalja:
              <input
                type="number"
                name="razdalja"
                value={updateFormData.razdalja}
                onChange={handleChange}
              />
            </label>
            <br />
            <button type="button" onClick={handleUpdatePot}>
              Posodobi pot
            </button>
          </form>
    </div>
  );
};

export default UpdatePotComponent;

