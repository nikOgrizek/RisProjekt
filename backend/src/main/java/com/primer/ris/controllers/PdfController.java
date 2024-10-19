package com.primer.ris.controllers;
import com.itextpdf.text.DocumentException;
import com.primer.ris.dao.PotovanjeRepository;
import com.primer.ris.models.PdfGenerator;
import com.primer.ris.models.Potovanje;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/pdf")
@CrossOrigin(origins = "http://localhost:3000/")
public class PdfController {

    private final PotovanjeRepository potovanjeRepository;

    @Autowired
    public PdfController(PotovanjeRepository potovanjeRepository) {
        this.potovanjeRepository = potovanjeRepository;
    }

    @GetMapping("/generatePdf/{potovanjeId}")
    public void generatePdf(@PathVariable Long potovanjeId, HttpServletResponse response) {
        try {
            // Pridobite potovanje iz baze podatkov
            Potovanje potovanje = potovanjeRepository.findById(potovanjeId).orElse(null);

            if (potovanje != null) {
                // Generiraj PDF
                PdfGenerator pdfGenerator = new PdfGenerator();
                pdfGenerator.generate(potovanje, response);
            } else {
                // Obvladajte primer, ko potovanje ni najdeno
                response.getWriter().write("Potovanje s podanim ID-jem ni bilo najdeno.");
            }
        } catch (IOException | DocumentException e) {
            throw new RuntimeException(e);
        }
    }
}
