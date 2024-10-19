import React, { useState } from "react";
import axios from "axios";

const DeleteTravelForm = () => {
  const [travelId, setTravelId] = useState(0);

  const handleChange = (e) => {
    setTravelId(e.target.value);
  };

  const handleDeleteTravel = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/v1/potovanje/izbrisiPotovanje/${travelId}`
      );
      console.log("Potovanje izbrisano:", response.data);
    } catch (error) {
      console.error("Napaka pri brisanju potovanja:", error);
    }
  };

  return (
    <div>
      <h2>Izbriši potovanje</h2>
      <form>
        <label>
          ID Potovanje:
          <input type="number" value={travelId} onChange={handleChange} />
        </label>
        <br />
        <button type="button" onClick={handleDeleteTravel}>
          Izbriši potovanje
        </button>
      </form>
    </div>
  );
};

export default DeleteTravelForm;
