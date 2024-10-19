import React, { useState } from "react";
import axios from "axios";

const PdfGeneratorForm = () => {
  const [potovanjeId, setPotovanjeId] = useState("");
  const [error, setError] = useState(null);

  const handleGeneratePdf = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/pdf/generatePdf/${potovanjeId}`,
        {
          responseType: "arraybuffer",
          headers: {
            "Content-Type": "application/pdf",
          },
        }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "potovanje.pdf";
      link.click();

      setError(null);
    } catch (error) {
      console.error("Napaka pri generiranju PDF:", error);
      setError("Napaka, preverite ID potovanja");
    }
  };

  return (
    <div>
      <h2>Generacija PDF</h2>
      <div>
        <label htmlFor="potovanjeId">Vstavite ID Potovanja:</label>
        <input
          type="text"
          id="potovanjeId"
          value={potovanjeId}
          onChange={(e) => setPotovanjeId(e.target.value)}
        />
      </div>
      <button onClick={handleGeneratePdf}>Generiraj PDF</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default PdfGeneratorForm;
