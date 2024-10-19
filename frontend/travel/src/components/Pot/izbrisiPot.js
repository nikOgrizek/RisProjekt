import React, { useState, useEffect } from "react";
import axios from "axios";

const DeletePotiComponent = () => {
  const [poti, setPoti] = useState([]);
  const [selectedPot, setSelectedPot] = useState(null);

  useEffect(() => {
    fetchPoti();
  }, []);

  const fetchPoti = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/pot/vrniPoti");
      setPoti(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePotSelection = (selectedPotId) => {
    const potToDelete = poti.find((pot) => pot.id === selectedPotId);
    setSelectedPot(potToDelete);
  };

  const handleDeletePot = async () => {
    try {
      if (!selectedPot) {
        console.error("Error deleting pot: No pot selected.");
        return;
      }

      await axios.delete(`http://localhost:8080/api/v1/pot/deletePot/${selectedPot.id}`);
      console.log("Pot deleted");
      fetchPoti(); // Refresh the list of paths after deleting.
    } catch (error) {
      console.error("Error deleting pot:", error);
    }
  };

  return (
    <div>
      <h2>Izbriši pot</h2>
      <select value={selectedPot ? selectedPot.id : ""} onChange={(e) => handlePotSelection(e.target.value)}>
        <option value="" disabled>
          Izberi pot
        </option>
        {poti.map((pot) => (
          <option key={pot.id} value={pot.id}>
            {pot.ime}
          </option>
        ))}
      </select>
      {selectedPot && (
        <div>
          <p>Ste prepričani, da želite izbrisati pot "{selectedPot.ime}"?</p>
          <button type="button" onClick={handleDeletePot}>
            Izbriši pot
          </button>
        </div>
      )}
    </div>
  );
};

export default DeletePotiComponent;
