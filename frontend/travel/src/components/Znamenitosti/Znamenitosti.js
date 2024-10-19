import React, { useState, useEffect } from "react";
import axios from "axios";

const ZnamenitostForm = () => {
  const [znamenitost, setZnamenitost] = useState({
    ime: "",
    lokacija: "",
    opis: "",
    pot_id: "",
  });

  const [znamenitosti, setZnamenitosti] = useState([]);

  const handleChange = (e) => {
    setZnamenitost({
      ...znamenitost,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddZnamenitost = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/znamenitost/dodajZnamenitost",
        znamenitost
      );
      console.log("Znamenitost dodana:", response.data);
      setZnamenitosti([...znamenitosti, response.data]);
      setZnamenitost({
        ime: "",
        lokacija: "",
        opis: "",
      });
    } catch (error) {
      console.error("Napaka pri dodajanju znamenitosti:", error);
    }
  };

  const handleUpdateZnamenitost = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/znamenitost/posodobiZnamenitost/${id}`,
        znamenitost
      );
      console.log("Znamenitost posodobljena:", response.data);
      setZnamenitosti((prevZnamenitosti) =>
        prevZnamenitosti.map((item) => (item.id === id ? response.data : item))
      );
      setZnamenitost({
        ime: "",
        lokacija: "",
        opis: "",
      });
    } catch (error) {
      console.error("Napaka pri posodabljanju znamenitosti:", error);
    }
  };

  const handleDeleteZnamenitost = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/znamenitost/izbrisZnamenitosti/${id}`
      );
      console.log("Znamenitost izbrisana:", id);
      setZnamenitosti((prevZnamenitosti) =>
        prevZnamenitosti.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Napaka pri brisanju znamenitosti:", error);
    }
  };

  useEffect(() => {
    const fetchZnamenitosti = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/znamenitost/vrniZnamenitost"
        );
        setZnamenitosti(response.data);
      } catch (error) {
        console.error("Znamenitosti niso najdene:", error);
      }
    };

    fetchZnamenitosti();
  }, []);

  return (
    <div>
      <h2>Znamenitosti</h2>
      <ul>
        {znamenitosti.map((item) => (
          <li key={item.id}>
            {item.ime} - {item.lokacija}
            <button onClick={() => handleDeleteZnamenitost(item.id)}>
              Izbriši
            </button>
          </li>
        ))}
      </ul>
      <h3>Dodaj znamenitost</h3>
      <label>
        Ime:
        <input
          type="text"
          name="ime"
          value={znamenitost.ime}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Lokacija:
        <input
          type="text"
          name="lokacija"
          value={znamenitost.lokacija}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Opis:
        <input
          type="text"
          name="opis"
          value={znamenitost.opis}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Pot_ID:
        <input
          type="number"
          name="pot_id"
          value={znamenitost.pot_id}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={handleAddZnamenitost}>Dodaj znamenitost</button>
      <h3>Posodobi znamenitost</h3>
      <label>
        Ime:
        <input
          type="text"
          name="ime"
          value={znamenitost.ime}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Lokacija:
        <input
          type="text"
          name="lokacija"
          value={znamenitost.lokacija}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Opis:
        <input
          type="text"
          name="opis"
          value={znamenitost.opis}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Pot_ID:
        <input
          type="number"
          name="pot_id"
          value={znamenitost.pot_id}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={() => handleUpdateZnamenitost(znamenitosti[0].id)}>
        Posodobi
      </button>
    </div>
  );
};

export default ZnamenitostForm;
