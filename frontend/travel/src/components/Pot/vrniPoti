import React, { useState, useEffect } from "react";
import axios from "axios";

const DisplayPotiComponent = () => {
    const [poti, setPoti] = useState([]);
  
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
  
    return (
      <div>
        <h2>Poti</h2>
        <ul>
          {poti.map((pot) => (
            <li key={pot.id}>
              {pot.ime}
              <p>Opis: {pot.opis}</p>
              <p>Razdalja: {pot.razdalja}</p>
              <p>Potovanje ID: {pot.potovanje_id}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default DisplayPotiComponent;