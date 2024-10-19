import React, { useState } from "react";

const UserRegistrationLogin = () => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    password: "",
    name: "",
  });

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const [registrationMessage, setRegistrationMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleRegistration = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/uporabnik/registracija",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(registrationData),
        }
      );

      const data = await response.json();

      // Assuming there is a 'message' property in the response
      setRegistrationMessage(data.message || "Registration successful");
    } catch (error) {
      console.error("Napaka pri registraciji:", error);
      setRegistrationMessage("Napaka pri registraciji, poskusite ponovno");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/uporabnik/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      // Assuming there is a 'message' property in the response
      setLoginMessage(data.message || "Login successful");

      if (data.user_id) {
        console.log("User ID:", data.user_id);
      }
    } catch (error) {
      console.error("Napaka pri prijavi:", error);
      setLoginMessage("Napaka pri prijavi, poskusite ponovno.");
    }
  };

  return (
    <div>
      <h2>Registracija</h2>
      <div>
        <label>Uporabniško ime:</label>
        <input
          type="text"
          value={registrationData.username}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              username: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Geslo:</label>
        <input
          type="password"
          value={registrationData.password}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              password: e.target.value,
            })
          }
        />
      </div>
      <div>
        <label>Ime:</label>
        <input
          type="text"
          value={registrationData.name}
          onChange={(e) =>
            setRegistrationData({
              ...registrationData,
              name: e.target.value,
            })
          }
        />
      </div>
      <button onClick={handleRegistration}>Registriraj se</button>
      <p>{registrationMessage}</p>

      <h2>Prijava</h2>
      <div>
        <label>Uporabniško ime:</label>
        <input
          type="text"
          value={loginData.username}
          onChange={(e) =>
            setLoginData({ ...loginData, username: e.target.value })
          }
        />
      </div>
      <div>
        <label>Geslo:</label>
        <input
          type="password"
          value={loginData.password}
          onChange={(e) =>
            setLoginData({ ...loginData, password: e.target.value })
          }
        />
      </div>
      <button onClick={handleLogin}>Prijava</button>
      <p>{loginMessage}</p>
    </div>
  );
};

export default UserRegistrationLogin;
