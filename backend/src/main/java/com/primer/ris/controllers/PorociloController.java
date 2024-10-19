package com.primer.ris.controllers;
import com.primer.ris.dao.PorociloRepository;
import com.primer.ris.dao.PotRepository;
import com.primer.ris.dao.PotovanjeRepository;
import com.primer.ris.models.Porocilo;
import com.primer.ris.models.Pot;
import com.primer.ris.models.Potovanje;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/porocila")
public class PorociloController {
/*
    @Autowired
    private PorociloRepository porociloRepository;

    @GetMapping("/generirajPorocilo")
    public String generirajPorocilo(Model model) {
        List<Porocilo> porocila = porociloRepository.findAll();

        // Primer: ustvarjanje PDF poročila (uporabite ustrezno knjižnico za generiranje PDF)
        // ...

        model.addAttribute("porocila", porocila);
        return "porocilo";
    }*/
}
